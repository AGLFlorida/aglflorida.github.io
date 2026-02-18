import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";
import { metadataFactory } from "@/lib/metadata";
import { generateBreadcrumbSchemaForPath } from "@/lib/BreadcrumbSchema";

const POSTS_PER_PAGE = 5;

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getSortedPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export const generateMetadata = metadataFactory("Blog", "All Posts", {
  description: "Browse all blog posts from AGL Consulting LLC on technology, software development, and technical product management.",
});

type Params = Promise<{ page: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { page } = await params;
  const currentPage = Number(page) || 1;
  const posts = getSortedPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);
  const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/blog/page/${page}`);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow">
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <div key={post.slug} className="border-b last:border-0 pb-6 last:pb-0">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold text-blue-800 group-hover:text-blue-900 mb-2">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                  <p>{post.date}</p>
                  <span className="text-gray-300">•</span>
                  <p>By Brandon Shoop</p>
                </div>
                {post.excerpt && <p className="text-gray-600">{post.excerpt}</p>}
              </Link>
            </div>
          ))}
        </div>
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>

        {/* Right Rail */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">The Team</h2>
              <p className="text-gray-600 mb-4">
                Learn more about the people behind AGL Consulting and our human-centered approach to technology.
              </p>
              <Link
                href="/people"
                className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition text-center font-semibold w-full"
              >
                Meet Our People
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Founder&apos;s Blog</h2>
              <p className="text-gray-600 mb-4">
                Check out Brandon Shoop&apos;s personal blog for more insights on technology, development, and leadership.
              </p>
              <a
                href="https://brandonshoop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition text-center font-semibold w-full"
              >
                Visit Founder&apos;s Blog <i className="fas fa-external-link-alt text-sm ml-1" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginationControls({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  return (
    <div className="flex justify-between items-center py-4">
      <div>
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`} className="text-blue-800 hover:text-blue-900">
            ← Previous
          </Link>
        )}
      </div>
      <div className="space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={`/blog/page/${pageNum}`}
            className={`px-3 py-1 rounded ${
              pageNum === currentPage ? "bg-blue-800 text-white" : "text-blue-800 hover:bg-blue-100"
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>
      <div>
        {currentPage < totalPages && (
          <Link href={`/blog/page/${currentPage + 1}`} className="text-blue-800 hover:text-blue-900">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
