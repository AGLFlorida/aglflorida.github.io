import Link from "next/link";
import { getPolicies } from "@/lib/getPolicies";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Policies | How AGL Works with Clarity and Care',
    alternates: {
      canonical: `${baseUrl}/policies`,
    },
  };
}

export default async function PoliciesPage() {
  const policies = await getPolicies();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Policies</h1>
      <p className="mb-4">
        How AGL Works with Clarity and Care.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <ul className="space-y-3">
          {policies.map((policy) => (
            <li key={policy.id}>
              <Link
                href={`/policies/${policy.id}`}
                className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
              >
                <h2 className="font-medium text-blue-600 hover:text-blue-800">
                  {policy.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
