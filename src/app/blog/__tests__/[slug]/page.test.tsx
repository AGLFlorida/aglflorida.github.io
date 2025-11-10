// Mock the lib functions BEFORE importing the page
jest.mock('@/lib/getPosts');
jest.mock('fs');
jest.mock('gray-matter');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({
      toString: () => '<p>Processed HTML content</p>',
    }),
  })),
}));

import { render, screen } from '@testing-library/react';
import BlogPostPage, { generateStaticParams } from '../../[slug]/page';
import { getPostBySlug, getSortedPosts } from '@/lib/getPosts';

const mockGetPostBySlug = getPostBySlug as jest.MockedFunction<typeof getPostBySlug>;
const mockGetSortedPosts = getSortedPosts as jest.MockedFunction<typeof getSortedPosts>;

describe('BlogPostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render blog post with content', async () => {
    mockGetPostBySlug.mockResolvedValue({
      slug: 'my-post',
      title: 'My Blog Post',
      date: '2025-01-01',
      excerpt: 'Post excerpt',
      contentHtml: '<p>Blog post content</p>',
    });

    const params = Promise.resolve({ slug: 'my-post' });
    const page = await BlogPostPage({ params });
    const { container } = render(page);

    expect(screen.getByText('My Blog Post')).toBeInTheDocument();
    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
    expect(container.querySelector('.prose')).toBeInTheDocument();
  });

  it('should render not found message when post does not exist', async () => {
    mockGetPostBySlug.mockResolvedValue(null as any);

    const params = Promise.resolve({ slug: 'non-existent' });
    const page = await BlogPostPage({ params });
    render(page);

    expect(screen.getByText('Post Not Found')).toBeInTheDocument();
    expect(screen.getByText(/requested post could not be found/i)).toBeInTheDocument();
  });

  it('should call getPostBySlug with correct slug', async () => {
    mockGetPostBySlug.mockResolvedValue({
      slug: 'test-post',
      title: 'Test Post',
      date: '2025-01-01',
      excerpt: 'Excerpt',
      contentHtml: '<p>Content</p>',
    });

    const params = Promise.resolve({ slug: 'test-post' });
    await BlogPostPage({ params });

    expect(mockGetPostBySlug).toHaveBeenCalledWith('test-post');
  });
});

describe('generateStaticParams', () => {
  it('should generate static params from all posts', async () => {
    mockGetSortedPosts.mockReturnValue([
      { slug: 'post-1', title: 'Post 1', date: '2025-01-01', excerpt: 'Excerpt 1' },
      { slug: 'post-2', title: 'Post 2', date: '2025-01-02', excerpt: 'Excerpt 2' },
    ]);

    const params = await generateStaticParams();

    expect(params).toEqual([
      { slug: 'post-1' },
      { slug: 'post-2' },
    ]);
  });
});

