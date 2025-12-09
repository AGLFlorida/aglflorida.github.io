import {
  generatePersonSchema,
  generateArticleSchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
} from '../schema';

describe('schema', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://aglflorida.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });

  describe('generatePersonSchema', () => {
    it('should generate Person schema with required fields', () => {
      const schema = generatePersonSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toBe('Brandon Shoop');
      expect(schema.url).toBe('https://aglflorida.com');
      expect(schema.jobTitle).toBe('Managing Partner');
      expect(schema.worksFor).toEqual({
        '@type': 'Organization',
        name: 'AGL Consulting LLC',
        url: 'https://aglflorida.com',
      });
      expect(schema.sameAs).toContain('https://www.linkedin.com/in/brandonshoop/');
      expect(schema.sameAs).toContain('https://github.com/aglflorida/');
    });

    it('should use provided baseUrl', () => {
      const schema = generatePersonSchema('https://example.com');

      expect(schema.url).toBe('https://example.com');
    });

    it('should fallback to default URL when env var is not set', () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const schema = generatePersonSchema();

      expect(schema.url).toBe('https://aglflorida.com');
    });
  });

  describe('generateArticleSchema', () => {
    it('should generate BlogPosting schema with required fields', () => {
      const schema = generateArticleSchema(
        'Test Post',
        '2025-01-01',
        'https://aglflorida.com/blog/test-post',
        'Test excerpt'
      );

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe('Test Post');
      expect(schema.description).toBe('Test excerpt');
      expect(schema.datePublished).toBe('2025-01-01');
      expect(schema.dateModified).toBe('2025-01-01');
      expect(schema.author).toEqual({
        '@type': 'Person',
        name: 'Brandon Shoop',
        url: 'https://aglflorida.com',
      });
      expect(schema.publisher).toEqual({
        '@type': 'Organization',
        name: 'AGL Consulting LLC',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aglflorida.com/siteicon.png',
        },
      });
      expect(schema.mainEntityOfPage).toEqual({
        '@type': 'WebPage',
        '@id': 'https://aglflorida.com/blog/test-post',
      });
    });

    it('should use dateModified when provided', () => {
      const schema = generateArticleSchema(
        'Test Post',
        '2025-01-01',
        'https://aglflorida.com/blog/test-post',
        'Test excerpt',
        '2025-01-02'
      );

      expect(schema.dateModified).toBe('2025-01-02');
    });

    it('should use provided baseUrl', () => {
      const schema = generateArticleSchema(
        'Test Post',
        '2025-01-01',
        'https://example.com/blog/test-post',
        'Test excerpt',
        undefined,
        'https://example.com'
      );

      expect(schema.author.url).toBe('https://example.com');
      expect(schema.publisher.logo?.url).toBe('https://example.com/siteicon.png');
    });
  });

  describe('generateProjectSchema', () => {
    it('should generate SoftwareApplication schema with required fields', () => {
      const schema = generateProjectSchema(
        'Test Project',
        'Test description',
        'https://aglflorida.com/projects/test-project'
      );

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBe('Test Project');
      expect(schema.description).toBe('Test description');
      expect(schema.author).toEqual({
        '@type': 'Person',
        name: 'Brandon Shoop',
      });
      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      });
    });

    it('should include applicationCategory when provided', () => {
      const schema = generateProjectSchema(
        'Test Project',
        'Test description',
        'https://aglflorida.com/projects/test-project',
        'MobileApplication'
      );

      expect(schema.applicationCategory).toBe('MobileApplication');
    });

    it('should include operatingSystem when provided', () => {
      const schema = generateProjectSchema(
        'Test Project',
        'Test description',
        'https://aglflorida.com/projects/test-project',
        undefined,
        'iOS, Android'
      );

      expect(schema.operatingSystem).toBe('iOS, Android');
    });

    it('should include both optional fields when provided', () => {
      const schema = generateProjectSchema(
        'Test Project',
        'Test description',
        'https://aglflorida.com/projects/test-project',
        'MobileApplication',
        'iOS, Android'
      );

      expect(schema.applicationCategory).toBe('MobileApplication');
      expect(schema.operatingSystem).toBe('iOS, Android');
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate BreadcrumbList schema with correct structure', () => {
      const items = [
        { name: 'Home', url: 'https://aglflorida.com' },
        { name: 'Blog', url: 'https://aglflorida.com/blog' },
        { name: 'Post', url: 'https://aglflorida.com/blog/post' },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aglflorida.com',
      });
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aglflorida.com/blog',
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Post',
        item: 'https://aglflorida.com/blog/post',
      });
    });

    it('should handle empty items array', () => {
      const schema = generateBreadcrumbSchema([]);

      expect(schema.itemListElement).toHaveLength(0);
    });
  });

  describe('generateWebsiteSchema', () => {
    it('should generate WebSite schema with required fields', () => {
      const schema = generateWebsiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('AGL Consulting LLC');
      expect(schema.url).toBe('https://aglflorida.com');
      expect(schema.author).toEqual({
        '@type': 'Person',
        name: 'Brandon Shoop',
      });
    });

    it('should use provided baseUrl', () => {
      const schema = generateWebsiteSchema('https://example.com');

      expect(schema.url).toBe('https://example.com');
    });

    it('should fallback to default URL when env var is not set', () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const schema = generateWebsiteSchema();

      expect(schema.url).toBe('https://aglflorida.com');
    });
  });
});

