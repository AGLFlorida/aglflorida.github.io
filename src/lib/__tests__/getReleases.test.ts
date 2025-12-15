import fs from 'fs';
import path from 'path';
import { getSortedReleases, getReleaseById } from '../getReleases';
import matter from 'gray-matter';
import type { GrayMatterFile } from 'gray-matter';

// Mock dependencies
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

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedMatter = matter as jest.MockedFunction<typeof matter>;

// Helper to create properly typed GrayMatterFile mocks
function createMatterFile(data: Record<string, unknown>, content: string): GrayMatterFile<string> {
  return {
    data,
    content,
    orig: Buffer.from(''),
    language: '',
    matter: '',
    stringify: jest.fn(),
  };
}

describe('getReleases', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => '/mock/workspace');
  });

  describe('getSortedReleases', () => {
    it('should return sorted releases by date (newest first)', async () => {
      const mockFileNames = ['release-2025-06-25.md', 'release-2025-07-13.md', 'release-2025-06-27.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as unknown as ReturnType<typeof fs.readdirSync>);
      mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
        const fileName = path.basename(filePath as string);
        if (fileName === 'release-2025-06-25.md') {
          return '---\ntitle: Release 1\ndate: 2025-06-25\ndescription: First release\n---\nContent 1';
        }
        if (fileName === 'release-2025-07-13.md') {
          return '---\ntitle: Release 2\ndate: 2025-07-13\ndescription: Second release\n---\nContent 2';
        }
        if (fileName === 'release-2025-06-27.md') {
          return '---\ntitle: Release 3\ndate: 2025-06-27\ndescription: Third release\n---\nContent 3';
        }
        return '';
      });

      mockedMatter.mockImplementation((input: string | Buffer | { content: string | Buffer }) => {
        const content = typeof input === 'string' ? input : Buffer.isBuffer(input) ? input.toString() : input.content.toString();
        const dateMatch = content.match(/date: (.+)/);
        const titleMatch = content.match(/title: (.+)/);
        const descMatch = content.match(/description: (.+)/);
        return createMatterFile(
          {
            title: titleMatch?.[1] || '',
            date: dateMatch?.[1] || '',
            description: descMatch?.[1] || '',
          },
          content.split('---\n')[2] || ''
        );
      });

      const releases = await getSortedReleases();

      expect(releases).toHaveLength(3);
      expect(releases[0].date).toBe('2025-07-13');
      expect(releases[1].date).toBe('2025-06-27');
      expect(releases[2].date).toBe('2025-06-25');
    });

    it('should process markdown content to HTML', async () => {
      const mockFileNames = ['release-2025-06-25.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as unknown as ReturnType<typeof fs.readdirSync>);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: Test Release\ndate: 2025-06-25\ndescription: Test\n---\n# Content');

      mockedMatter.mockReturnValue(createMatterFile(
        {
          title: 'Test Release',
          date: '2025-06-25',
          description: 'Test',
        },
        '# Content'
      ));

      const releases = await getSortedReleases();

      expect(releases[0].contentHtml).toBe('<p>Processed content</p>');
    });

    it('should extract id from filename', async () => {
      const mockFileNames = ['releasenotes-2025-jun-25.md'];
      
      mockedFs.readdirSync.mockReturnValue(mockFileNames as unknown as ReturnType<typeof fs.readdirSync>);
      mockedFs.readFileSync.mockReturnValue('---\ntitle: Test\ndate: 2025-06-25\ndescription: Test\n---\nContent');

      mockedMatter.mockReturnValue(createMatterFile({
          title: 'Test',
          date: '2025-06-25',
          description: 'Test',
        },
        'Content'
      ));

      const releases = await getSortedReleases();

      expect(releases[0].id).toBe('releasenotes-2025-jun-25');
    });

    it('should return empty array when no files exist', async () => {
      mockedFs.readdirSync.mockReturnValue([] as unknown as ReturnType<typeof fs.readdirSync>);

      const releases = await getSortedReleases();

      expect(releases).toEqual([]);
    });
  });

  describe('getReleaseById', () => {
    it('should return release by id', async () => {
      const mockId = 'releasenotes-2025-jun-25';
      const mockContent = '---\ntitle: Test Release\ndate: 2025-06-25\ndescription: Test description\n---\n# Release content';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      mockedMatter.mockReturnValue(createMatterFile({
          title: 'Test Release',
          date: '2025-06-25',
          description: 'Test description',
        },
        '# Release content'
      ));

      const release = await getReleaseById(mockId);

      expect(release).not.toBeNull();
      expect(release?.id).toBe(mockId);
      expect(release?.title).toBe('Test Release');
      expect(release?.date).toBe('2025-06-25');
      expect(release?.description).toBe('Test description');
      expect(release?.contentHtml).toBe('<p>Processed content</p>');
    });

    it('should return null when file does not exist', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const release = await getReleaseById('non-existent-release');

      expect(release).toBeNull();
    });

    it('should handle file read errors gracefully', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const release = await getReleaseById('error-release');

      expect(release).toBeNull();
    });
  });
});

