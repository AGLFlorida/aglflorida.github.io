import Link from "next/link";
import { getSortedReleases } from "@/lib/getReleases";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Release Notes | Behind the Scenes of AGL\'s Latest Work',
    alternates: {
      canonical: `${baseUrl}/releases`,
    },
  };
}

export default async function ReleasesPage() {
  const releases = await getSortedReleases();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Release Notes</h1>
      <p className="mb-4">
        A batch of AI generated release notes based on the git log. 
      </p>
      <div className="space-y-6">
        {releases.map((release) => (
          <div key={release.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/releases/${release.id}`}>
                {release.title} <i className="fa-solid fa-link text-lg"></i>
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{release.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 