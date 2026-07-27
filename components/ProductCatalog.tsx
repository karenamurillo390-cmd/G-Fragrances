'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products as defaultProducts, type Product } from '@/lib/catalog';

export type EditableProduct = Product & { active: boolean; shortDescription: string; images: string[]; createdAt: string };
type Catalog = { products: EditableProduct[]; ready: boolean; save: (product: EditableProduct) => void; remove: (id: string) => void };
const C = createContext<Catalog | null>(null);
const KEY = 'g-fragrances-products';
const initialProducts: EditableProduct[] = defaultProducts.map((product) => ({ ...product, active: true, shortDescription: product.description, images: [product.image], createdAt: '2026-01-01' }));

export function ProductCatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<EditableProduct[]>(initialProducts);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const saved = localStorage.getItem(KEY);
        if (saved) setProducts(JSON.parse(saved));
      } catch {
        setProducts(initialProducts);
      }
    };
    read();
    setReady(true);
    const sync = (event: StorageEvent) => { if (event.key === KEY) read(); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(products)); }, [products, ready]);

  const value = useMemo(() => ({
    products,
    ready,
    save: (product: EditableProduct) => setProducts((all) => all.some((item) => item.id === product.id) ? all.map((item) => item.id === product.id ? product : item) : [...all, product]),
    remove: (id: string) => setProducts((all) => all.filter((item) => item.id !== id)),
  }), [products, ready]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export const useProducts = () => {
  const context = useContext(C);
  if (!context) throw new Error('ProductCatalogProvider missing');
  return context;
};
