import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsentBanner } from '@/components/analytics/ConsentBanner';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'AQUAPRO Studio | Equipamiento Técnico de Natación FINA Approved',
    template: '%s | AQUAPRO Studio',
  },
  description:
    'Indumentaria, mallas de competición, antiparras espejadas y gorros 3D de natación técnica y recreativa. Máxima hidrodinámica y compresión homologada por World Aquatics.',
  keywords: [
    'natacion tecnica',
    'antiparras espejo',
    'mallas de competicion',
    'techsuit carbon',
    'gorro silicona 3d',
    'fina approved',
    'aquapro studio',
  ],
  authors: [{ name: 'AQUAPRO Studio Enterprise Team' }],
  creator: 'AQUAPRO Studio',
  publisher: 'AQUAPRO Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AQUAPRO Studio | Indumentaria & Equipamiento Técnico de Natación',
    description:
      'Rediseña tu deslizamiento con antiparras espejadas, mallas de competición y accesorios de entrenamiento de alto rendimiento.',
    url: 'https://aquapro-studio.com',
    siteName: 'AQUAPRO Studio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'AQUAPRO Studio Swim Equipment',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AQUAPRO Studio | Equipamiento de Natación de Alto Rendimiento',
    description: 'Antiparras hidrodinámicas y trajes de baño de competición homologados FINA.',
    images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80'],
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

export const viewport: Viewport = {
  themeColor: '#0B192C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-ocean-950 text-slate-100 flex flex-col font-sans antialiased">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-ocean-950 border-b border-cyan-500/20" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Footer />
          <CartDrawer />
          <ConsentBanner />
        </CartProvider>
      </body>
    </html>
  );
}
