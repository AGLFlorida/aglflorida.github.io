import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { IconLinkedIn } from '@/lib/icons';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Meet the Team | AGL Consulting',
    alternates: {
      canonical: `${baseUrl}/people`,
    },
  };
}

export default async function PeoplePage() {
  return (
    <div className="py-8">
      <h1 className="font-heading text-h1 font-bold mb-8">Our People</h1>
      <p className="mb-4">
        Professionals who got tired of watching good teams get bad advice.
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
              <Image
                src="/people/face2.png"
                alt="Co-founder 1"
                width={96}
                height={96}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="font-heading text-h3 font-semibold">
                <a
                  href="https://www.linkedin.com/in/aliza-shoop-a668a138/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Aliza Shoop <IconLinkedIn className="inline h-4 w-4" aria-hidden />
                </a>
              </h2>
              <p className="text-gray-600">Vice President</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
              <Image
                src="/people/face.png"
                alt="Co-founder 2"
                width={96}
                height={96}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="font-heading text-h3 font-semibold">
                <a
                  href="https://www.linkedin.com/in/brandonshoop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Brandon Shoop <IconLinkedIn className="inline h-4 w-4" aria-hidden />
                </a>
              </h2>
              <p className="text-gray-600">Managing Partner</p>
            </div>
          </div>
        </div>
        <aside className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 sticky top-8">
            <h2 className="font-heading text-h3 font-semibold mb-4">Company Blog</h2>
            <p className="text-gray-600 mb-4">
              Ideas, updates, and practical tech from the team.
            </p>
            <Link
              href="/blog/page/1"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 hover:shadow-md transition-all text-center font-semibold w-full"
            >
              Read the blog
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}