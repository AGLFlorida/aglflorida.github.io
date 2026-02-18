import { getPostBySlug, getSortedPosts } from "@/lib/getPosts";
import { metadataFactory } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";
import { generateBreadcrumbSchemaForPath } from "@/lib/BreadcrumbSchema";
import type { ResolvingMetadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }, parent: ResolvingMetadata) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return metadataFactory("Blog", "Post Not Found")({ params: Promise.resolve({ slug }) }, parent);
  }

  return metadataFactory("Blog", post.title, {
    description: post.excerpt,
    type: 'article',
  })({ params: Promise.resolve({ slug }) }, parent);
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Post Not Found</h1>
        <p>The requested post could not be found.</p>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const url = `${baseUrl}/blog/${slug}`;
  const articleSchema = generateArticleSchema(post.title, post.date, url, post.excerpt, undefined, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/blog/${slug}`);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-700 mb-6">
              <p>{post.date}</p>
              <span className="text-gray-300">•</span>
              <p>By Brandon Shoop</p>
            </div>
            <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </div>

        {/* Right Rail */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-8">
            <h2 className="text-xl font-bold mb-4">All Blog Posts</h2>
            <p className="text-gray-600 mb-4">
              Explore all of our blog posts on technology, development, and technical product management.
            </p>
            <Link
              href="/blog/page/1"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition text-center font-semibold w-full"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
