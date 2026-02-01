import { Suspense } from 'react';
import { HubFeed } from '@/src/components/hub/HubFeed';
import { fetchHubContent } from '@/src/lib/actions';
import type { ContentItem } from '@/src/lib/mdx';
import { getDictionary } from '@/src/lib/i18n/get-dictionary'; // EKLENDİ

export const runtime = 'edge';
export const preferredRegion = 'fra1';

export default async function HubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getDictionary(lang as any); // EKLENDİ
  
  const [projects, articles, demos] = await Promise.all([
    fetchHubContent('projects', lang),
    fetchHubContent('articles', lang),
    fetchHubContent('demos', lang)
  ]);

  const allItems: ContentItem[] = [...projects, ...articles, ...demos].sort((a, b) => {
    const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
    const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500 animate-pulse">{t.hub.loading}</div> {/* GÜNCELLENDİ */}
      </div>
    }>
      <HubFeed initialCategory="all" initialItems={allItems} lang={lang} />
    </Suspense>
  );
}