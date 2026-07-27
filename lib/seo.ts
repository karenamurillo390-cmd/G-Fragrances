import type { Product } from '@/lib/catalog';

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = (configuredUrl || 'https://gfragrances.com').replace(/\/$/, '');
export const siteName = 'G Fragrances';
export const defaultDescription = 'Compra perfumes originales, de nicho, diseñador y árabes. G Fragrances entrega una selección de lujo para Colombia y Estados Unidos.';

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();

export function productPath(product: Pick<Product, 'slug'>) {
  return `/product/${product.slug}`;
}

export function productSeo(product: Product) {
  const title = `${product.brand} ${product.name} | Perfume original | G Fragrances`;
  const description = `Compra ${product.brand} ${product.name} ${product.concentration} de ${product.size}. Perfume original con envío para Colombia y Estados Unidos.`;
  return { title, description, canonical: productPath(product) };
}

export function organizationSchema() {
  const sameAs = [process.env.NEXT_PUBLIC_INSTAGRAM_URL, process.env.NEXT_PUBLIC_FACEBOOK_URL]
    .filter((url): url is string => Boolean(url));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'OnlineStore', 'LocalBusiness'],
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description: defaultDescription,
        logo: absoluteUrl('/images/hero/hero-2.jpg'),
        areaServed: [
          { '@type': 'Country', name: 'Colombia' },
          { '@type': 'Country', name: 'United States' },
        ],
        ...(sameAs.length ? { sameAs } : {}),
        ...(process.env.NEXT_PUBLIC_PHONE ? { telephone: process.env.NEXT_PUBLIC_PHONE } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: ['es-CO', 'en-US'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/catalog/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product) {
  const availability = product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.name}`,
    description: product.description,
    image: [product.image],
    sku: product.id,
    brand: { '@type': 'Brand', name: product.brand },
    category: `${product.type} perfumes`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Concentration', value: product.concentration },
      { '@type': 'PropertyValue', name: 'Size', value: product.size },
      { '@type': 'PropertyValue', name: 'Olfactory notes', value: product.notes.join(', ') },
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(productPath(product)),
      priceCurrency: 'COP',
      price: product.price,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${siteUrl}/#organization` },
    },
  };
}
