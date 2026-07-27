'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { categories } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/components/ProductCatalog';

export default function CatalogClient() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  useEffect(() => setQuery(searchParams.get('q') ?? ''), [searchParams]);
  const title = slug === 'search' ? 'Resultados de búsqueda' : slug === 'best-sellers' ? 'Best Sellers' : slug === 'designer' ? 'Designer Perfumes' : slug === 'niche' ? 'Niche Perfumes' : slug === 'discovery' ? 'Discovery Sets' : categories.find((category) => category.slug === slug)?.name ?? 'Colección de perfumes';
  const items = useMemo(() => products.filter((product) => {
    const group = slug === 'best-sellers' ? product.bestSeller : slug === 'designer' ? product.type === 'Designer' : slug === 'niche' ? product.type === 'Niche' : slug === 'discovery' ? product.type === 'Discovery' : slug === 'search' ? true : product.category === slug;
    const term = query.toLowerCase();
    return product.active && group && (!term || [product.name, product.brand, product.category, product.type, ...product.notes].join(' ').toLowerCase().includes(term));
  }), [slug, query, products]);

  return <main className="page catalog">
    <div className="catalog-head"><span className="eyebrow">G Fragrances / catálogo</span><h1>{title}</h1>{slug === 'search' && query && <p className="search-caption">Mostrando {items.length} resultado{items.length === 1 ? '' : 's'} para <span>“{query}”</span></p>}<input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, marca o notas..." /></div>
    {items.length ? <div className="catalog-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty">No hay productos disponibles con esta búsqueda.</div>}
  </main>;
}
