jest.mock('@/lib/getProducts');
jest.mock('remark-html', () => jest.fn());
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test content</p>' }),
  })),
}));

import { render, screen } from '@testing-library/react';
import ProductsPage from '../page';
import { getSortedProducts } from '@/lib/getProducts';

const mockGetSortedProducts = getSortedProducts as jest.MockedFunction<typeof getSortedProducts>;

describe('ProductsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('links a product tile to its bespoke page and hides the title icon when configured', async () => {
    mockGetSortedProducts.mockResolvedValue([
      {
        id: 'vesselog',
        title: 'VesseLog',
        date: '2026-08-25',
        description: 'Vessel maintenance companion',
        contentHtml: '',
        type: 'mobile-app',
        href: '/vesselog',
        hideTitleIcon: true,
      },
    ]);

    const page = await ProductsPage();
    render(page);

    const titleLink = screen.getByRole('link', { name: 'VesseLog' });
    expect(titleLink).toHaveAttribute('href', '/vesselog');
    expect(titleLink.querySelector('svg')).toBeNull();
  });

  it('falls back to the generic product detail page and shows the icon by default', async () => {
    mockGetSortedProducts.mockResolvedValue([
      {
        id: 'recall-kit',
        title: 'RecallKit',
        date: '2025-07-25',
        description: 'Flashcard app',
        contentHtml: '',
        type: 'mobile-app',
      },
    ]);

    const page = await ProductsPage();
    render(page);

    const titleLink = screen.getByRole('link', { name: 'RecallKit' });
    expect(titleLink).toHaveAttribute('href', '/products/recall-kit');
    expect(titleLink.querySelector('svg')).not.toBeNull();
  });
});
