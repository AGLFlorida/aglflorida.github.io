import ContactForm from './ContactForm';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: 'Get in Touch | Talk Tech Strategy with AGL Consulting',
    description: 'Get in touch with AGL Consulting.',
    alternates: {
      canonical: `${baseUrl}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="p-8">
      <ContactForm />
    </main>
  );
}