'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HeroMotion.module.css';

const videoFallback = '/images/hero/hero-2.jpg';
const slides = [
  { src: '/videos/hero/hero-video.mp4', alt: 'Video principal de G Fragrances', type: 'video' as const },
  { src: '/images/hero/hero-2.jpg', alt: 'Selección premium de fragancias', type: 'image' as const },
  { src: '/images/hero/hero-3.jpg', alt: 'Perfume de lujo G Fragrances', type: 'image' as const },
];

export default function HeroCarousel({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const [active, setActive] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const carousel = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 4000);
    const video = window.setTimeout(() => setVideoReady(true), 2500);
    return () => {
      window.clearInterval(carousel);
      window.clearTimeout(video);
    };
  }, []);

  return <section className="hero" aria-label="Destacados G Fragrances">
    <div className="hero-slides">
      {slides.map((slide, index) => {
        const className = `hero-slide ${index === active ? 'active' : ''}`;
        if (slide.type === 'video') {
          return videoReady
            ? <video key={slide.src} className={`${className} hero-video`} muted loop playsInline autoPlay preload="metadata" aria-label={slide.alt}>
              <source src={slide.src} type="video/mp4" />
            </video>
            : <div key={slide.src} className={className} style={{ backgroundImage: `url(${videoFallback})` }} role="img" aria-label={slide.alt} />;
        }
        return <div key={slide.src} className={className} style={{ backgroundImage: `url(${slide.src})` }} role="img" aria-label={slide.alt} />;
      })}
    </div>
    <div className="hero-shade" />
    <div className="page hero-copy">
      <h1 className={styles.title}>{locale === 'en' ? <>Luxury<br />within<br /><span>reach</span></> : <>Lujo al<br />alcance de<br /><span>todos</span></>}</h1>
      <p className={styles.description}>{locale === 'en' ? '100% original perfumes' : 'Perfumes 100% originales'}</p>
      <Link className={`button ${styles.cta}`} href="#collections">{locale === 'en' ? 'Explore collection　→' : 'Explorar colección　→'}</Link>
    </div>
    <div className={`hero-controls ${styles.controls}`} aria-label="Seleccionar imagen del banner">
      {slides.map((slide, index) => <button key={slide.src} className={index === active ? 'current' : ''} onClick={() => setActive(index)} aria-label={`Ver banner ${index + 1}`} />)}
    </div>
  </section>;
}
