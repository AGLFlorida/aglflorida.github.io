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

  it('renders SoftwareApplication schema for a free mobile app', async () => {
    mockGetProductById.mockResolvedValue({
      id: 'n-back',
      title: 'Dual N-Back',
      date: '2026-05-28',
      description: 'A cognitive training game.',
      contentHtml: '<p>content</p>',
      type: 'mobile-app',
      price: 'Free',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'GameApplication',
    });

    const { container } = render(await ProductPage({ params: Promise.resolve({ id: 'n-back' }) }));

    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const softwareSchema = Array.from(scripts)
      .map((script) => JSON.parse(script.innerHTML))
      .find((schema) => schema['@type'] === 'SoftwareApplication');

    expect(softwareSchema).toMatchObject({
      name: 'Dual N-Back',
      applicationCategory: 'GameApplication',
      operatingSystem: 'iOS, Android',
      offers: { price: '0' },
    });
  });

  it('does not render SoftwareApplication schema for a priced mobile app', async () => {
    mockGetProductById.mockResolvedValue({
      id: 'vesselog',
      title: 'VesseLog',
      date: '2026-08-25',
      description: 'Vessel maintenance companion',
      contentHtml: '<p>content</p>',
      type: 'mobile-app',
      price: 'Contact for Pricing',
    });

    const { container } = render(await ProductPage({ params: Promise.resolve({ id: 'vesselog' }) }));

    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const softwareSchema = Array.from(scripts)
      .map((script) => JSON.parse(script.innerHTML))
      .find((schema) => schema['@type'] === 'SoftwareApplication');

    expect(softwareSchema).toBeUndefined();
  });

  it('does not render SoftwareApplication schema for a consulting product', async () => {
    mockGetProductById.mockResolvedValue({
      id: 'fractional-cto',
      title: 'Fractional CTO',
      date: '2026-04-09',
      description: 'Executive technology leadership.',
      contentHtml: '<p>content</p>',
      type: 'consulting',
      price: 'Contact for Pricing',
    });

    const { container } = render(await ProductPage({ params: Promise.resolve({ id: 'fractional-cto' }) }));

    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const softwareSchema = Array.from(scripts)
      .map((script) => JSON.parse(script.innerHTML))
      .find((schema) => schema['@type'] === 'SoftwareApplication');

    expect(softwareSchema).toBeUndefined();
  });
});
