import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import { getSortedProducts } from "@/lib/getProducts";

export default async function Home() {
  const posts = getSortedPosts();
  const products = await getSortedProducts();
  const projects = await getSortedProjects();
  const featuredPosts = posts.slice(0, 3); // Show only first 3 posts
  const featuredProjects = projects.slice(0, 2); // Show only first 2 projects
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Main Content Column */}
      <div className="w-full lg:w-2/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome to AGL Consulting</h1>
          <p className="mb-4">
            In reality, this business serves two purposes. We offer professional services in technical fields. 
            It&apos;s also a staging ground for our development projects, ideas, and professional portfolio(s) 
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/products">
              Products
            </Link>
          </h2>
          <ul className="space-y-3">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-medium text-blue-800 hover:text-blue-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <Link href="/products" className="text-blue-800 hover:text-blue-900">
            More...
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link href="/blog/page/1">Company Blog <i className="fa-solid fa-link text-lg"></i></Link>
          </h2>
          <ul className="space-y-3">
            {featuredPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-medium text-blue-800 hover:text-blue-900">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-700">{post.excerpt || post.date}</p>
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <Link href="/blog/page/1" className="text-blue-800 hover:text-blue-900">
            More...
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link href="/projects/">Projects <i className="fa-solid fa-link text-lg"></i></Link>
          </h2>
          <ul className="space-y-3">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-medium text-blue-800 hover:text-blue-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <Link href="/projects/" className="text-blue-800 hover:text-blue-900">
            More...
          </Link>
        </div>
      </div>
    </div>
  );
}
