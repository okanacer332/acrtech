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

  const allItems: ContentItem[] = [...projects, ...articles, ...demos].sort((a, b) => 
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );

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