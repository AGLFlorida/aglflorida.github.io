import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Security Policy | AGL Consulting LLC',
    alternates: {
      canonical: `${baseUrl}/security`,
    },
  };
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Security Policy</h1>
      <div className="bg-white p-6 rounded-lg shadow prose">
        <h2>Reporting a Vulnerability</h2>
        <p>
          At AGL Consulting, we take security seriously and welcome reports from the security community to help keep our users and systems
          safe. If you believe you have found a security vulnerability in our website, mobile apps, or infrastructure, please report it to us
          as soon as possible.
        </p>

        <h2>How to Report</h2>
        <ul>
          <li>Please send your report to: <a href="mailto:security@aglflorida.com">security@aglflorida.com</a></li>
          <li>Include a detailed description of the issue, including steps to reproduce, and any proof-of-concept code or screenshots if available.</li>
          <li>We will investigate and aim to resolve valid vulnerabilities promptly.</li>
        </ul>

        <h2>Scope</h2>
        <p>
        This policy applies to:
        </p>
        <ul>
          <li>https://aglflorida.com and all subpages</li>
          <li>Official AGL Consulting mobile apps listed in the Google Play Store and Apple App Store</li>
        </ul>

        <h2>Exclusions</h2>
        <p>
        The following types of issues are outside the scope of this policy:
        </p>
        <ul>
          <li>Non-security bugs or UI issues</li>
          <li>Automated scans or reports without clear evidence of exploitability</li>
          <li>Reports of outdated libraries without a working proof of vulnerability</li>
          <li>Clickjacking on pages with no sensitive actions</li>
          <li>Self-XSS (e.g., injecting script into your own browser console)</li>
          <li>Issues related to Github Pages hosting. Those should be directed to the appropriate third party</li>
        </ul>

        <h2>Responsible Disclosure</h2>
        <p>
        We kindly ask that you:
        </p>
        <ul>
          <li>Do not publicly disclose vulnerabilities without coordination</li>
          <li>Do not use automated tools that degrade service quality</li>
          <li>Do not attempt to access, modify, or destroy user data</li>
        </ul>

        <h2>Updates to This Policy</h2>
        <p>
          This security policy may be updated occasionally to reflect changes in our practices.
          Users can find any material changes by visiting the Site.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this policy, please use the contact form linked in the footer.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: 5/21/2025 {/*new Date().toLocaleDateString()*/}
        </p>
      </div>
    </div>
  );
}
