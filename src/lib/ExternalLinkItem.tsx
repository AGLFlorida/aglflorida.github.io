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
  // Visible area of the artwork as fractions of its drawn size, for images with built-in clear space.
  crop?: { left: number; top: number; width: number; height: number };
};

const STORE_BADGES: Record<string, StoreBadge> = {
  'App Store': { src: '/badges/app-store.svg', alt: 'Download on the App Store', width: 144, height: 48 },
  'Play Store': {
    src: '/badges/google-play.png',
    alt: 'Get it on Google Play',
    width: 194,
    height: 75,
    crop: { left: 40 / 646, top: 40 / 250, width: 567 / 646, height: 168 / 250 },
  },
  'Web App': { src: '/badges/web-app.svg', alt: 'Open in your Browser', width: 132, height: 48 },
};

// Overview tiles are dense, so their badges are drawn at two thirds of the detail page size.
const COMPACT_SCALE = 2 / 3;

type ExternalLinkItemProps = {
  link: ExternalLinkData;
  compact?: boolean;
};

function StoreBadgeImage({ badge, scale }: { badge: StoreBadge; scale: number }) {
  const width = Math.round(badge.width * scale);
  const height = Math.round(badge.height * scale);
  const { crop } = badge;

  if (!crop) {
    return <Image src={badge.src} alt={badge.alt} width={width} height={height} />;
  }

  return (
    <span
      className="block overflow-hidden"
      style={{ width: Math.round(width * crop.width), height: Math.round(height * crop.height) }}
    >
      <Image
        src={badge.src}
        alt={badge.alt}
        width={width}
        height={height}
        style={{
          maxWidth: 'none',
          marginLeft: -Math.round(width * crop.left),
          marginTop: -Math.round(height * crop.top),
        }}
      />
    </span>
  );
}

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
        <StoreBadgeImage badge={badge} scale={scale} />
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
