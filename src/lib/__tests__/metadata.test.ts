import { metadataFactory, generateOpenGraphMetadata, generateTwitterMetadata } from '../metadata';
import type { ResolvingMetadata } from 'next';

describe('metadata', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });

  describe('generateOpenGraphMetadata', () => {
    it('should generate Open Graph metadata with required fields', () => {
      const og = generateOpenGraphMetadata(
        'Test Title',
        'Test description',
        'https://example.com/test'
      );

      expect(og?.title).toBe('Test Title');
      expect(og?.description).toBe('Test description');
      expect(og?.url).toBe('https://example.com/test');
      expect(og?.siteName).toBe('AGL Consulting LLC');
      expect(og?.locale).toBe('en_US');
      expect(og?.type).toBe('website');
      expect(og?.images).toHaveLength(1);
      expect(og?.images?.[0]?.url).toBe('https://example.com/siteicon.png');
    });

    it('should use article type when specified', () => {
      const og = generateOpenGraphMetadata(
        'Test Title',
        'Test description',
        'https://example.com/test',
        undefined,
        'article'
      );

      expect(og?.type).toBe('article');
    });

    it('should use custom image when provided', () => {
      const og = generateOpenGraphMetadata(
        'Test Title',
        'Test description',
        'https://example.com/test',
        'https://example.com/custom-image.png'
      );

      expect(og?.images?.[0]?.url).toBe('https://example.com/custom-image.png');
    });

    it('should fallback to default URL when env var is not set', () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const og = generateOpenGraphMetadata(
        'Test Title',
        'Test description',
        'https://aglflorida.com/test'
      );

      expect(og?.images?.[0]?.url).toBe('https://aglflorida.com/siteicon.png');
    });
  });

  describe('generateTwitterMetadata', () => {
    it('should generate Twitter Card metadata with required fields', () => {
      const twitter = generateTwitterMetadata(
        'Test Title',
        'Test description'
      );

      expect(twitter?.card).toBe('summary_large_image');
      expect(twitter?.title).toBe('Test Title');
      expect(twitter?.description).toBe('Test description');
      expect(twitter?.images).toHaveLength(1);
      expect(twitter?.images?.[0]).toBe('https://example.com/siteicon.png');
    });

    it('should use custom image when provided', () => {
      const twitter = generateTwitterMetadata(
        'Test Title',
        'Test description',
        'https://example.com/custom-image.png'
      );

      expect(twitter?.images?.[0]).toBe('https://example.com/custom-image.png');
    });

    it('should fallback to default URL when env var is not set', () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const twitter = generateTwitterMetadata(
        'Test Title',
        'Test description'
      );

      expect(twitter?.images?.[0]).toBe('https://aglflorida.com/siteicon.png');
    });
  });

  describe('metadataFactory', () => {
    it('should generate metadata with base title when no slug or id is provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: All Posts');
      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should generate metadata with slug when slug is provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-first-post' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: My First Post');
      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/my-first-post');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should generate metadata with id when id is provided', async () => {
      const generateMetadata = metadataFactory('Project', 'All Projects');
      const params = Promise.resolve({ id: 'recall-kit' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Project: Recall Kit');
      expect(metadata.description).toBe('Content from Project on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/project/recall-kit');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should humanize slug with hyphens and underscores', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-awesome_post' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: My Awesome Post');
      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/my-awesome_post');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should handle multiple hyphens and underscores', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'release-notes-2025-jun-25' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: Release Notes 2025 Jun 25');
      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/release-notes-2025-jun-25');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should capitalize first letter of each word', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'lowercase-title' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: Lowercase Title');
      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/lowercase-title');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should handle base with different casing', async () => {
      const generateMetadata = metadataFactory('Releases', 'All Releases');
      const params = Promise.resolve({ id: 'releasenotes-2025' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Releases: Releasenotes 2025');
      expect(metadata.description).toBe('Content from Releases on AGL Consulting LLC');
      expect(metadata.alternates?.canonical).toBe('https://example.com/releases/releasenotes-2025');
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
    });

    it('should prefer slug over id when both are provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-post', id: 'my-id' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: My Post');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/my-post');
    });

    it('should include description when provided in options', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts', {
        description: 'Custom description',
      });
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.description).toBe('Custom description');
    });

    it('should use default description when not provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.description).toBe('Content from Blog on AGL Consulting LLC');
    });

    it('should include Open Graph metadata by default', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('Blog: All Posts');
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('should exclude Open Graph metadata when includeOpenGraph is false', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts', {
        includeOpenGraph: false,
      });
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.openGraph).toBeUndefined();
    });

    it('should include Twitter metadata by default', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.title).toBe('Blog: All Posts');
    });

    it('should exclude Twitter metadata when includeTwitter is false', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts', {
        includeTwitter: false,
      });
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.twitter).toBeUndefined();
    });

    it('should use article type when specified', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts', {
        type: 'article',
      });
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.openGraph?.type).toBe('article');
    });

    it('should use custom image when provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts', {
        image: 'https://example.com/custom-image.png',
      });
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.openGraph?.images?.[0]?.url).toBe('https://example.com/custom-image.png');
      expect(metadata.twitter?.images?.[0]).toBe('https://example.com/custom-image.png');
    });
  });
});

