import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { HubFeed } from '@/src/components/hub/HubFeed';
import { fetchHubContent } from '@/src/lib/actions';

export async function generateMetadata({ params }: { params: Promise<{ category: string; lang: string }> }) {
  const { category, lang } = await params;
  const titleCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${titleCategory} | Hub - ACR Tech`,
    description: `Explore our latest ${category} in software and design.`,
  };
}

export default async function HubCategoryPage({ params }: { params: Promise<{ category: string; lang: string }> }) {
  const { category, lang } = await params;

  const validCategories = ['projects', 'articles', 'demos'];
  
  if (!validCategories.includes(category)) {
    return notFound();
  }

  const items = await fetchHubContent(category as any, lang);

  items.sort((a, b) => 
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );

  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Yükleniyor...</div>}>
      <HubFeed initialCategory={category as any} initialItems={items} lang={lang} />
    </Suspense>
  );
}