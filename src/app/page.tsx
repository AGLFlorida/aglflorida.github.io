import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import { getSortedReleases } from "@/lib/getReleases";

export default async function Home() {
  const posts = getSortedPosts();
  const releases = await getSortedReleases();
  const projects = await getSortedProjects();
  const featuredProjects = projects.slice(0, 2); // Show only first 2 projects
  const featuredReleases = releases.slice(0, 4);

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Main Content Column */}
      <div className="w-full lg:w-2/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome to AGL of Florida</h1>
          <p className="mb-4">
            In reality, this business serves two purposes. It&apos;s a staging ground for the founders&apos; development projects and ideas. Additionally, our business facing 
            identity is as follows... (should be read like a movie voice-over!)
          </p>
          <p className="mb-4">
            In a world of accelerating connectivity and rapid AI proliferation, AGL Consulting is grounded in a simple belief: technology
            should amplify the human experience, not obscure it.<br />
            <br />
            AGL Consulting partners with small and mid-sized businesses that need to modernize their technology without losing sight of
            their core mission. Many of these organizations lack the time, resources, or focus to prioritize software and IT strategy&mdash;AGL
            steps in to fill that gap with clarity, capability, and a human-first approach.<br />
            <br />
            Founded by seasoned engineering leaders with decades of experience across high-growth platforms like TeamSnap and Boats Group,
            AGL brings executive-level insight, technical leadership, and operational discipline to companies that can&apos;t justify a
            full-time CTO but still demand world-class technology outcomes.<br />
            <br />
            Whether advising on infrastructure, improving developer workflows, or managing complex migrations, AGL delivers practical,
            people-centric solutions designed for long-term impact&mdash;not short-term hype. <br />
            <br />
            At its core, AGL exists to help businesses do what they do best&mdash;by making technology work for people, not the other way
            around.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/projects/">Projects</Link>
          </h2>
          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link href={`/projects/${project.id}`}>
                    {project.title} <i className="fa-solid fa-link text-lg"></i>
                  </Link>
                </h3>
                <p className="mb-3 text-gray-600">{project.description}</p>
                <div className="flex space-x-4">
                  {project.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      {link.text === "App Store" && <i className="fab fa-app-store text-lg"></i>}
                      {link.text === "Play Store" && <i className="fab fa-google-play text-lg"></i>}
                      {link.text === "Github" && <i className="fab fa-github text-lg"></i>}
                      <span>{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <hr />
            <Link href="/projects/" className="text-blue-600 hover:text-blue-800">
              More...
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link href="/blog/">
              Company Blog
            </Link>
          </h2>
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-medium text-blue-600 hover:text-blue-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800">
            More...
          </Link>
        </div>

        {/* Latest Releases Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Latest Releases</h2>
          <ul className="space-y-3">
            {featuredReleases.map((release) => (
              <li key={release.id}>
                <Link
                  href={`/releases/${release.id}`}
                  className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
                >
                  <h3 className="font-medium text-blue-600 hover:text-blue-800">
                    {release.title}
                  </h3>
                  {/* <p className="text-sm text-gray-500">{release.date}</p> */}
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <Link href="/releases/" className="text-blue-600 hover:text-blue-800">
            More...
          </Link>
        </div>
      </div>
    </div>
  );
}
