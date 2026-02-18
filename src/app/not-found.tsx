import Link from 'next/link';

export const metadata = {
  title: 'Page not found | AGL Consulting LLC',
  description:
    'The page you are looking for could not be found. Return to the AGL Consulting LLC homepage.',
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for could not be found. It may have been moved
        or the link might be incorrect.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition font-medium"
      >
        Return to home
      </Link>
    </div>
  );
}
