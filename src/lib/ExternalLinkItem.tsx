import Image from 'next/image';
import { IconGithub, IconGlobe } from '@/lib/icons';

export type ExternalLinkData = {
  text: string;
  url: string;
};

type StoreBadge = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Official badge artwork, unmodified (served from public/badges). Apple's badge is 48px tall;
// Google's PNG carries built-in clear space, so drawn 75px tall its badge is about 50px.
// The web app badge is our own, drawn in the store badges' style and sized like Apple's.
const STORE_BADGES: Record<string, StoreBadge> = {
  'App Store': { src: '/badges/app-store.svg', alt: 'Download on the App Store', width: 144, height: 48 },
  'Play Store': { src: '/badges/google-play.png', alt: 'Get it on Google Play', width: 194, height: 75 },
  'Web App': { src: '/badges/web-app.svg', alt: 'Open in your Browser', width: 132, height: 48 },
};

// Overview tiles are dense, so their badges are drawn at half the detail page size.
const COMPACT_SCALE = 0.5;

type ExternalLinkItemProps = {
  link: ExternalLinkData;
  compact?: boolean;
};

/**
 * Renders a product/project link. App Store, Play Store and Web App links use badges;
 * everything else keeps the icon plus text treatment.
 */
export function ExternalLinkItem({ link, compact = false }: ExternalLinkItemProps) {
  const badge = STORE_BADGES[link.text];
  const scale = compact ? COMPACT_SCALE : 1;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 hover:text-blue-900 flex items-center space-x-1"
    >
      {badge ? (
        <Image
          src={badge.src}
          alt={badge.alt}
          width={Math.round(badge.width * scale)}
          height={Math.round(badge.height * scale)}
        />
      ) : (
        <>
          {(link.text === 'Github' || link.text === 'GitHub') && <IconGithub className="h-5 w-5" aria-hidden />}
          {link.text === 'Website' && <IconGlobe className="h-5 w-5" aria-hidden />}
          <span>{link.text}</span>
        </>
      )}
    </a>
  );
}
