import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Breadcrumbs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render breadcrumbs for nested paths', () => {
    mockUsePathname.mockReturnValue('/blog/my-post');
    
    render(<Breadcrumbs />);
    
    expect(screen.getByText('Home /')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
    expect(screen.getByText('my-post')).toBeInTheDocument();
  });

  it('should render breadcrumbs for root path', () => {
    mockUsePathname.mockReturnValue('/');
    
    render(<Breadcrumbs />);
    
    // Root path should not show Home since segments.length is 0
    const nav = screen.getByLabelText('Breadcrumbs');
    expect(nav).toBeInTheDocument();
    expect(nav.children.length).toBe(0);
  });

  it('should handle URL-encoded segments', () => {
    mockUsePathname.mockReturnValue('/blog/my%20awesome%20post');
    
    render(<Breadcrumbs />);
    
    expect(screen.getByText('my awesome post')).toBeInTheDocument();
  });

  it('should have proper aria-label for accessibility', () => {
    mockUsePathname.mockReturnValue('/projects/recall-kit');
    
    render(<Breadcrumbs />);
    
    const nav = screen.getByLabelText('Breadcrumbs');
    expect(nav).toBeInTheDocument();
  });

  it('should create correct hrefs for each breadcrumb', () => {
    mockUsePathname.mockReturnValue('/blog/page/1');
    
    render(<Breadcrumbs />);
    
    const homeLink = screen.getByText('Home /').closest('a');
    const blogLink = screen.getByText('blog').closest('a');
    const pageLink = screen.getByText('page').closest('a');
    const oneLink = screen.getByText('1').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(blogLink).toHaveAttribute('href', '/blog');
    expect(pageLink).toHaveAttribute('href', '/blog/page');
    expect(oneLink).toHaveAttribute('href', '/blog/page/1');
  });
});

