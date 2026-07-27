'use client';

import Link from 'next/link';
import { categories } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import TrustBenefits from '@/components/TrustBenefits';
import { useProducts } from '@/components/ProductCatalog';

export default function Home({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const { products, ready } = useProducts();
  const active = products.filter((product) => product.active);
  const featured = active.slice(0, 6);

  return <>
    <HeroCarousel locale={locale} />
    <main className="page">
      <section className="section reveal" data-reveal id="collections">
        <div style={{ textAlign: 'center' }}>
          <p className="serif" style={{ fontSize: '1.6rem', margin: 0 }}>{locale === 'en' ? 'Curated Fragrances From the World’s Most Iconic Perfume Houses.' : 'Fragancias seleccionadas de las casas más icónicas del mundo.'}</p>
          <p className="gold">━</p>
        </div>
        <div className="collection-grid">
          {categories.map((category) => <Link href={`/catalog/${category.slug}`} className="collection" key={category.slug}>
            <img src={category.image} alt="" />
            <div>
              <div><h3>{category.name.replace(' Collection', '')}</h3><small>Collection</small></div>
              <span className="eyebrow">{locale === 'en' ? 'Explore　→' : 'Explorar　→'}</span>
            </div>
          </Link>)}
        </div>
      </section>
      <section className="section reveal" data-reveal id="best-sellers">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="section-title">Best Sellers</h2>
          <Link className="eyebrow" href="/catalog/best-sellers">{locale === 'en' ? 'View all　→' : 'Ver todos　→'}</Link>
        </div>
        {ready && !featured.length
          ? <div className="empty">{locale === 'en' ? 'There are no products available yet.' : 'Aún no hay productos disponibles.'}</div>
          : <div className="product-grid">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>}
        <TrustBenefits locale={locale} />
      </section>
    </main>
  </>;
}
