// Builds a safe blog post path from a slug.
// Slugs originate from markdown file names on disk (see getPosts.ts), which
// CodeQL treats as an uncontrolled/stored value. encodeURIComponent keeps the
// result a plain path segment and rules out a javascript: URI or markup
// breakout when the href is rendered.
export function blogPostHref(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}
