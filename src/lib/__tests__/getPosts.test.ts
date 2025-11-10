import fs from 'fs';
import path from 'path';
import { getSortedPosts, getPostBySlug } from '../getPosts';
import matter from 'gray-matter';

// Mock dependencies
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

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedMatter = matter as jest.MockedFunction<typeof matter>;

describe('getPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => '/mock/workspace');
  });

  describe('getSortedPosts', () => {
    it('should return sorted posts by date (newest first)', () => {
      const mockFileNames = ['post-2025-03-17.md', 'post-2025-07-25.md', 'post-2025-05-10.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockImplementation((filePath: string) => {
        const fileName = path.basename(filePath);
        if (fileName === 'post-2025-03-17.md') {
          return '---\ntitle: First Post\ndate: 2025-03-17\nexcerpt: First excerpt\n---\nContent';
        }
        if (fileName === 'post-2025-07-25.md') {
          return '---\ntitle: Latest Post\ndate: 2025-07-25\nexcerpt: Latest excerpt\n---\nContent';
        }
        if (fileName === 'post-2025-05-10.md') {
          return '---\ntitle: Middle Post\ndate: 2025-05-10\nexcerpt: Middle excerpt\n---\nContent';
        }
        return '';
      });

      mockedMatter.mockImplementation((content: string) => {
        const dateMatch = content.match(/date: (.+)/);
        const titleMatch = content.match(/title: (.+)/);
        const excerptMatch = content.match(/excerpt: (.+)/);
        return {
          data: {
            title: titleMatch?.[1] || '',
            date: dateMatch?.[1] || '',
            excerpt: excerptMatch?.[1] || '',
          },
        };
      });

      const posts = getSortedPosts();

      expect(posts).toHaveLength(3);
      expect(posts[0].date).toBe('2025-07-25');
      expect(posts[0].title).toBe('Latest Post');
      expect(posts[1].date).toBe('2025-05-10');
      expect(posts[2].date).toBe('2025-03-17');
    });

    it('should extract slug from filename', () => {
      const mockFileNames = ['my-awesome-post.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: My Post\ndate: 2025-03-17\nexcerpt: Excerpt\n---\nContent');

      mockedMatter.mockReturnValue({
        data: {
          title: 'My Post',
          date: '2025-03-17',
          excerpt: 'Excerpt',
        },
      });

      const posts = getSortedPosts();

      expect(posts[0].slug).toBe('my-awesome-post');
    });

    it('should return all required post fields', () => {
      const mockFileNames = ['test-post.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: Test Post\ndate: 2025-03-17\nexcerpt: Test excerpt\n---\nContent');

      mockedMatter.mockReturnValue({
        data: {
          title: 'Test Post',
          date: '2025-03-17',
          excerpt: 'Test excerpt',
        },
      });

      const posts = getSortedPosts();

      expect(posts[0]).toHaveProperty('slug');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('date');
      expect(posts[0]).toHaveProperty('excerpt');
      expect(posts[0].title).toBe('Test Post');
      expect(posts[0].date).toBe('2025-03-17');
      expect(posts[0].excerpt).toBe('Test excerpt');
    });

    it('should return empty array when no files exist', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue([] as any);

      const posts = getSortedPosts();

      expect(posts).toEqual([]);
    });
  });

  describe('getPostBySlug', () => {
    it('should return post by slug with processed HTML content', async () => {
      const mockSlug = 'my-first-post';
      const mockContent = '---\ntitle: My First Post\ndate: 2025-03-17\nexcerpt: First post excerpt\n---\n# Post content here';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      mockedMatter.mockReturnValue({
        data: {
          title: 'My First Post',
          date: '2025-03-17',
          excerpt: 'First post excerpt',
        },
        content: '# Post content here',
      });

      const post = await getPostBySlug(mockSlug);

      expect(post).not.toBeUndefined();
      expect(post.slug).toBe(mockSlug);
      expect(post.title).toBe('My First Post');
      expect(post.date).toBe('2025-03-17');
      expect(post.excerpt).toBe('First post excerpt');
      expect(post.contentHtml).toBe('<p>Processed HTML content</p>');
    });

    it('should throw error when file does not exist', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(getPostBySlug('non-existent-post')).rejects.toThrow();
    });

    it('should handle markdown processing correctly', async () => {
      const mockSlug = 'test-post';
      const mockContent = '---\ntitle: Test\ndate: 2025-03-17\nexcerpt: Test\n---\n## Heading\n\nParagraph text';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      mockedMatter.mockReturnValue({
        data: {
          title: 'Test',
          date: '2025-03-17',
          excerpt: 'Test',
        },
        content: '## Heading\n\nParagraph text',
      });

      const post = await getPostBySlug(mockSlug);

      expect(post.contentHtml).toBeDefined();
      expect(typeof post.contentHtml).toBe('string');
    });
  });
});

