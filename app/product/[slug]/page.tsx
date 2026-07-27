import type { Metadata } from 'next';
import { products } from '@/lib/catalog';
import { productSeo, productSchema } from '@/lib/seo';
import SeoJsonLd from '@/components/SeoJsonLd';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import ProductDetailClient from '@/components/ProductDetailClient';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: 'Producto no disponible', robots: { index: false, follow: false } };
  const seo = productSeo(product);
  return {
    title: seo.title,
    description: seo.description,
    keywords: [product.brand, product.name, `${product.type} perfumes`, 'perfume original', 'buy perfumes online', 'perfumes Colombia', 'perfumes USA'],
    alternates: { canonical: seo.canonical },
    openGraph: { type: 'website', url: seo.canonical, title: seo.title, description: seo.description, images: [{ url: product.image, alt: `${product.brand} ${product.name}` }] },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return <ProductDetailClient />;
  return <>
    <SeoJsonLd data={productSchema(product)} />
    <SeoBreadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: 'Perfumes', path: '/catalog/best-sellers' }, { name: `${product.brand} ${product.name}`, path: `/product/${product.slug}` }]} />
    <ProductDetailClient />
  </>;
}
