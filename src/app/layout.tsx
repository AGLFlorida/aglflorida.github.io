import './globals.css';
import Link from 'next/link';
import Image from 'next/image';


import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'AGL Consulting LLC',
    description: 'AGL Consulting LLC is a software development company based in Florida.',
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: '/favicon.png',
    },
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

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-gray-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 hover:text-gray-300 transition">
              <Image
                src="/siteicon.png"
                alt="Site Icon"
                width={40}
                height={40}
                style={{ width: '40px', height: '40px' }}
                className="rounded-full"
              />
              <span className="text-4xl font-bold text-gray-100">AGL Consulting</span>
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/agl-consulting-llc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/aglflorida/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://play.google.com/store/apps/dev?id=5851403031328766349"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-google-play text-lg"></i>
              </a>
              <div className="relative group">
                <button
                  className="text-2xl text-gray-100 hover:text-gray-300 p-2"
                  aria-label="Navigation Menu"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <div className="absolute right-0 top-[80%] pt-4 w-48 invisible group-hover:visible">
                  <div className="bg-white rounded-lg shadow-lg py-2">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Home
                    </Link>
                    <Link
                      href="/blog"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Company Blog
                    </Link>
                    <Link
                      href="/projects"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/people"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      People
                    </Link>
                    <Link
                      href="/policies"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Policies
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">{children}</main>
        <footer className="text-center py-4 text-gray-600">
          <div>{'\u00A9'} {currentYear} AGL Consulting LLC</div>
          <div className="mt-2">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/security" className="text-blue-600 hover:text-blue-800">
              Security Policy
            </Link>
            {" | "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
              Contact Us
            </Link >
          </div>
        </footer>
      </body>
    </html>
  );
}
