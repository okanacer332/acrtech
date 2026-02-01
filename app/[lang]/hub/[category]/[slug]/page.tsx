export const runtime = 'edge';
export const preferredRegion = 'fra1';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { fetchHubDetail } from '@/src/lib/actions';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { getDictionary } from '@/src/lib/i18n/get-dictionary';
import VoiceReader from '@/src/components/hub/VoiceReader'; // EKLENDİ

const components = {
  Badge,
  Button,
};

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string; lang: string }> }) {
  const { category, slug, lang } = await params;
  const item = await fetchHubDetail(category as any, lang, slug);

  if (!item) return { title: 'Not Found' };

  // DİĞER DİLLER İÇİN LİNKLERİ OLUŞTUR
  const languages = ['tr', 'en', 'de', 'es', 'ru', 'fr', 'ar'];
  const alternates = languages.reduce((acc, l) => {
    acc[l] = `https://acrtech.com.tr/${l}/hub/${category}/${slug}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: `${item.frontMatter.title} | ACR Tech Trend`,
    description: item.frontMatter.description,
    keywords: `${item.frontMatter.category}, yazılım, tasarım, ${category}, teknoloji trendleri`, 
    alternates: {
      canonical: `https://acrtech.com.tr/${lang}/hub/${category}/${slug}`,
      languages: alternates,
    },
    openGraph: {
      title: item.frontMatter.title,
      description: item.frontMatter.description,
      url: `https://acrtech.com.tr/${lang}/hub/${category}/${slug}`,
      siteName: 'ACR Tech',
      images: [
        {
          url: item.frontMatter.image || '/acrtech.png',
          width: 1200,
          height: 630,
          alt: item.frontMatter.title,
        },
      ],
      type: 'article',
      publishedTime: item.frontMatter.date,
      authors: ['ACR Tech Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.frontMatter.title,
      description: item.frontMatter.description,
      images: [item.frontMatter.image || '/acrtech.png'],
    },
  };
}

export default async function HubDetailPage({ params }: { params: Promise<{ category: string; slug: string; lang: string }> }) {
  const { category, slug, lang } = await params;
  
  const t = await getDictionary(lang as any);
  const item = await fetchHubDetail(category as any, lang, slug);

  if (!item) {
    return notFound();
  }

  // Kategori ismini dil dosyasından çekiyoruz
  const categoryLabel = t.hub.tabs[category as keyof typeof t.hub.tabs] || category.charAt(0).toUpperCase() + category.slice(1);

  const colors = {
    textGradient: 'bg-gradient-to-r from-blue-200 to-cyan-300', 
    backLink: 'text-blue-400 hover:text-blue-300',
    prose: 'prose-headings:text-gray-200 prose-a:text-blue-400 prose-strong:text-gray-200 prose-code:text-blue-300'
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-16">
        <div className="relative pt-8 pb-12 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            
            <Link 
              href={`/${lang}/hub/${category}`} 
              className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${colors.backLink}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {categoryLabel}
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="outline" className="px-3 py-1 bg-blue-500/10 text-blue-300 border-blue-500/20">
                {item.frontMatter.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{item.frontMatter.date}</span>
              </div>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${colors.textGradient}`}>
              {item.frontMatter.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {item.frontMatter.description}
            </p>
            
            {item.frontMatter.image && (
              <div className="mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={item.frontMatter.image} alt={item.frontMatter.title} className="w-full h-auto" />
              </div>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
          
          {/* --- SESLİ OKUMA BİLEŞENİ --- */}
          <div className="mb-8">
            <VoiceReader content={item.content} lang={lang} />
          </div>
          {/* --------------------------- */}

          <article className={`prose prose-invert prose-lg max-w-none text-gray-300 ${colors.prose}`}>
            <MDXRemote source={item.content} components={components} />
          </article>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm">{t.hub.detail.share}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                <Share2 className="w-4 h-4 text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}