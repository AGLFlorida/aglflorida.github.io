import './globals.css';
import Link from 'next/link';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';

import { Breadcrumbs } from '@/lib/Breadcrumbs';
import {
  IconLinkedIn,
  IconX,
  IconGithub,
  IconGooglePlay,
  IconAppStore,
} from '@/lib/icons';
import { generateOrganizationSchema, generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'AGL Consulting LLC';
  const description = 'Fractional technical leadership for companies that need CTO-level outcomes without a full-time hire. We build. We ship. We don\'t disappear after the deck.';

  return {
    title,
    description,
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: '/favicon.png',
    },
    openGraph: generateOpenGraphMetadata(title, description, baseUrl),
    twitter: generateTwitterMetadata(title, description),
  };
}

// export const metadata = {
//   title: 'AGL Consulting LLC',
//   description: 'AGL Consulting LLC is a software development company based in Florida.',
//   icons: {
//     icon: '/favicon.png',
//   },
//   alternates: {
//     canonical: ${process.env.NEXT_PUBLIC_BASE_URL},
//   },
// };

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600', '700'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight: ['600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const personSchema = generatePersonSchema(baseUrl);
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="sticky top-0 z-50 bg-gray-800 shadow-sm">
          <div className="w-full px-4 grid grid-cols-3 items-center h-14">
            <Link href="/" className="col-start-1 flex items-center space-x-3 hover:text-gray-300 transition justify-self-start">
              <picture className="h-10 w-10 shrink-0">
                <source srcSet="/siteicon.avif" type="image/avif" />
                <source srcSet="/siteicon.webp" type="image/webp" />
                <img
                  src="/siteicon.png"
                  alt="Site Icon"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              </picture>
              <span className="font-heading text-lg font-bold text-gray-100">
                AGL <span className="hidden md:inline">Consulting</span>
              </span>
            </Link>

            <nav className="col-start-2 hidden md:flex items-center justify-center space-x-8 justify-self-center">
              <Link href="/products" className="text-gray-100 hover:text-gray-300 transition">
                Products
              </Link>
              <Link href="/about" className="text-gray-100 hover:text-gray-300 transition">
                About
              </Link>
              <Link href="/blog/page/1" className="text-gray-100 hover:text-gray-300 transition">
                Blog
              </Link>
              <a
                href="https://github.com/AGLFlorida/aglflorida.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-gray-300 transition"
                aria-label="GitHub repository"
              >
                <IconGithub className="h-5 w-5" aria-hidden />
              </a>
            </nav>

            <div className="col-start-3 flex items-center space-x-4 justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 font-medium rounded-md"
              >
                Contact
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          <Breadcrumbs />
          {children}
        </main>
        <footer className="mt-16 bg-gray-800 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-caption font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Site
                </h2>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <li>
                    <Link href="/" prefetch={false} className="hover:text-white transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" prefetch={false} className="hover:text-white transition">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" prefetch={false} className="hover:text-white transition">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/people" prefetch={false} className="hover:text-white transition">
                      People
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies" prefetch={false} className="hover:text-white transition">
                      Policies
                    </Link>
                  </li>
                  <li>
                    <Link href="/releases" prefetch={false} className="hover:text-white transition">
                      Releases
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" prefetch={false} className="hover:text-white transition">
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-caption font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  About
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" prefetch={false} className="hover:text-white transition">
                      About AGL
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/page/1" prefetch={false} className="hover:text-white transition">
                      Company Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-caption font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Legal
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" prefetch={false} className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" prefetch={false} className="hover:text-white transition">
                      Security Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessibility" prefetch={false} className="hover:text-white transition">
                      Accessibility Statement
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-caption font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Connect
                </h2>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://www.linkedin.com/company/agl-consulting-llc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition inline-flex"
                    aria-label="LinkedIn"
                  >
                    <IconLinkedIn className="h-5 w-5" aria-hidden />
                  </a>
                  <a
                    href="https://x.com/AGLFlorida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition inline-flex"
                    aria-label="X"
                  >
                    <IconX className="h-5 w-5" aria-hidden />
                  </a>
                  <a
                    href="https://github.com/aglflorida/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition inline-flex"
                    aria-label="GitHub"
                  >
                    <IconGithub className="h-5 w-5" aria-hidden />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/dev?id=5851403031328766349"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition inline-flex"
                    aria-label="Google Play"
                  >
                    <IconGooglePlay className="h-5 w-5" aria-hidden />
                  </a>
                  <a
                    href="https://apps.apple.com/us/developer/agl-consulting-llc/id1801519023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition inline-flex"
                    aria-label="App Store"
                  >
                    <IconAppStore className="h-5 w-5" aria-hidden />
                  </a>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/contact" prefetch={false} className="hover:text-white transition">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://coff.ee/aglflorida"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                    >
                      Support Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-200">
              {'\u00A9'} {currentYear} AGL Consulting LLC
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
