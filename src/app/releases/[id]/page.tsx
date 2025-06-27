import { getReleaseById, getSortedReleases } from "@/lib/getReleases";
import { metadataFactory } from "@/lib/metadata";

export const generateMetadata = metadataFactory(
  "Releases",
  ""
);

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const releases = await getSortedReleases();
  return releases.map((release) => ({ id: release.id }));
}

export default async function ReleasePage({ params }: { params: Params }) {
  const { id } = await params;
  const release = await getReleaseById(id);

  if (!release) {
    return <div style={{ whiteSpace: 'pre' }}>Release Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{release.title}</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: release.contentHtml }} />

      </div>
    </div>
  );
} 