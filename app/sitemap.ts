import type { MetadataRoute } from 'next';
import { categories, products } from '@/lib/catalog';
import { blogPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/en', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/catalog/best-sellers', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  ];
  return [
    ...staticPages.map((page) => ({ url: absoluteUrl(page.path), lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...categories.map((category) => ({ url: absoluteUrl(`/catalog/${category.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...products.map((product) => ({ url: absoluteUrl(`/product/${product.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
