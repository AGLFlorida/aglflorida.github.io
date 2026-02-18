'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

let clientMounted = false;

function subscribeToMounted(callback: () => void) {
  if (clientMounted) {
    callback();
    return () => {};
  }
  const id = requestAnimationFrame(() => {
    clientMounted = true;
    callback();
  });
  return () => cancelAnimationFrame(id);
}

function getServerSnapshot() {
  return false;
}

function getClientSnapshot() {
  return clientMounted;
}

/**
 * Renders path-based breadcrumbs. Uses a static placeholder until after mount
 * so the built HTML and first client render match (avoids hydration mismatch #418).
 * Site is 100% static (no backend, no SSR).
 */
export const Breadcrumbs = () => {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    subscribeToMounted,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) {
    return (
      <nav aria-label="Breadcrumbs">
        <span className="text-sm">
          <Link href="/" className="text-blue-800 hover:underline">
            Home
          </Link>
        </span>
      </nav>
    );
  }

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment);
    return (
      <span key={href} className="text-sm">
        {' / '}
        <Link href={href} className="text-blue-800 hover:underline">
          {label}
        </Link>
      </span>
    );
  });

  return (
    <nav aria-label="Breadcrumbs">
      <span className="text-sm">
        <Link href="/" className="text-blue-800 hover:underline">
          Home
        </Link>
      </span>
      {crumbs}
    </nav>
  );
};
