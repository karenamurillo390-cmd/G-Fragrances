'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from './Store';
import BrandLogo from './BrandLogo';
import styles from './NavigationMotion.module.css';

const navigation = [
  ['Collections', '/catalog/fresh'], ['Designer', '/catalog/designer'], ['Niche', '/catalog/niche'], ['Arabian', '/catalog/arabian'], ['Best Sellers', '/#best-sellers'], ['Discovery Sets', '/catalog/discovery'], ['About', '/about'],
] as const;

export default function SiteHeader() {
  const { count } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const close = () => { setOpen(false); setQuery(''); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (query.trim()) { router.push(`/catalog/search?q=${encodeURIComponent(query.trim())}`); close(); } };
  return <header className="nav"><div className={`page nav-inner ${open ? 'search-open' : ''}`}><Link href="/" className="logo" aria-label="Inicio G Fragrances"><BrandLogo compact /></Link>{open ? <form className="header-inline-search" onSubmit={submit}><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Escape' && close()} placeholder="Busca perfumes, marcas o notas..." aria-label="Buscar perfumes" /><button type="submit" aria-label="Buscar">⌕</button></form> : <nav className="links">{navigation.map(([label, href]) => <Link className={styles.link} href={href} key={href}>{label}</Link>)}</nav>}<div className="icons"><button className="search-trigger" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-label={open ? 'Cerrar búsqueda' : 'Abrir búsqueda'}>{open ? '×' : '⌕'}</button><Link className="admin-trigger" href="/admin">Admin</Link><Link className="cart-trigger" href="/cart" aria-label="Carrito"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l1.5 10.2h10.8L20 7H7" /><circle cx="9" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></svg>{count > 0 && <span className="cart-badge">{count}</span>}</Link></div></div></header>;
}
