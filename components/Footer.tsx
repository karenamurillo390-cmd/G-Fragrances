import Link from 'next/link';
import BrandLogo from './BrandLogo';
import styles from './Footer.module.css';
import mobile from './FooterMobile.module.css';
import layout from './FooterLayout.module.css';

const socialUrls: Record<string, string> = { Instagram: 'https://instagram.com/', TikTok: 'https://tiktok.com/', Facebook: 'https://facebook.com/', WhatsApp: 'https://wa.me/' };
function SocialIcon({ name, children }: { name: keyof typeof socialUrls; children: React.ReactNode }) { return <a className={styles.social} href={socialUrls[name]} target="_blank" rel="noreferrer" aria-label={name}>{children}</a>; }

export default function Footer() {
  return <>
    <a className="whatsapp" target="_blank" rel="noreferrer" href="https://wa.me/" aria-label="Hablar por WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.8.9.9-2.7-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-5.3c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.3-1.5-3-2.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4H9c-.2 0-.5.1-.7.4-.2.3-.8.8-.8 2s.8 2.4.9 2.6c.1.2 1.7 2.6 4.1 3.6.6.3 1.1.4 1.5.5.6.2 1.1.1 1.5.1.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" /></svg></a>
    <footer className={`${styles.footer} ${mobile.footerMobile}`}>
      <div className={`page ${styles.grid} ${mobile.gridMobile} ${layout.gridLimit}`}>
        <section className={`${styles.brand} ${mobile.brandMobile} ${layout.brandCentered}`}><BrandLogo /><p>Curamos las mejores fragancias del mundo para que encuentres la tuya.</p><div className={`${styles.socials} ${mobile.socialsMobile} ${layout.socialsCentered}`}><SocialIcon name="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></svg></SocialIcon><SocialIcon name="TikTok"><svg viewBox="0 0 24 24"><path d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7" /><path d="M14 4c.8 2.5 2.4 4 5 4.3" /></svg></SocialIcon><SocialIcon name="Facebook"><svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-3H14V8.5c0-.9.3-1.5 1.7-1.5H18V4.3c-.4-.1-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.1V10H9v3h2.5v8H14Z" /></svg></SocialIcon><SocialIcon name="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg></SocialIcon></div></section>
        <section className={`${styles.column} ${mobile.columnMobile} ${layout.columnCentered}`}><h2>Colecciones</h2><ul className={`${styles.links} ${mobile.linksMobile}`}><li><Link href="/catalog/fresh">Fresh Collection</Link></li><li><Link href="/catalog/daily">Daily Collection</Link></li><li><Link href="/catalog/night-out">Night Out Collection</Link></li><li><Link href="/catalog/arabian">Arabian Collection</Link></li></ul></section>
        <section className={`${styles.column} ${mobile.columnMobile} ${layout.columnCentered}`}><h2>Información</h2><ul className={`${styles.links} ${mobile.linksMobile}`}><li><Link href="/about">Sobre nosotros</Link></li><li><Link href="/blog">Guías de perfumes</Link></li><li><Link href="/catalog/best-sellers">Best Sellers</Link></li><li><Link href="/catalog/discovery">Discovery Sets</Link></li></ul></section>
        <section className={`${styles.column} ${mobile.columnMobile} ${layout.columnCentered}`}><h2>Contacto</h2><p>Estamos aquí para ayudarte a encontrar tu próxima firma olfativa.</p><a className={styles.whatsappLink} href="https://wa.me/" target="_blank" rel="noreferrer">Hablar por WhatsApp　→</a></section>
      </div>
      <div className={`page ${styles.copyright} ${mobile.copyrightMobile} ${layout.copyrightLimit}`}>© 2026 G Fragrances. Todos los derechos reservados.</div>
    </footer>
  </>;
}
