import Image from 'next/image';

export default async function PeoplPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our People</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ul className="space-y-3">
          {/* <li className="flex items-center space-x-4">
            <img src="/people/face2.png" alt="Co-founder 1" className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">Aliza Shoop</h2>
              <p className="text-gray-600">Vice President</p>
            </div>
          </li> */}
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
              <p className="text-gray-600">Managing Partner</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}