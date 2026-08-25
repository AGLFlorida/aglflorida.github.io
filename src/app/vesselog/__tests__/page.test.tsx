import { render, screen } from '@testing-library/react';
import VesseLogPage, { generateMetadata } from '../page';

describe('VesseLogPage', () => {
  it('renders the hero, features, and pricing tiers', () => {
    render(<VesseLogPage />);

    expect(screen.getByRole('heading', { name: 'VesseLog ©', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Your Complete Vessel Maintenance Companion')).toBeInTheDocument();

    expect(screen.getByText('Smart Scheduling')).toBeInTheDocument();

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('Additional Boats')).toBeInTheDocument();
    expect(screen.getByText('+$1.99')).toBeInTheDocument();
    expect(screen.getByText('Fleet')).toBeInTheDocument();
    expect(screen.getAllByText('Contact Us').length).toBeGreaterThan(0);
  });

  it('shows a coming-soon banner instead of a clickable hero CTA', () => {
    render(<VesseLogPage />);

    const banner = screen.getByText('Coming soon to iOS and Android');
    expect(banner).toBeInTheDocument();
    expect(banner.closest('a')).toBeNull();
  });

  it('links pricing CTAs to the contact page with distinct accessible names', () => {
    render(<VesseLogPage />);

    const contactLinks = screen.getAllByRole('link').filter((link) => link.getAttribute('href') === '/contact');
    expect(contactLinks.length).toBeGreaterThanOrEqual(3);

    const accessibleNames = contactLinks.map((link) => link.getAttribute('aria-label') || link.textContent);
    expect(new Set(accessibleNames).size).toBe(accessibleNames.length);
  });
});

describe('generateMetadata', () => {
  it('builds title, description, and canonical url', async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBe('VesseLog | Your Complete Vessel Maintenance Companion');
    expect(metadata.alternates?.canonical).toBe('https://aglflorida.com/vesselog');
  });
});
