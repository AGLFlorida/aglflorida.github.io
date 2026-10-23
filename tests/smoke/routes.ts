import fs from 'fs';
import path from 'path';

function firstSlug(contentDir: string): string {
  const dir = path.join(process.cwd(), 'src/content', contentDir);
  const [file] = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  if (!file) {
    throw new Error(`No content files found in src/content/${contentDir}`);
  }
  return file.replace(/\.md$/, '');
}

export const staticRoutes: string[] = [
  '/',
  '/about',
  '/accessibility',
  '/blog',
  '/contact',
  '/partners',
  '/people',
  '/policies',
  '/privacy',
  '/products',
  '/projects',
  '/releases',
  '/security',
];

export const dynamicRoutes: string[] = [
  '/blog/page/1',
  `/blog/${firstSlug('blog')}`,
  `/products/${firstSlug('products')}`,
  `/projects/${firstSlug('projects')}`,
  `/policies/${firstSlug('policies')}`,
  `/releases/${firstSlug('releases')}`,
];

export const allRoutes: string[] = [...staticRoutes, ...dynamicRoutes];
