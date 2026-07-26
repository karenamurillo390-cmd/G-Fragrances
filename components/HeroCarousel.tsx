'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
const slides=[
  {src:'/videos/hero/hero-video.mp4',alt:'Video principal de G Fragrances',type:'video'},
  {src:'/images/hero/hero-2.jpg',alt:'Selección premium de fragancias',type:'image'},
  {src:'/images/hero/hero-3.jpg',alt:'Perfume de lujo G Fragrances',type:'image'}
];
export default function HeroCarousel(){const [active,setActive]=useState(0);useEffect(()=>{const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),3000);return()=>window.clearInterval(timer)},[]);return <section className="hero" aria-label="Destacados G Fragrances"><div className="hero-slides">{slides.map((slide,index)=>slide.type==='video'?<video key={slide.src} className={`hero-slide hero-video ${index===active?'active':''}`} muted loop playsInline autoPlay={index===active} preload="metadata" aria-label={slide.alt}><source src={slide.src} type="video/mp4"/></video>:<div className={`hero-slide ${index===active?'active':''}`} key={slide.src} style={{backgroundImage:`url(${slide.src})`}} role="img" aria-label={slide.alt}/>)}</div><div className="hero-shade"/><div className="page hero-copy"><span className="eyebrow">Perfumería de autor</span><h1>Lujo al<br/>alcance de<br/><span>todos</span></h1><p>Perfumes 100% originales</p><Link className="button" href="#collections">Explorar colección　→</Link></div><div className="hero-controls" aria-label="Seleccionar imagen del banner">{slides.map((slide,index)=><button key={slide.src} className={index===active?'current':''} onClick={()=>setActive(index)} aria-label={`Ver banner ${index+1}`}/>)}</div></section>}
