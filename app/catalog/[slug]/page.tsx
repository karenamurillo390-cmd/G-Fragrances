import type { Metadata } from 'next';
import { Suspense } from 'react';
import { categories } from '@/lib/catalog';
import CatalogClient from '@/components/CatalogClient';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';

type Props = { params: Promise<{ slug: string }> };
const seoPages: Record<string, { title: string; description: string }> = {
  'best-sellers': { title: 'Best Sellers: perfumes originales más vendidos', description: 'Descubre los perfumes originales más vendidos: fragancias de diseñador, nicho y árabes para Colombia y Estados Unidos.' },
  designer: { title: 'Designer Perfumes originales', description: 'Compra perfumes de diseñador originales online. Selección de fragancias icónicas con envío a Colombia y Estados Unidos.' },
  niche: { title: 'Niche Perfumes: fragancias exclusivas', description: 'Explora perfumes nicho originales y fragancias exclusivas para quienes buscan una firma olfativa única.' },
  arabian: { title: 'Arabic Perfumes originales', description: 'Perfumes árabes originales: oud, ámbar y fragancias intensas seleccionadas por G Fragrances.' },
  discovery: { title: 'Fragrance Samples y Discovery Sets', description: 'Descubre samples y sets de perfumes para explorar nuevas fragancias antes de elegir tu favorita.' },
};

export function generateStaticParams() {
  return [...categories.map(({ slug }) => ({ slug })), ...Object.keys(seoPages).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'search') return { title: 'Buscar perfumes', robots: { index: false, follow: true } };
  const category = categories.find((item) => item.slug === slug);
  const data = seoPages[slug] ?? (category ? { title: `${category.name} | Perfumes originales`, description: `Compra ${category.name.toLowerCase()} y perfumes originales seleccionados por G Fragrances.` } : { title: 'Colección de perfumes', description: 'Explora perfumes originales en G Fragrances.' });
  return { title: data.title, description: data.description, alternates: { canonical: `/catalog/${slug}` }, openGraph: { title: data.title, description: data.description, url: `/catalog/${slug}` } };
}

export default async function CatalogPage({ params }: Props) {
  const { slug } = await params;
  const label = seoPages[slug]?.title ?? categories.find((item) => item.slug === slug)?.name ?? 'Catálogo';
  return <><SeoBreadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: label, path: `/catalog/${slug}` }]} /><Suspense fallback={null}><CatalogClient /></Suspense></>;
}
