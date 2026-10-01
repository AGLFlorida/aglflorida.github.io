import { render, screen } from '@testing-library/react';
import { ExternalLinkItem } from '../ExternalLinkItem';

describe('ExternalLinkItem', () => {
  it('renders the official App Store badge with no text label', () => {
    render(<ExternalLinkItem link={{ text: 'App Store', url: 'https://apps.apple.com/app' }} />);

    const link = screen.getByRole('link', { name: 'Download on the App Store' });
    expect(link).toHaveAttribute('href', 'https://apps.apple.com/app');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('app-store.svg'));
    expect(screen.queryByText('App Store')).toBeNull();
  });

  it('renders the official Google Play badge', () => {
    render(<ExternalLinkItem link={{ text: 'Play Store', url: 'https://play.google.com/app' }} />);

    const link = screen.getByRole('link', { name: 'Get it on Google Play' });
    expect(link).toHaveAttribute('href', 'https://play.google.com/app');
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('google-play.png'));
  });

  it.each(['Github', 'GitHub'])('keeps the icon and text for %s links', (text) => {
    const { container } = render(<ExternalLinkItem link={{ text, url: 'https://github.com/x' }} />);

    expect(screen.getByRole('link', { name: text })).toHaveAttribute('href', 'https://github.com/x');
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('keeps the globe icon and text for Website links', () => {
    const { container } = render(<ExternalLinkItem link={{ text: 'Website', url: 'https://example.com' }} />);

    expect(screen.getByRole('link', { name: 'Website' })).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
