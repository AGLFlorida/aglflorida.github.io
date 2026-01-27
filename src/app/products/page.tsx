import Link from 'next/link';
import { getSortedProducts } from '@/lib/getProducts';
import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchemaForPath } from '@/lib/BreadcrumbSchema';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'Products & Services | Mobile Apps & Consulting Packages';
  const description = 'Explore our mobile applications and consulting engagement packages designed to solve real-world problems.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/products`,
    },
    openGraph: generateOpenGraphMetadata(title, description, `${baseUrl}/products`),
    twitter: generateTwitterMetadata(title, description),
  };
}

export default async function ProductsPage() {
  const products = await getSortedProducts();
  const breadcrumbSchema = generateBreadcrumbSchemaForPath('/products');

  const mobileApps = products.filter(p => p.type === 'mobile-app');
  const consultingPackages = products.filter(p => p.type === 'consulting');

  return (
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold mb-8">Products & Services</h1>
      <p className="mb-8">
        Discover our mobile applications and consulting packages designed to deliver practical solutions with real-world impact.
      </p>

      {/* Mobile Apps Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Mobile Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mobileApps.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-2">
                <Link href={`/products/${product.id}`}>
                  {product.title} <i className="fa-solid fa-link text-lg"></i>
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.price && (
                <p className="text-lg font-semibold text-blue-600 mb-4">{product.price}</p>
              )}
              <div className="flex space-x-4">
                {product.links?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    {link.text === 'App Store' && <i className="fab fa-app-store text-lg"></i>}
                    {link.text === 'Play Store' && <i className="fab fa-google-play text-lg"></i>}
                    {link.text === 'Github' && <i className="fab fa-github text-lg"></i>}
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consulting Packages Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Consulting Engagement Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultingPackages.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-2">
                <Link href={`/products/${product.id}`}>
                  {product.title} <i className="fa-solid fa-link text-lg"></i>
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.price && (
                <p className="text-lg font-semibold text-blue-600 mb-2">{product.price}</p>
              )}
              {product.duration && (
                <p className="text-sm text-gray-500 mb-4">Duration: {product.duration}</p>
              )}
              <Link
                href={`/products/${product.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details {'\u2192'}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
