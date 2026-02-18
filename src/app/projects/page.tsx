import Link from "next/link";
import { getSortedProjects } from "@/lib/getProjects";
import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateTwitterMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchemaForPath } from "@/lib/BreadcrumbSchema";
import { IconLink, IconAppStore, IconGooglePlay, IconGithub } from "@/lib/icons";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'Projects | Practical Tech with Real-World Impact';
  const description = 'Projects under development or found interesting. Practical Tech with Real-World Impact.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/projects`,
    },
    openGraph: generateOpenGraphMetadata(title, description, `${baseUrl}/projects`),
    twitter: generateTwitterMetadata(title, description),
  };
}

export default async function ProjectsPage() {
  const projects = await getSortedProjects();
  const breadcrumbSchema = generateBreadcrumbSchemaForPath('/projects');

  return (
    <div className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <p className="mb-4">
        The projects we have under development or found interesting. Practical Tech with Real-World Impact.
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/projects/${project.id}`}>
                    {project.title} <IconLink className="h-5 w-5 inline" aria-hidden />
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  {project.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 hover:text-blue-900 flex items-center space-x-1"
                    >
                      {link.text === "App Store" && <IconAppStore className="h-5 w-5" aria-hidden />}
                      {link.text === "Play Store" && <IconGooglePlay className="h-5 w-5" aria-hidden />}
                      {link.text === "Github" && <IconGithub className="h-5 w-5" aria-hidden />}
                      <span>{link.text}</span>
                    </a>
                  ))}
                  {/* <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Details {'\u2192'}
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-8">
            <h2 className="text-xl font-bold mb-4">Company Blog</h2>
            <p className="text-gray-600 mb-4">
              Ideas, updates, and practical tech from the team.
            </p>
            <Link
              href="/blog/page/1"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition text-center font-semibold w-full"
            >
              Read the blog
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
} 