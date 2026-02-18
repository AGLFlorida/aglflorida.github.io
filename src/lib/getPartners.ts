import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const partnersDirectory = path.join(process.cwd(), 'src/content/partners');

export type Partner = {
  id: string;
  title: string;
  description: string;
  logo: string;
  url: string;
  order?: number;
};

export function getPartners(): Partner[] {
  if (!fs.existsSync(partnersDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(partnersDirectory).filter((f) => f.endsWith('.md'));
  const allPartners = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(partnersDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as Omit<Partner, 'id'>),
    };
  });
  return allPartners.sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });
}
