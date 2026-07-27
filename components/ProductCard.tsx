'use client';

import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { formatCOP } from '@/lib/catalog';
import { useStore } from './Store';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();

  return <article className="product-card">
    <Link href={`/product/${product.slug}`}>
      <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" decoding="async" />
      <h3>{product.brand}<br />{product.name}</h3>
      <p>{product.concentration}</p>
      <div className="stars">★★★★★ <span style={{ color: '#857960' }}>({product.stock + 52})</span></div>
    </Link>
    <div className="product-bottom">
      <span>{formatCOP(product.price)}</span>
      <button className="round" onClick={() => add(product)} aria-label={`Agregar ${product.name}`}>＋</button>
    </div>
  </article>;
}
