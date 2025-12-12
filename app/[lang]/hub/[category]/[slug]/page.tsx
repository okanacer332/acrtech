import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { fetchHubDetail } from '@/src/lib/actions';
import { MDXContent } from '@/src/components/hub/MDXContent';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';

// --- 1. DİNAMİK METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string; lang: string }> }) {
  const { category, slug, lang } = await params;
  const item = await fetchHubDetail(category as any, lang, slug);

  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.frontMatter.title} | ACR Tech`,
    description: item.frontMatter.description,
    alternates: {
      // Canonical URL: Google'a bu sayfanın orijinal adresini bildirir
      canonical: `/${lang}/hub/${category}/${slug}`,
    },
    openGraph: {
      title: item.frontMatter.title,
      description: item.frontMatter.description,
      images: [item.frontMatter.image || '/acrtech.png'],
      type: 'article',
    },
  };
}

export default async function HubDetailPage({ params }: { params: Promise<{ category: string; slug: string; lang: string }> }) {
  const { category, slug, lang } = await params;
  
  // Veriyi sunucuda çekiyoruz
  const item = await fetchHubDetail(category as any, lang, slug);

  if (!item) {
    return notFound();
  }

  // Site adresini alıyoruz
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acrtech.com.tr';

  // --- 2. ARTICLE / CREATIVE WORK SCHEMA (İÇERİK TÜRÜ) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': category === 'projects' ? 'CreativeWork' : 'Article',
    headline: item.frontMatter.title,
    description: item.frontMatter.description,
    // Görsel URL'ini tam yol (https://...) olarak vermek en iyisidir
    image: item.frontMatter.image ? `${baseUrl}${item.frontMatter.image}` : undefined,
    datePublished: item.frontMatter.date,
    author: {
      '@type': 'Organization',
      name: 'ACR Tech Team',
    },
  };

  // --- 3. BREADCRUMB SCHEMA (YOL HARİTASI) - YENİ ---
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${lang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Hub',
        item: `${baseUrl}/${lang}/hub`
      },
      {
        '@type': 'ListItem',
        position: 3,
        // Kategori ismini Baş harfi büyük yapıyoruz (projects -> Projects)
        name: category.charAt(0).toUpperCase() + category.slice(1),
        item: `${baseUrl}/${lang}/hub/${category}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: item.frontMatter.title,
        item: `${baseUrl}/${lang}/hub/${category}/${slug}`
      }
    ]
  };

  const colors = {
    textGradient: 'bg-gradient-to-r from-blue-200 to-cyan-300', 
    backLink: 'text-blue-400 hover:text-blue-300',
    prose: 'prose-headings:text-gray-200 prose-a:text-blue-400 prose-strong:text-gray-200 prose-code:text-blue-300'
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema 1: İçerik Türü */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Schema 2: Ekmek Kırıntısı (Yeni) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <div className="relative pt-8 pb-12 px-4 sm:px-6 md:px-8 border-b border-white/5 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            
            <Link 
              href={`/${lang}/hub/${category}`} 
              className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors ${colors.backLink}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {category.charAt(0).toUpperCase() + category.slice(1)} Listesine Dön
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

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
          <article className={`prose prose-invert prose-lg max-w-none text-gray-300 ${colors.prose}`}>
            <MDXContent source={item.content} />
          </article>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm">Paylaş:</span>
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