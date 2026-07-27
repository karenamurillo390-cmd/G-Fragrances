import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';

export const metadata: Metadata = { title: 'Blog de perfumes y decants', description: 'Guías para elegir perfumes originales, decants y fragancias de diseñador, nicho y árabes.', alternates: { canonical: '/blog' } };

export default function BlogPage() {
  return <main className="page catalog"><SeoBreadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: 'Blog', path: '/blog' }]} /><div className="catalog-head"><span className="eyebrow">Guías de G Fragrances</span><h1>Blog de perfumes</h1><p className="search-caption">Consejos para descubrir, elegir y disfrutar fragancias originales.</p></div><div className="catalog-grid">{blogPosts.map((post) => <article className="product-card" key={post.slug}><h2 className="serif" style={{ fontSize: '1.5rem', margin: '18px 0 10px' }}>{post.title}</h2><p style={{ minHeight: 58 }}>{post.description}</p><Link className="button" href={`/blog/${post.slug}`}>Leer guía →</Link></article>)}</div></main>;
}
