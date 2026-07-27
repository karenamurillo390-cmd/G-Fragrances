import type { Metadata } from 'next';
import Home from '@/app/page';

export const metadata: Metadata = {
  title: 'Luxury and Original Perfumes',
  description: 'Shop original luxury, niche, designer and Arabic perfumes. Discover G Fragrances for Colombia and the United States.',
  alternates: { canonical: '/en', languages: { 'es-CO': '/', 'en-US': '/en', 'x-default': '/' } },
  openGraph: { locale: 'en_US', url: '/en', title: 'G Fragrances | Luxury and Original Perfumes', description: 'Shop original luxury, niche, designer and Arabic perfumes.' },
};

export default function EnglishHome() { return <Home locale="en" />; }
