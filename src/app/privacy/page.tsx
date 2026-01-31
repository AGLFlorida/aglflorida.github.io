import { Metadata } from 'next';
import { SiteInfoNav } from '@/lib/SiteInfoNav';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Privacy Policy | We Respect Your Data and Your Trust',
    alternates: {
      canonical: `${baseUrl}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,11rem)_1fr] gap-8">
        <aside className="md:sticky md:top-4 md:self-start">
          <SiteInfoNav currentPath="/privacy" />
        </aside>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <div className="bg-white p-6 rounded-lg shadow prose max-w-none">
        <h2>Overview</h2>
        <p>
          This privacy policy describes how aglflorida.com (&quot;the Site&quot;) handles information. 
          We believe in minimizing data collection and being transparent about any data we do collect.
        </p>

        <h2>Information Collection</h2>
        <p>
          The Site collects only basic analytics data, which may include:
        </p>
        <ul>
          <li>Pages visited</li>
          <li>Time spent on the Site</li>
          <li>Referring websites</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
        </ul>

        <h3>Usage of Information</h3>
        <p>
          This analytics data is used solely to understand site usage patterns and improve the user experience. 
          We do not:
        </p>
        <ul>
          <li>Collect personally identifiable information</li>
          <li>Use cookies for tracking</li>
          <li>Share or sell any data to third parties</li>
          <li>Use the data for marketing purposes</li>
        </ul>

        <h3>Email Address Collection</h3>
        <p>
          The email address provided in our contact form may be used for future contact and marketing purposes.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          The Site is hosted on GitHub Pages and uses their standard hosting services. 
          Please refer to <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" className="text-blue-600 hover:text-blue-800">GitHub&apos;s Privacy Statement</a> for 
          information about their data practices.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
          This privacy policy may be updated occasionally to reflect changes in our practices. 
          Users can find any material changes by visiting the Site.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please use the contact form linked in the footer.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: 1/28/2026 {/*new Date().toLocaleDateString()*/}
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}
