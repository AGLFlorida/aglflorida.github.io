import Script from 'next/script';
import { ContactPreconnect } from './ContactPreconnect';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContactPreconnect />
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
