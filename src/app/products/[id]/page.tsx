import { getProductById, getSortedProducts } from '@/lib/getProducts';
import { metadataFactory } from '@/lib/metadata';
import { generateBreadcrumbSchemaForPath } from '@/lib/BreadcrumbSchema';
import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { IconAppStore, IconGooglePlay, IconGithub } from '@/lib/icons';

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const products = await getSortedProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Params }, parent: ResolvingMetadata) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return metadataFactory('Products', 'Product Not Found')({ params: Promise.resolve({ id }) }, parent);
  }

  return metadataFactory('Products', product.title, {
    description: product.description,
  })({ params: Promise.resolve({ id }) }, parent);
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <div style={{ whiteSpace: 'pre' }}>Product Not Found</div>;
  }

  const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/products/${id}`);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold mb-8">{product.title}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: product.contentHtml }} />

        {product.price && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Pricing</h2>
            <p className="text-2xl font-bold text-blue-800">{product.price}</p>
          </div>
        )}

        {product.duration && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Duration</h2>
            <p className="text-gray-600">{product.duration}</p>
          </div>
        )}

        {product.features && (
          <>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside mb-6">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600 mb-2">{feature}</li>
              ))}
            </ul>
          </>
        )}

        {product.deliverables && (
          <>
            <h2 className="text-xl font-semibold mb-4">Deliverables</h2>
            <ul className="list-disc list-inside mb-6">
              {product.deliverables.map((deliverable, index) => (
                <li key={index} className="text-gray-600 mb-2">{deliverable}</li>
              ))}
            </ul>
          </>
        )}

        {product.technologies && (
          <>
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {product.links && (
          <div className="flex space-x-4">
            {product.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 flex items-center space-x-1"
              >
                {link.text === 'App Store' && <IconAppStore className="h-5 w-5" aria-hidden />}
                {link.text === 'Play Store' && <IconGooglePlay className="h-5 w-5" aria-hidden />}
                {link.text === 'Github' && <IconGithub className="h-5 w-5" aria-hidden />}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        )}
          </div>
        </div>

        {/* Right Rail */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow sticky top-8">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              Interested in learning more about this product or service? Get in touch with us to discuss how we can help.
            </p>
            <Link
              href="/contact/"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition text-center font-semibold w-full mb-4"
            >
              Contact Us
            </Link>
            <Link
              href="/products/"
              className="inline-block border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-50 transition text-center font-semibold w-full"
            >
              See All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
