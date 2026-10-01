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
const STORE_BADGES: Record<string, StoreBadge> = {
  'App Store': { src: '/badges/app-store.svg', alt: 'Download on the App Store', width: 144, height: 48 },
  'Play Store': { src: '/badges/google-play.png', alt: 'Get it on Google Play', width: 194, height: 75 },
};

/**
 * Renders a product/project link. App Store and Play Store links use the official badges;
 * everything else keeps the icon plus text treatment.
 */
export function ExternalLinkItem({ link }: { link: ExternalLinkData }) {
  const badge = STORE_BADGES[link.text];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 hover:text-blue-900 flex items-center space-x-1"
    >
      {badge ? (
        <Image src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} />
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
