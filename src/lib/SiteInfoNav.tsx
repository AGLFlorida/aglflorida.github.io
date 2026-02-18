import Link from 'next/link';

const SITE_INFO_LINKS = [
  { href: '/about', label: 'About AGL' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/security', label: 'Security Policy' },
] as const;

type SiteInfoPath = '/about' | '/privacy' | '/security';

interface SiteInfoNavProps {
  currentPath: SiteInfoPath;
}

/**
 * Navigation box linking About Us, Privacy Policy, and Security Policy.
 * Renders on each of those pages so users can move between them.
 */
export function SiteInfoNav({ currentPath }: SiteInfoNavProps) {
  return (
    <nav
      className="bg-white border border-gray-200 rounded-lg shadow p-2 w-full"
      aria-label="Site information"
    >
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
        Site information
      </h2>
      <ul className="space-y-2">
        {SITE_INFO_LINKS.map(({ href, label }) => {
          const isCurrent = href === currentPath;
          return (
            <li key={href}>
              {isCurrent ? (
                <span
                  className="font-medium text-gray-700"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-blue-800 hover:text-blue-900 hover:underline block"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
