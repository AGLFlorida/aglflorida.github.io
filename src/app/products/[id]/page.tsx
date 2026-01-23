import { getProductById, getSortedProducts } from '@/lib/getProducts';
import { metadataFactory } from '@/lib/metadata';
import { generateBreadcrumbSchemaForPath } from '@/lib/BreadcrumbSchema';
import type { ResolvingMetadata } from 'next';

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
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold mb-8">{product.title}</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: product.contentHtml }} />

        {product.price && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Pricing</h2>
            <p className="text-2xl font-bold text-blue-600">{product.price}</p>
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
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                {link.text === 'App Store' && <i className="fab fa-app-store text-lg"></i>}
                {link.text === 'Play Store' && <i className="fab fa-google-play text-lg"></i>}
                {link.text === 'Github' && <i className="fab fa-github text-lg"></i>}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
