'use client';
import {useEffect} from 'react';
export default function PageMotion(){useEffect(()=>{const elements=document.querySelectorAll<HTMLElement>('[data-reveal]');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});elements.forEach(element=>observer.observe(element));return()=>observer.disconnect()},[]);return null}
