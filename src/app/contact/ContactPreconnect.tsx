'use client';

import { useEffect } from 'react';

/**
 * Injects preconnect link tags for reCAPTCHA origins so they are only present on the contact page.
 * Runs on mount so the browser can establish early connections before the reCAPTCHA script loads.
 */
export function ContactPreconnect() {
  useEffect(() => {
    const origins = ['https://www.google.com', 'https://www.gstatic.com'];
    const links: HTMLLinkElement[] = [];
    origins.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => {
      links.forEach((link) => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, []);
  return null;
}
