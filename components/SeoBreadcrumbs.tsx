import Link from 'next/link';
import SeoJsonLd from './SeoJsonLd';
import { breadcrumbSchema } from '@/lib/seo';

type Item = { name: string; path: string };

export default function SeoBreadcrumbs({ items }: { items: Item[] }) {
  return <>
    <SeoJsonLd data={breadcrumbSchema(items)} />
    <nav aria-label="Breadcrumb" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
      <ol>{items.map((item, index) => <li key={item.path}>{index < items.length - 1 ? <Link href={item.path}>{item.name}</Link> : item.name}</li>)}</ol>
    </nav>
  </>;
}
