import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchemaForPath } from '@/lib/BreadcrumbSchema';
import { IconAppStore, IconGooglePlay } from '@/lib/icons';

const FEATURES = [
  {
    title: 'Smart Scheduling',
    description: 'A visual calendar of every scheduled maintenance task, across your whole fleet, at a glance.',
  },
  {
    title: 'Task Management',
    description: 'Create, track, and complete maintenance tasks with notes and service provider details.',
  },
  {
    title: 'Service History',
    description: 'A complete, searchable record of completed work for every vessel you own.',
  },
  {
    title: 'Vendor Management',
    description: 'Keep service providers, contact info, and specialties organized in one place.',
  },
  {
    title: 'Upcoming Services',
    description: 'A unified view of everything coming due, so nothing slips through the cracks.',
  },
  {
    title: 'Recurring Tasks',
    description: 'Set an interval once and VesseLog automatically schedules the next occurrence.',
  },
];

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$19.99',
    cadence: '/mo',
    description: 'Everything you need to manage up to 3 boats.',
    features: [
      'Up to 3 boats',
      'Smart scheduling calendar',
      'Unlimited maintenance tasks',
      'Vendor management',
      'Service history for every vessel',
    ],
    cta: 'Coming Soon',
    highlighted: true,
  },
  {
    name: 'Additional Boats',
    price: '+$1.99',
    cadence: '/mo per boat',
    description: 'Growing a fleet? Add boats to your Starter plan as you go.',
    features: [
      'Add any number of extra boats',
      'Same features as Starter',
      'Prorated billing',
      'Cancel anytime',
    ],
    cta: 'Coming Soon',
    highlighted: false,
  },
  {
    name: 'Fleet',
    price: 'Contact Us',
    cadence: '',
    description: 'Managing a large fleet or a marine service business? Let’s talk pricing.',
    features: [
      'Volume pricing for large fleets',
      'Priority support',
      'Custom onboarding',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aglflorida.com';
  const title = 'VesseLog | Your Complete Vessel Maintenance Companion';
  const description = 'VesseLog helps boat owners and marine professionals manage vessel maintenance schedules, track service history, and stay on top of upcoming tasks. Plans start at $19.99/mo.';
  const url = `${baseUrl}/vesselog`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: generateOpenGraphMetadata(title, description, url, `${baseUrl}/assets/vesselog.png`),
    twitter: generateTwitterMetadata(title, description, `${baseUrl}/assets/vesselog.png`),
  };
}

export default function VesseLogPage() {
  const breadcrumbSchema = generateBreadcrumbSchemaForPath('/vesselog');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 py-8">
        <Image
          src="/assets/vesselog.png"
          alt="VesseLog app icon"
          width={96}
          height={96}
          className="rounded-2xl shadow"
        />
        <h1 className="text-4xl md:text-5xl font-bold">VesseLog<sup className="text-base md:text-lg align-super">{'©'}</sup></h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Your Complete Vessel Maintenance Companion
        </p>
        <p className="text-gray-600 max-w-2xl">
          Track service history, schedule maintenance, and manage every vessel in your fleet
          from one offline-first app built for boat owners and marine professionals.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-6 py-3 rounded-full font-semibold">
          <IconAppStore className="h-5 w-5" aria-hidden />
          <IconGooglePlay className="h-5 w-5" aria-hidden />
          <span>Coming soon to iOS and Android</span>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Everything your fleet needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, boat-based pricing</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Start with up to 3 boats, add more as your fleet grows, or talk to us about a custom
          plan for larger operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 rounded-lg shadow ${
                tier.highlighted
                  ? 'bg-blue-800 text-white ring-2 ring-blue-900'
                  : 'bg-white text-gray-900'
              }`}
            >
              <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
              <p className={`mb-4 ${tier.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                {tier.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.cadence && (
                  <span className={tier.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                    {tier.cadence}
                  </span>
                )}
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span aria-hidden>&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                aria-label={`${tier.cta}: ${tier.name} plan`}
                className={`inline-block text-center px-6 py-3 rounded-lg font-semibold transition ${
                  tier.highlighted
                    ? 'bg-white text-blue-800 hover:bg-gray-100'
                    : 'border-2 border-blue-800 text-blue-800 hover:bg-blue-50'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get your fleet organized?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Reach out and we&apos;ll help you get set up, or answer any questions about pricing
          for your fleet.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition font-semibold"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
