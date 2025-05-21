import ContactForm from './ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | AGL Consulting LLC',
  description: 'Get in touch with AGL Consulting.',
  alternates: {
    canonical: 'https://aglflorida.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="p-8">
      <ContactForm />
    </main>
  );
}