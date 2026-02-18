import Image from 'next/image';
import { Metadata } from 'next';
import { getPartners } from '@/lib/getPartners';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'Partners | AGL Consulting LLC';
  const description =
    'Organizations we work with. Trusted partners in technology, design, and delivery.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/partners`,
    },
    openGraph: generateOpenGraphMetadata(title, description, `${baseUrl}/partners`),
    twitter: generateTwitterMetadata(title, description),
  };
}

const EXTERNAL_LINK_REL = 'noopener noreferrer nofollow sponsored';

export default function PartnersPage() {
  const partners = getPartners();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Our Partners</h1>
      <p className="mb-8 text-gray-600">
        Organizations we work with and recommend.
      </p>
      <div className="max-w-3xl mx-auto w-[60%] min-w-0">
        {partners.length === 0 ? (
          <p className="text-gray-500">No partners listed yet.</p>
        ) : (
          partners.map((partner, index) => (
            <div key={partner.id}>
              {index > 0 && <hr className="my-8 border-gray-200" />}
              <a
                href={partner.url}
                target="_blank"
                rel={EXTERNAL_LINK_REL}
                className="flex items-center gap-6 p-6 bg-white rounded-lg shadow hover:bg-gray-50 transition block"
              >
                <div className="flex-shrink-0 w-[211px] h-[87px] flex items-center justify-center">
                  {partner.logo.startsWith('http') ? (
                    <img
                      src={partner.logo}
                      alt={partner.title}
                      width={211}
                      height={87}
                      className="object-contain object-left"
                    />
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.title}
                      width={211}
                      height={87}
                      className="object-contain object-left"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {partner.title}
                  </h2>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
