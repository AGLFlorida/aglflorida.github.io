import { getPolicyById, getPolicies } from "@/lib/getPolicies";
import { metadataFactory } from "@/lib/metadata";

export const generateMetadata = metadataFactory(
  "Policies",
  ""
);

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const policies = await getPolicies();
  return policies.map((policy) => ({ id: policy.id }));
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { id } = await params;
  const policy = await getPolicyById(id);

  if (!policy) {
    return <div style={{ whiteSpace: 'pre' }}>Policy Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="font-heading text-h1 font-bold mb-8">{policy.title}</h1>
      <div
        className="bg-white p-6 rounded-lg shadow border border-gray-100 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: policy.content }}
      />
    </div>
  );
} 