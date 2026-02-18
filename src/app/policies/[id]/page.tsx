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
      <h1 className="text-3xl font-bold mb-8">{policy.title}</h1>
      <div style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>{policy.content}</div>
    </div>
  );
} 