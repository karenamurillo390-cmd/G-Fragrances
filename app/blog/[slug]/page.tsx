import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import SeoJsonLd from '@/components/SeoJsonLd';
import { absoluteUrl, siteName } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = blogPosts.find((item) => item.slug === slug); return post ? { title: post.title, description: post.description, keywords: post.keywords, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.title, description: post.description, url: `/blog/${post.slug}` } } : { robots: { index: false, follow: false } }; }

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date, mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`), author: { '@type': 'Organization', name: siteName }, publisher: { '@type': 'Organization', name: siteName } };
  return <main className="page catalog"><SeoJsonLd data={articleSchema} /><SeoJsonLd data={faqSchema} /><SeoBreadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} /><article style={{ maxWidth: 820 }}><span className="eyebrow">Guía de fragancias</span><h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>{post.title}</h1>{post.paragraphs.map((paragraph) => <p key={paragraph} style={{ color: '#c3baad', lineHeight: 1.9, fontSize: '.98rem' }}>{paragraph}</p>)}<h2 className="serif gold" style={{ marginTop: 35 }}>Preguntas frecuentes</h2>{post.faqs.map((faq) => <section key={faq.question}><h3 className="serif" style={{ fontSize: '1.35rem', marginBottom: 6 }}>{faq.question}</h3><p style={{ color: '#c3baad', lineHeight: 1.8 }}>{faq.answer}</p></section>)}</article></main>;
}
