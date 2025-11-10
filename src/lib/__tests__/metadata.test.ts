import { metadataFactory } from '../metadata';
import type { ResolvingMetadata } from 'next';

describe('metadata', () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
  });

  describe('metadataFactory', () => {
    it('should generate metadata with base title when no slug or id is provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({});
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Blog: All Posts',
        alternates: {
          canonical: 'https://example.com/blog',
        },
      });
    });

    it('should generate metadata with slug when slug is provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-first-post' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Blog: My First Post',
        alternates: {
          canonical: 'https://example.com/blog/my-first-post',
        },
      });
    });

    it('should generate metadata with id when id is provided', async () => {
      const generateMetadata = metadataFactory('Project', 'All Projects');
      const params = Promise.resolve({ id: 'recall-kit' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Project: Recall Kit',
        alternates: {
          canonical: 'https://example.com/project/recall-kit',
        },
      });
    });

    it('should humanize slug with hyphens and underscores', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-awesome_post' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Blog: My Awesome Post',
        alternates: {
          canonical: 'https://example.com/blog/my-awesome_post',
        },
      });
    });

    it('should handle multiple hyphens and underscores', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'release-notes-2025-jun-25' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Blog: Release Notes 2025 Jun 25',
        alternates: {
          canonical: 'https://example.com/blog/release-notes-2025-jun-25',
        },
      });
    });

    it('should capitalize first letter of each word', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'lowercase-title' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Blog: Lowercase Title',
        alternates: {
          canonical: 'https://example.com/blog/lowercase-title',
        },
      });
    });

    it('should handle base with different casing', async () => {
      const generateMetadata = metadataFactory('Releases', 'All Releases');
      const params = Promise.resolve({ id: 'releasenotes-2025' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata).toEqual({
        title: 'Releases: Releasenotes 2025',
        alternates: {
          canonical: 'https://example.com/releases/releasenotes-2025',
        },
      });
    });

    it('should prefer slug over id when both are provided', async () => {
      const generateMetadata = metadataFactory('Blog', 'All Posts');
      const params = Promise.resolve({ slug: 'my-post', id: 'my-id' });
      const parent = {} as ResolvingMetadata;

      const metadata = await generateMetadata({ params }, parent);

      expect(metadata.title).toBe('Blog: My Post');
      expect(metadata.alternates?.canonical).toBe('https://example.com/blog/my-post');
    });
  });
});

