import { Suspense } from 'react';
import { HubFeed } from '@/src/components/hub/HubFeed';
import { fetchHubContent } from '@/src/lib/actions';
import type { ContentItem } from '@/src/lib/mdx';

export const dynamic = 'force-dynamic';

export default async function HubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const [projects, articles, demos] = await Promise.all([
    fetchHubContent('projects', lang),
    fetchHubContent('articles', lang),
    fetchHubContent('demos', lang)
  ]);

  // GÜNCELLENEN KISIM: Güvenli Sıralama
  const allItems: ContentItem[] = [...projects, ...articles, ...demos].sort((a, b) => {
    const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
    const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500 animate-pulse">İçerikler yükleniyor...</div>
      </div>
    }>
      <HubFeed initialCategory="all" initialItems={allItems} lang={lang} />
    </Suspense>
  );
}