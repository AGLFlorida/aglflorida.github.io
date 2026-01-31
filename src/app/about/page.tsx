import { Metadata } from 'next';
import { SiteInfoNav } from '@/lib/SiteInfoNav';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'About Us | AGL Consulting LLC';
  const description =
    'AGL provides fractional technical leadership to small and mid-sized businesses. We help organizations modernize technology—infrastructure, developer workflows, and platform migrations—without the overhead of a full-time executive.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/about`,
    },
    openGraph: generateOpenGraphMetadata(title, description, `${baseUrl}/about`),
    twitter: generateTwitterMetadata(title, description),
  };
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,11rem)_1fr] gap-8">
        <aside className="md:sticky md:top-4 md:self-start">
          <SiteInfoNav currentPath="/about" />
        </aside>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold mb-8">About AGL Consulting</h1>
          <div className="bg-white p-6 rounded-lg shadow prose max-w-none">
            <p>
              AGL provides fractional technical leadership to small and mid-sized businesses that lack the internal bandwidth or resources for it. We help organizations modernize their technology in ways that are clear, purposeful, and aligned with how they work—infrastructure, developer workflows, and platform or stack migrations—without the overhead of a full-time executive.
            </p>

            <p>
              AGL was founded in early 2025 and is led by engineering leaders with experience building and scaling platforms at companies including TeamSnap and Boats Group. We bring that background to bear on the problems small and mid-sized companies face: strategic direction, architecture and tooling decisions, and execution of complex migrations, all in a hands-on, client-led format. Decisions and priorities stay with the client; we provide the technical leadership and practical guidance to get there.
            </p>

            <p>
              We work with organizations that need serious technical outcomes but don’t have the in-house capacity to drive them. Our engagements focus on lasting results rather than short-term hype—technology in service of what the business does, not the other way around.
            </p>

            <p className="mt-6">
              <a
                href="https://www.linkedin.com/company/agl-consulting-llc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                aria-label="AGL on LinkedIn"
              >
                Connect with us on LinkedIn
                <i className="fab fa-linkedin" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
