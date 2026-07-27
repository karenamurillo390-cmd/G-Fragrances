'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatCOP } from '@/lib/catalog';
import { useProducts } from '@/components/ProductCatalog';
import { useStore } from '@/components/Store';

export default function ProductDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const { products, ready } = useProducts();
  const product = products.find((item) => item.slug === slug && item.active);
  const { add } = useStore();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  if (!ready) return null;
  if (!product) return <main className="page catalog"><div className="empty">Este producto no está disponible.</div></main>;

  const addQuantity = () => { for (let index = 0; index < quantity; index += 1) add(product); };
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`Hola G Fragrances, quiero comprar ${quantity} x ${product.brand} ${product.name}. Total: ${formatCOP(product.price * quantity)}.`)}`;

  return <main className="page detail">
    <img className="detail-img" src={product.image} alt={`${product.brand} ${product.name}, perfume original ${product.concentration}`} decoding="async" />
    <section>
      <span className="eyebrow">{product.type} · {product.concentration}</span>
      <h1>{product.brand}<br /><span className="gold">{product.name}</span></h1>
      <p className="price">{formatCOP(product.price)}</p>
      <p style={{ color: '#c4bdb2', lineHeight: 1.7 }}>{product.description}</p>
      <p className="eyebrow" style={{ marginTop: 25 }}>Notas olfativas</p>
      <div className="notes">{product.notes.map((note) => <span className="note" key={note}>{note}</span>)}</div>
      <p style={{ fontSize: '.76rem', color: '#c7bdad', marginTop: 25 }}>Tamaño: <b>{product.size}</b>　·　Stock disponible: <b className="gold">{product.stock}</b></p>
      <div className="qty"><button onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}>＋</button></div>
      <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}><button className="button dark" onClick={addQuantity}>Agregar al carrito</button><button className="button" onClick={() => { addQuantity(); router.push('/checkout'); }}>Comprar ahora</button></div>
      <a className="button" style={{ marginTop: 12 }} target="_blank" rel="noreferrer" href={whatsapp}>Comprar por WhatsApp　↗</a>
    </section>
  </main>;
}
