import { blogPostHref } from '../blogHref';

describe('blogPostHref', () => {
  it('builds a /blog/<slug> path for a normal slug', () => {
    expect(blogPostHref('my-first-post')).toBe('/blog/my-first-post');
  });

  it('percent-encodes characters that could change the URL scheme or structure', () => {
    const malicious = 'javascript:alert(1)';
    const href = blogPostHref(malicious);
    expect(href.startsWith('/blog/')).toBe(true);
    expect(href).not.toContain('javascript:');
  });

  it('percent-encodes a slug containing markup-breaking characters', () => {
    const href = blogPostHref('"><script>alert(1)</script>');
    expect(href).not.toContain('<script>');
    expect(href).not.toContain('"');
  });
});
