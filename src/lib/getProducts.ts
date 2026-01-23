import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

export type Product = {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
  type: 'mobile-app' | 'consulting';
  price?: string;
  features?: string[];
  technologies?: string[];
  links?: Array<{
    text: string;
    url: string;
  }>;
  deliverables?: string[];
  duration?: string;
};

export async function getSortedProducts(): Promise<Product[]> {
  const fileNames = fs.readdirSync(productsDirectory);
  const allProductsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(productsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Product, 'id' | 'contentHtml'>),
    };
  }));

  // Sort by date, but always put "everything-else" last
  return allProductsData.sort((a, b) => {
    // If either is "everything-else", handle it specially
    if (a.id === 'everything-else' && b.id !== 'everything-else') return 1;
    if (b.id === 'everything-else' && a.id !== 'everything-else') return -1;
    // Otherwise sort by date (newest first) - negate localeCompare for descending order
    return -a.date.localeCompare(b.date);
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const fullPath = path.join(productsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Product, 'id' | 'contentHtml'>),
    };
  } catch {
    return null;
  }
}
