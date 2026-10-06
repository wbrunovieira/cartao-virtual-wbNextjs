// src/app/layout.tsx
// No server data — build as static HTML, CDN-cacheable indefinitely
export const dynamic = 'force-static';
export const revalidate = false;

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const TITLE = 'Bruno Vieira · WB Digital Solutions';
const DESCRIPTION =
  'Cartão digital de Bruno Vieira, fundador da WB Digital Solutions: sites, plataformas, sistemas, aplicativos, e-commerces, automações e IA sob medida.';

export const metadata: Metadata = {
  metadataBase: new URL('https://card.wbdigitalsolutions.com'),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'WB Digital Solutions',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'es_ES', 'it_IT'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
};

// The page is static HTML rendered in Portuguese. For visitors whose locale
// resolves to another language, hide the body until React swaps the text in
// (useLocale removes the class), so they never see a flash of Portuguese.
// Mirrors detectLocale() in src/hooks/useLocale.ts; 1.5s failsafe.
const localeScript = `(function(){try{var L=['pt','en','es','it'],l=new URLSearchParams(location.search).get('lang');if(L.indexOf(l)<0){try{l=localStorage.getItem('preferred_locale')}catch(e){l=null}}if(L.indexOf(l)<0)l=(navigator.language||'').slice(0,2);if(L.indexOf(l)<0)l='pt';if(l!=='pt'){var d=document.documentElement;d.classList.add('locale-pending');setTimeout(function(){d.classList.remove('locale-pending')},1500)}}catch(e){}})();`;

// schema.org Person, so search engines tie Bruno's name to the company.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bruno Vieira',
  alternateName: 'Walter Bruno Prado Vieira',
  jobTitle: 'Fundador',
  url: 'https://card.wbdigitalsolutions.com',
  image: 'https://card.wbdigitalsolutions.com/bruno.jpg',
  email: 'mailto:bruno@wbdigitalsolutions.com',
  telephone: '+55 11 98286-4581',
  worksFor: {
    '@type': 'Organization',
    name: 'WB Digital Solutions',
    url: 'https://www.wbdigitalsolutions.com',
  },
  sameAs: [
    'https://www.linkedin.com/in/walter-bruno-vieira/',
    'https://www.instagram.com/wbrunovieira/',
    'https://www.wbdigitalsolutions.com',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
