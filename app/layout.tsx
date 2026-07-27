import type { Metadata, Viewport } from 'next';
import './globals.css';
import './motion.css';
import { StoreProvider } from '@/components/Store';
import { ProductCatalogProvider } from '@/components/ProductCatalog';
import PageMotion from '@/components/PageMotion';
import InteractiveEffects from '@/components/InteractiveEffects';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';
import { defaultDescription, organizationSchema, siteName, siteUrl } from '@/lib/seo';

export const viewport: Viewport = { themeColor: '#060606', colorScheme: 'dark' };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} | Perfumes originales y de lujo`, template: `%s | ${siteName}` },
  description: defaultDescription,
  keywords: ['perfumes originales', 'luxury perfumes', 'niche perfumes', 'perfumes Colombia', 'perfumes USA', 'decants Colombia', 'decants USA', 'Arabic perfumes', 'designer fragrances'],
  alternates: {
    canonical: '/',
    languages: { 'es-CO': '/', 'en-US': '/en', 'x-default': '/' },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { type: 'website', locale: 'es_CO', alternateLocale: 'en_US', url: '/', siteName, title: `${siteName} | Perfumes originales y de lujo`, description: defaultDescription, images: [{ url: '/images/hero/hero-2.jpg', width: 1600, height: 900, alt: 'G Fragrances, perfumes originales y de lujo' }] },
  twitter: { card: 'summary_large_image', title: `${siteName} | Perfumes originales y de lujo`, description: defaultDescription, images: ['/images/hero/hero-2.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CO"><body><SeoJsonLd data={organizationSchema()} /><ProductCatalogProvider><StoreProvider><PageMotion /><InteractiveEffects /><SiteHeader />{children}<Footer /></StoreProvider></ProductCatalogProvider></body></html>;
}
