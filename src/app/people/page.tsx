import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Meet the Team | The People Behind Human-Centered Tech',
    alternates: {
      canonical: `${baseUrl}/people`,
    },
  };
}

export default async function PeoplePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our People</h1>
      <p className="mb-4">
        The People Behind Human-Centered Tech.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <ul className="space-y-3">
          <li className="flex items-center space-x-4">
            <Image src="/people/face2.png" alt="Co-founder 1" width={64} height={64} className="rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">
                <a
                  href="https://www.linkedin.com/in/aliza-shoop-a668a138/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Aliza Shoop <i className="fab fa-linkedin"></i>
                </a>
              </h2>
              <p className="text-gray-600">Vice President</p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <Image src="/people/face.png" alt="Co-founder 2" width={64} height={64} className="rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">
                <a
                  href="https://www.linkedin.com/in/brandonshoop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  Brandon Shoop <i className="fab fa-linkedin"></i>
                </a>
              </h2>
              <p className="text-gray-600">Managing Partner&nbsp;
                <a
                  href="https://brandonshoop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                ><i className="fa fa-book"></i></a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}