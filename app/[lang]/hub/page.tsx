import { Suspense } from 'react';
import { HubFeed } from '@/src/components/hub/HubFeed';
import { fetchHubContent } from '@/src/lib/actions';
import type { ContentItem } from '@/src/lib/mdx';

// Dinamik sayfa olduğunu belirtiyoruz
export const dynamic = 'force-dynamic';

export default async function HubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Veriyi sunucuda, sayfa oluşturulurken çekiyoruz (SEO'nun sırrı burası!)
  // Promise.all ile paralel çekim yapıyoruz, daha hızlı olur.
  const [projects, articles, demos] = await Promise.all([
    fetchHubContent('projects', lang),
    fetchHubContent('articles', lang),
    fetchHubContent('demos', lang)
  ]);

  // Tüm içerikleri birleştirip tarihe göre sıralayalım
  const allItems: ContentItem[] = [...projects, ...articles, ...demos].sort((a, b) => 
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500 animate-pulse">İçerikler yükleniyor...</div>
      </div>
    }>
      {/* Veriyi (allItems) ve Dili (lang) prop olarak geçiriyoruz */}
      <HubFeed initialCategory="all" initialItems={allItems} lang={lang} />
    </Suspense>
  );
}