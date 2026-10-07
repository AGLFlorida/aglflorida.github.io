import ContactForm from './ContactForm';
import type { Metadata } from 'next';
import { getSortedPosts } from '@/lib/getPosts';
import { IconLink } from '@/lib/icons';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Get in Touch | AGL Consulting',
    description: 'Hard technical problems deserve a real conversation. Tell us what you\'re dealing with. Consulting inquiries and VesseLog support both land here.',
    alternates: {
      canonical: `${baseUrl}/contact`,
    },
  };
}

export default function ContactPage() {
  const posts = getSortedPosts();
  const featuredPosts = posts.slice(0, 4); // Show only first 4 posts

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="font-heading text-h1 font-bold mb-8">Get in Touch</h1>
      <p className="mb-8">
        Hard technical problems deserve a real conversation. Tell us what you&apos;re dealing with. Consulting inquiries and VesseLog support both land here.
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="w-full lg:w-2/3">
          <ContactForm />
        </div>

        {/* Right Rail */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100 sticky top-8">
            <h2 className="font-heading text-h3 font-semibold mb-4">
              <Link href="/blog/page/1" className="inline-flex items-center gap-1">Company Blog <IconLink className="h-5 w-5" aria-hidden /></Link>
            </h2>
            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block hover:bg-gray-50 hover:shadow-sm p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-heading text-h3 font-semibold text-blue-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{post.excerpt || post.date}</p>
                  <p className="text-xs text-gray-700">{post.date}</p>
                </Link>
              ))}
              <hr />
              <Link href="/blog/page/1" className="text-blue-800 hover:text-blue-900">
                More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}