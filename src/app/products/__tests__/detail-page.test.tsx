jest.mock('@/lib/getProducts');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test content</p>' }),
  })),
}));

import { render, screen } from '@testing-library/react';
import ProductPage from '../[id]/page';
import { getProductById } from '@/lib/getProducts';

const mockGetProductById = getProductById as jest.MockedFunction<typeof getProductById>;

describe('ProductPage', () => {
  it('shows the store badges above the overview heading', async () => {
    mockGetProductById.mockResolvedValue({
      id: 'vesselog',
      title: 'VesseLog',
      date: '2026-08-25',
      description: 'Vessel maintenance companion',
      contentHtml: '<p>content</p>',
      type: 'mobile-app',
      links: [
        { text: 'App Store', url: 'https://apps.apple.com/app' },
        { text: 'Play Store', url: 'https://play.google.com/app' },
      ],
    });

    render(await ProductPage({ params: Promise.resolve({ id: 'vesselog' }) }));

    const badge = screen.getByRole('link', { name: 'Download on the App Store' });
    const overview = screen.getByRole('heading', { name: 'Overview' });
    expect(badge.compareDocumentPosition(overview) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
