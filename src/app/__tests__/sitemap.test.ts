// Mock dependencies BEFORE importing
jest.mock('fs');
jest.mock('gray-matter');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({
      toString: () => '<p>Processed content</p>',
    }),
  })),
}));

jest.mock('@/lib/getPolicies');
jest.mock('@/lib/getPosts');
jest.mock('@/lib/getProducts');
jest.mock('@/lib/getProjects');
jest.mock('@/lib/getReleases');

import sitemap from '../sitemap';
import { getPolicies } from '@/lib/getPolicies';
import { getSortedPosts } from '@/lib/getPosts';
import { getSortedProducts } from '@/lib/getProducts';
import { getSortedProjects } from '@/lib/getProjects';
import { getSortedReleases } from '@/lib/getReleases';

const mockGetPolicies = getPolicies as jest.MockedFunction<typeof getPolicies>;
const mockGetSortedPosts = getSortedPosts as jest.MockedFunction<typeof getSortedPosts>;
const mockGetSortedProducts = getSortedProducts as jest.MockedFunction<typeof getSortedProducts>;
const mockGetSortedProjects = getSortedProjects as jest.MockedFunction<typeof getSortedProjects>;
const mockGetSortedReleases = getSortedReleases as jest.MockedFunction<typeof getSortedReleases>;

describe('sitemap', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });

  it('should generate sitemap with all required pages', async () => {
    mockGetSortedPosts.mockReturnValue([
      { slug: 'post-1', title: 'Post 1', date: '2025-01-01', excerpt: 'Excerpt 1' },
    ]);
    mockGetSortedProducts.mockResolvedValue([
      { id: 'product-1', title: 'Product 1', date: '2025-01-01', type: 'mobile-app' as const, description: 'Desc', contentHtml: '' },
    ]);
    mockGetSortedProjects.mockResolvedValue([
      { id: 'project-1', title: 'Project 1', date: '2025-01-01', description: 'Desc', contentHtml: '', features: [], technologies: [], links: [] },
    ]);
    mockGetSortedReleases.mockResolvedValue([
      { id: 'release-1', title: 'Release 1', date: '2025-01-01', description: 'Desc', contentHtml: '' },
    ]);
    mockGetPolicies.mockResolvedValue([
      { id: 'policy-1', title: 'Policy 1', content: 'Content' },
    ]);

    const result = await sitemap();

    expect(result).toContainEqual({
      url: 'https://example.com',
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  it('should include blog posts in sitemap', async () => {
    mockGetSortedPosts.mockReturnValue([
      { slug: 'my-post', title: 'My Post', date: '2025-01-01', excerpt: 'Excerpt' },
    ]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    const blogPost = result.find(item => item.url === 'https://example.com/blog/my-post');
    expect(blogPost).toBeDefined();
    expect(blogPost?.lastModified).toBe('2025-01-01');
    expect(blogPost?.changeFrequency).toBe('monthly');
    expect(blogPost?.priority).toBe(0.5);
  });

  it('should include projects in sitemap', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([
      { id: 'recall-kit', title: 'RecallKit', date: '2025-01-01', description: 'Desc', contentHtml: '', features: [], technologies: [], links: [] },
    ]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    const project = result.find(item => item.url === 'https://example.com/projects/recall-kit');
    expect(project).toBeDefined();
    expect(project?.changeFrequency).toBe('monthly');
    expect(project?.priority).toBe(0.5);
  });

  it('should include releases in sitemap', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([
      { id: 'release-2025-01-01', title: 'Release', date: '2025-01-01', description: 'Desc', contentHtml: '' },
    ]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    const release = result.find(item => item.url === 'https://example.com/releases/release-2025-01-01');
    expect(release).toBeDefined();
    expect(release?.changeFrequency).toBe('monthly');
    expect(release?.priority).toBe(0.5);
  });

  it('should include policies in sitemap', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([
      { id: 'privacy-policy', title: 'Privacy Policy', content: 'Content' },
    ]);

    const result = await sitemap();

    const policy = result.find(item => item.url === 'https://example.com/policies/privacy-policy');
    expect(policy).toBeDefined();
    expect(policy?.changeFrequency).toBe('monthly');
    expect(policy?.priority).toBe(0.5);
  });

  it('should include static pages with correct priorities', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    const contact = result.find(item => item.url === 'https://example.com/contact');
    const privacy = result.find(item => item.url === 'https://example.com/privacy');
    const security = result.find(item => item.url === 'https://example.com/security');
    const people = result.find(item => item.url === 'https://example.com/people');

    expect(contact).toBeDefined();
    expect(privacy).toBeDefined();
    expect(security).toBeDefined();
    expect(people).toBeDefined();
    
    expect(contact?.priority).toBe(0.125);
    expect(privacy?.priority).toBe(0.125);
    expect(security?.priority).toBe(0.125);
    expect(people?.priority).toBe(0.25);
  });

  it('should handle empty data gracefully', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    // Should still have static pages
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(item => item.url === 'https://example.com')).toBe(true);
  });

  it('should include products in sitemap', async () => {
    mockGetSortedPosts.mockReturnValue([]);
    mockGetSortedProducts.mockResolvedValue([
      { id: 'taskflow-app', title: 'TaskFlow Pro', date: '2025-01-15', type: 'mobile-app' as const, description: 'Desc', contentHtml: '' },
      { id: 'mvp-development', title: 'MVP Development', date: '2025-01-19', type: 'consulting' as const, description: 'Desc', contentHtml: '' },
    ]);
    mockGetSortedProjects.mockResolvedValue([]);
    mockGetSortedReleases.mockResolvedValue([]);
    mockGetPolicies.mockResolvedValue([]);

    const result = await sitemap();

    const mobileApp = result.find(item => item.url === 'https://example.com/products/taskflow-app');
    const consulting = result.find(item => item.url === 'https://example.com/products/mvp-development');
    const productsPage = result.find(item => item.url === 'https://example.com/products');
    
    expect(mobileApp).toBeDefined();
    expect(consulting).toBeDefined();
    expect(productsPage).toBeDefined();
    expect(mobileApp?.changeFrequency).toBe('monthly');
    expect(mobileApp?.priority).toBe(0.6);
    expect(productsPage?.priority).toBe(0.9);
  });
});

