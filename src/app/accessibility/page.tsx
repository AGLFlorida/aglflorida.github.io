import { Metadata } from 'next';
import { SiteInfoNav } from '@/lib/SiteInfoNav';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Accessibility Statement | Our Commitment to Inclusive Access',
    alternates: {
      canonical: `${baseUrl}/accessibility`,
    },
  };
}

export default function AccessibilityPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,11rem)_1fr] gap-8">
        <aside className="md:sticky md:top-4 md:self-start">
          <SiteInfoNav currentPath="/accessibility" />
        </aside>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
          <div className="bg-white p-6 rounded-lg shadow prose max-w-none">
            <h2>Our Commitment</h2>
            <p>
              AGL Consulting LLC is committed to ensuring our website (aglflorida.com) is accessible to people with disabilities. We aim to provide an inclusive experience and to conform to widely adopted accessibility standards where practicable.
            </p>

            <h2>Standards and Goals</h2>
            <p>
              We strive to align our site with the Web Content Accessibility Guidelines (WCAG) at Level AA where feasible. Our efforts include:
            </p>
            <ul>
              <li>Semantic HTML and clear heading structure</li>
              <li>Sufficient color contrast and links distinguishable by more than color</li>
              <li>Keyboard navigation and focus management</li>
              <li>Alternative text for meaningful images</li>
              <li>Form labels and error messaging that work with assistive technologies</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              Some third-party content or tools (for example, reCAPTCHA on our contact form) may not fully meet our accessibility goals. We continue to evaluate alternatives and improvements.
            </p>

            <h2>Feedback and Contact</h2>
            <p>
              If you encounter barriers on this site or have suggestions for improvement, please contact us via the contact form linked in the footer. We will do our best to respond and, where possible, address the issue.
            </p>

            <h2>Updates</h2>
            <p>
              This accessibility statement may be updated occasionally to reflect changes in our practices or standards. You can find the current version on this page.
            </p>

            <p className="text-sm text-gray-700 mt-8">
              Last updated: 2/18/2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
