import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://debtdispute.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DebtDispute — Stop Debt Collectors in Their Tracks',
    template: '%s | DebtDispute',
  },
  description:
    'Free statute of limitations checker and professional debt dispute letter generator. Know your rights under the FDCPA. Fight back against abusive debt collectors legally.',
  keywords: [
    'debt collector rights',
    'debt dispute letter',
    'FDCPA',
    'statute of limitations debt',
    'cease and desist debt collector',
    'debt validation letter',
    'how to dispute a debt',
    'stop debt collector calls',
    'debt collection laws',
  ],
  authors: [{ name: 'DebtDispute' }],
  creator: 'DebtDispute',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'DebtDispute',
    title: 'DebtDispute — Stop Debt Collectors in Their Tracks',
    description:
      'Free statute of limitations checker and professional debt dispute letter generator. Know your rights. Fight back legally.',
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'DebtDispute — Know Your Rights Against Debt Collectors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DebtDispute — Stop Debt Collectors in Their Tracks',
    description: 'Free statute of limitations checker + professional dispute letter generator.',
    images: [`${BASE_URL}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-navy-950 text-slate-100 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
