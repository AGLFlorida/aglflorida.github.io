import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

import { Breadcrumbs } from '@/lib/Breadcrumbs';
import { generateOrganizationSchema, generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'AGL Consulting LLC';
  const description = 'AGL Consulting LLC is a software development company based in Florida.';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const personSchema = generatePersonSchema(baseUrl);
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
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
        <header className="relative h-36 md:h-44">
           <Image
            src="/header.jpg" // adjust this path as needed
            alt="Header Background"
            fill
            className="object-cover z-0"
            priority
          />

          <div className="absolute inset-0 bg-gray-900/70 shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center h-full">
              <Link href="/" className="flex items-center space-x-3 hover:text-gray-300 transition">
                <Image
                  src="/siteicon.png"
                  alt="Site Icon"
                  width={40}
                  height={40}
                  style={{ width: '40px', height: '40px' }}
                  className="rounded-full"
                />
                <span className="text-4xl font-bold text-gray-100">
                  AGL <span className="hidden md:inline">Consulting</span>
                </span>
              </Link>
            
              <div className="flex items-center space-x-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 font-medium rounded-md"
                >
                  Contact
                </Link>
              </div>
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
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Site
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:text-white transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:text-white transition">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:text-white transition">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/people" className="hover:text-white transition">
                      People
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies" className="hover:text-white transition">
                      Policies
                    </Link>
                  </li>
                  <li>
                    <Link href="/releases" className="hover:text-white transition">
                      Releases
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  About
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-white transition">
                      About AGL
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/page/1" className="hover:text-white transition">
                      Company Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="hover:text-white transition">
                      Security Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://www.linkedin.com/company/agl-consulting-llc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/aglflorida/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/dev?id=5851403031328766349"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="Google Play"
                  >
                    <i className="fab fa-google-play"></i>
                  </a>
                  <a
                    href="https://apps.apple.com/us/developer/agl-consulting-llc/id1801519023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="App Store"
                  >
                    <i className="fab fa-app-store"></i>
                  </a>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/contact" className="hover:text-white transition">
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
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
              {'\u00A9'} {currentYear} AGL Consulting LLC
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
