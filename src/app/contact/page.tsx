import ContactForm from './ContactForm';
import type { Metadata } from 'next';
import { getSortedPosts } from '@/lib/getPosts';
import { IconLink } from '@/lib/icons';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Get in Touch | Talk Tech Strategy with AGL Consulting',
    description: 'Get in touch with AGL Consulting.',
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
      <h1 className="text-3xl font-bold mb-8">Get in Touch</h1>
      <p className="mb-8">
        Talk Tech Strategy with AGL Consulting.
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="w-full lg:w-2/3">
          <ContactForm />
        </div>

        {/* Right Rail */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-8">
            <h2 className="text-xl font-bold mb-4">
              <Link href="/blog/page/1" className="inline-flex items-center gap-1">Company Blog <IconLink className="h-5 w-5" aria-hidden /></Link>
            </h2>
            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <div key={post.slug}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    <Link href={`/blog/${post.slug}`} className="text-blue-800 hover:text-blue-900">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{post.excerpt || post.date}</p>
                  <p className="text-xs text-gray-700">{post.date}</p>
                </div>
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