import fs from 'fs';
import path from 'path';
import { getSortedProjects, getProjectById, type Project } from '../getProjects';

// Mock dependencies
jest.mock('fs');
jest.mock('gray-matter');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({
      toString: () => '<p>Processed project content</p>',
    }),
  })),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;
const matter = require('gray-matter');

describe('getProjects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => '/mock/workspace');
  });

  describe('getSortedProjects', () => {
    it('should return sorted projects by date (newest first)', async () => {
      const mockFileNames = ['project-2025-03-17.md', 'project-2025-07-25.md', 'project-2025-05-10.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockImplementation((filePath: string) => {
        const fileName = path.basename(filePath);
        if (fileName === 'project-2025-03-17.md') {
          return '---\ntitle: Project 1\ndate: 2025-03-17\ndescription: First project\nfeatures: [Feature 1]\ntechnologies: [Tech 1]\nlinks: []\n---\nContent 1';
        }
        if (fileName === 'project-2025-07-25.md') {
          return '---\ntitle: Project 2\ndate: 2025-07-25\ndescription: Second project\nfeatures: [Feature 2]\ntechnologies: [Tech 2]\nlinks: []\n---\nContent 2';
        }
        if (fileName === 'project-2025-05-10.md') {
          return '---\ntitle: Project 3\ndate: 2025-05-10\ndescription: Third project\nfeatures: [Feature 3]\ntechnologies: [Tech 3]\nlinks: []\n---\nContent 3';
        }
        return '';
      });

      matter.mockImplementation((content: string) => {
        const dateMatch = content.match(/date: (.+)/);
        const titleMatch = content.match(/title: (.+)/);
        const descMatch = content.match(/description: (.+)/);
        return {
          data: {
            title: titleMatch?.[1] || '',
            date: dateMatch?.[1] || '',
            description: descMatch?.[1] || '',
            features: [],
            technologies: [],
            links: [],
          },
          content: content.split('---\n')[2] || '',
        };
      });

      const projects = await getSortedProjects();

      expect(projects).toHaveLength(3);
      expect(projects[0].date).toBe('2025-07-25');
      expect(projects[1].date).toBe('2025-05-10');
      expect(projects[2].date).toBe('2025-03-17');
    });

    it('should process markdown content to HTML', async () => {
      const mockFileNames = ['test-project.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: Test Project\ndate: 2025-07-25\ndescription: Test\nfeatures: []\ntechnologies: []\nlinks: []\n---\n# Project content');

      matter.mockReturnValue({
        data: {
          title: 'Test Project',
          date: '2025-07-25',
          description: 'Test',
          features: [],
          technologies: [],
          links: [],
        },
        content: '# Project content',
      });

      const projects = await getSortedProjects();

      expect(projects[0].contentHtml).toBe('<p>Processed project content</p>');
    });

    it('should extract id from filename', async () => {
      const mockFileNames = ['recall-kit.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: RecallKit\ndate: 2025-07-25\ndescription: Test\nfeatures: []\ntechnologies: []\nlinks: []\n---\nContent');

      matter.mockReturnValue({
        data: {
          title: 'RecallKit',
          date: '2025-07-25',
          description: 'Test',
          features: [],
          technologies: [],
          links: [],
        },
        content: 'Content',
      });

      const projects = await getSortedProjects();

      expect(projects[0].id).toBe('recall-kit');
    });

    it('should include all project fields', async () => {
      const mockFileNames = ['test-project.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: Test Project\ndate: 2025-07-25\ndescription: Test description\nfeatures: [Feature 1, Feature 2]\ntechnologies: [Swift, SwiftUI]\nlinks: [{text: App Store, url: https://example.com}]\n---\nContent');

      matter.mockReturnValue({
        data: {
          title: 'Test Project',
          date: '2025-07-25',
          description: 'Test description',
          features: ['Feature 1', 'Feature 2'],
          technologies: ['Swift', 'SwiftUI'],
          links: [{ text: 'App Store', url: 'https://example.com' }],
        },
        content: 'Content',
      });

      const projects = await getSortedProjects();

      expect(projects[0]).toHaveProperty('id');
      expect(projects[0]).toHaveProperty('title');
      expect(projects[0]).toHaveProperty('date');
      expect(projects[0]).toHaveProperty('description');
      expect(projects[0]).toHaveProperty('contentHtml');
      expect(projects[0]).toHaveProperty('features');
      expect(projects[0]).toHaveProperty('technologies');
      expect(projects[0]).toHaveProperty('links');
      expect(projects[0].features).toEqual(['Feature 1', 'Feature 2']);
      expect(projects[0].technologies).toEqual(['Swift', 'SwiftUI']);
      expect(projects[0].links).toEqual([{ text: 'App Store', url: 'https://example.com' }]);
    });

    it('should return empty array when no files exist', async () => {
      mockedFs.readdirSync.mockReturnValue([] as any);

      const projects = await getSortedProjects();

      expect(projects).toEqual([]);
    });
  });

  describe('getProjectById', () => {
    it('should return project by id', async () => {
      const mockId = 'recall-kit';
      const mockContent = '---\ntitle: RecallKit\ndate: 2025-07-25\ndescription: Flashcard app\nfeatures: [Import, Export]\ntechnologies: [Swift]\nlinks: [{text: App Store, url: https://example.com}]\n---\n# Project content';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      matter.mockReturnValue({
        data: {
          title: 'RecallKit',
          date: '2025-07-25',
          description: 'Flashcard app',
          features: ['Import', 'Export'],
          technologies: ['Swift'],
          links: [{ text: 'App Store', url: 'https://example.com' }],
        },
        content: '# Project content',
      });

      const project = await getProjectById(mockId);

      expect(project).not.toBeNull();
      expect(project?.id).toBe(mockId);
      expect(project?.title).toBe('RecallKit');
      expect(project?.date).toBe('2025-07-25');
      expect(project?.description).toBe('Flashcard app');
      expect(project?.features).toEqual(['Import', 'Export']);
      expect(project?.technologies).toEqual(['Swift']);
      expect(project?.links).toEqual([{ text: 'App Store', url: 'https://example.com' }]);
      expect(project?.contentHtml).toBe('<p>Processed project content</p>');
    });

    it('should return null when file does not exist', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const project = await getProjectById('non-existent-project');

      expect(project).toBeNull();
    });

    it('should handle file read errors gracefully', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const project = await getProjectById('error-project');

      expect(project).toBeNull();
    });

    it('should handle projects with empty arrays', async () => {
      const mockId = 'minimal-project';
      const mockContent = '---\ntitle: Minimal\ndate: 2025-07-25\ndescription: Minimal project\nfeatures: []\ntechnologies: []\nlinks: []\n---\nContent';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      matter.mockReturnValue({
        data: {
          title: 'Minimal',
          date: '2025-07-25',
          description: 'Minimal project',
          features: [],
          technologies: [],
          links: [],
        },
        content: 'Content',
      });

      const project = await getProjectById(mockId);

      expect(project).not.toBeNull();
      expect(project?.features).toEqual([]);
      expect(project?.technologies).toEqual([]);
      expect(project?.links).toEqual([]);
    });
  });
});

