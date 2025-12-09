import { generateBreadcrumbSchemaForPath } from '../BreadcrumbSchema';

describe('BreadcrumbSchema', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://aglflorida.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });

  describe('generateBreadcrumbSchemaForPath', () => {
    it('should generate breadcrumb for home path', () => {
      const schema = generateBreadcrumbSchemaForPath('/');

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(1);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aglflorida.com',
      });
    });

    it('should generate breadcrumb for single segment path', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog');

      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].name).toBe('Home');
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aglflorida.com/blog',
      });
    });

    it('should generate breadcrumb for nested paths', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/my-post');

      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0].name).toBe('Home');
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aglflorida.com/blog',
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'My Post',
        item: 'https://aglflorida.com/blog/my-post',
      });
    });

    it('should humanize path segments with hyphens', () => {
      const schema = generateBreadcrumbSchemaForPath('/projects/recall-kit');

      expect(schema.itemListElement[2].name).toBe('Recall Kit');
    });

    it('should humanize path segments with underscores', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/my_awesome_post');

      expect(schema.itemListElement[2].name).toBe('My Awesome Post');
    });

    it('should humanize path segments with mixed hyphens and underscores', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/my-awesome_post');

      expect(schema.itemListElement[2].name).toBe('My Awesome Post');
    });

    it('should capitalize first letter of each word', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/lowercase-title');

      expect(schema.itemListElement[2].name).toBe('Lowercase Title');
    });

    it('should handle URL encoded segments', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/my%20post');

      expect(schema.itemListElement[2].name).toBe('My Post');
    });

    it('should handle deep nested paths', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/page/1');

      expect(schema.itemListElement).toHaveLength(4);
      expect(schema.itemListElement[1].name).toBe('Blog');
      expect(schema.itemListElement[2].name).toBe('Page');
      expect(schema.itemListElement[3].name).toBe('1');
    });

    it('should use correct base URL from environment', () => {
      process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
      const schema = generateBreadcrumbSchemaForPath('/blog');

      expect(schema.itemListElement[0].item).toBe('https://example.com');
      expect(schema.itemListElement[1].item).toBe('https://example.com/blog');
    });

    it('should fallback to default URL when env var is not set', () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const schema = generateBreadcrumbSchemaForPath('/blog');

      expect(schema.itemListElement[0].item).toBe('https://aglflorida.com');
    });

    it('should maintain correct position ordering', () => {
      const schema = generateBreadcrumbSchemaForPath('/blog/page/1');

      schema.itemListElement.forEach((item, index) => {
        expect(item.position).toBe(index + 1);
      });
    });
  });
});

