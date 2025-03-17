import Link from "next/link";
import { getSortedProjects } from "@/lib/getProjects";

export default async function ProjectsPage() {
  const projects = await getSortedProjects();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
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
                  <span>{link.text}</span>
                </a>
              ))}
              <Link
                href={`/projects/${project.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 