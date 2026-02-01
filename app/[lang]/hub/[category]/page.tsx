export const runtime = 'edge';
export const preferredRegion = 'fra1';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { HubFeed } from '@/src/components/hub/HubFeed';
import { fetchHubContent } from '@/src/lib/actions';
import { getDictionary } from '@/src/lib/i18n/get-dictionary'; // EKLENDİ

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
  const t = await getDictionary(lang as any); // EKLENDİ

  const validCategories = ['projects', 'articles', 'demos'];
  
  if (!validCategories.includes(category)) {
    return notFound();
  }

  const items = await fetchHubContent(category as any, lang);

  items.sort((a, b) => {
    const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
    const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">{t.hub.loading}</div>}> {/* GÜNCELLENDİ */}
      <HubFeed initialCategory={category as any} initialItems={items} lang={lang} />
    </Suspense>
  );
}