import fs from 'fs';
import path from 'path';
import { getPolicies, getPolicyById } from '../getPolicies';

// Mock dependencies
jest.mock('fs');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({
      toString: () => '<h1>Privacy Policy</h1><p>Policy content</p>',
    }),
  })),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;

describe('getPolicies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.cwd = jest.fn(() => '/mock/workspace');
  });

  describe('getPolicies', () => {
    it('should return all policies with processed HTML content', async () => {
      const mockFileNames = ['recall-kit-policy.md', 'n-back-policy.md', 'swoleapp-policy.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockImplementation((filePath: string) => {
        const fileName = path.basename(filePath);
        if (fileName === 'recall-kit-policy.md') {
          return '# Privacy Policy for RecallKit\n\nPolicy content';
        }
        if (fileName === 'n-back-policy.md') {
          return '# Privacy Policy for N-Back\n\nPolicy content';
        }
        if (fileName === 'swoleapp-policy.md') {
          return '# Privacy Policy for SwoleApp\n\nPolicy content';
        }
        return '';
      });

      const policies = await getPolicies();

      expect(policies).toHaveLength(3);
      expect(policies[0].id).toBe('recall-kit-policy');
      expect(policies[1].id).toBe('n-back-policy');
      expect(policies[2].id).toBe('swoleapp-policy');
    });

    it('should generate title from id by capitalizing words', async () => {
      const mockFileNames = ['recall-kit-policy.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('# Privacy Policy\n\nContent');

      const policies = await getPolicies();

      expect(policies[0].title).toBe('Recall Kit Policy');
    });

    it('should process markdown content to HTML', async () => {
      const mockFileNames = ['test-policy.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('# Policy Title\n\nPolicy content');

      const policies = await getPolicies();

      expect(policies[0].content).toBe('<h1>Privacy Policy</h1><p>Policy content</p>');
    });

    it('should handle single word policy names', async () => {
      const mockFileNames = ['policy.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('# Policy\n\nContent');

      const policies = await getPolicies();

      expect(policies[0].title).toBe('Policy');
    });

    it('should handle multiple hyphens in policy names', async () => {
      const mockFileNames = ['recall-kit-policy-sp.md'];
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue(mockFileNames as any);
      mockedFs.readFileSync.mockReturnValue('# Policy\n\nContent');

      const policies = await getPolicies();

      expect(policies[0].title).toBe('Recall Kit Policy Sp');
    });

    it('should return empty array when no files exist', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFs.readdirSync.mockReturnValue([] as any);

      const policies = await getPolicies();

      expect(policies).toEqual([]);
    });
  });

  describe('getPolicyById', () => {
    it('should return policy by id', async () => {
      const mockId = 'recall-kit-policy';
      const mockContent = '# Privacy Policy for RecallKit\n\nThis is the policy content.';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      const policy = await getPolicyById(mockId);

      expect(policy).not.toBeNull();
      expect(policy?.id).toBe(mockId);
      expect(policy?.title).toBe('Recall Kit Policy');
      expect(policy?.content).toBe(mockContent);
    });

    it('should generate title from id', async () => {
      const mockId = 'n-back-policy';
      const mockContent = '# Policy\n\nContent';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      const policy = await getPolicyById(mockId);

      expect(policy?.title).toBe('N Back Policy');
    });

    it('should return null when file does not exist', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const policy = await getPolicyById('non-existent-policy');

      expect(policy).toBeNull();
    });

    it('should handle file read errors gracefully', async () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const policy = await getPolicyById('error-policy');

      expect(policy).toBeNull();
    });

    it('should preserve raw content without processing for getPolicyById', async () => {
      const mockId = 'test-policy';
      const mockContent = '# Raw Policy Content\n\nThis should not be processed.';

      mockedFs.readFileSync.mockReturnValue(mockContent);

      const policy = await getPolicyById(mockId);

      expect(policy?.content).toBe(mockContent);
      expect(policy?.content).not.toContain('<h1>Privacy Policy</h1>');
    });
  });
});

