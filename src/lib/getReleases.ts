import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const releasesDirectory = path.join(process.cwd(), 'src/content/releases');

export type Release = {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
};

export async function getSortedReleases(): Promise<Release[]> {
  const fileNames = fs.readdirSync(releasesDirectory);
  const allReleasesData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(releasesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Release, 'id' | 'contentHtml'>),
    };
  }));

  return allReleasesData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export async function getReleaseById(id: string): Promise<Release | null> {
  try {
    const fullPath = path.join(releasesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Release, 'id' | 'contentHtml'>),
    };
  } catch {
    return null;
  }
} 