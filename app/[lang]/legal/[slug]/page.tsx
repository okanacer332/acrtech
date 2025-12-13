import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchHubDetail } from '@/src/lib/actions';
// ESKİ IMPORT: import { MDXContent } from '@/src/components/hub/MDXContent'; -> Bunu siliyoruz
import { MDXRemote } from 'next-mdx-remote/rsc'; // YENİ IMPORT: Server Side Render için

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  const item = await fetchHubDetail('legal', lang, slug);

  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.frontMatter.title} | ACR Tech Legal`,
    description: item.frontMatter.description || 'Legal document',
    alternates: {
      canonical: `/${lang}/legal/${slug}`,
    },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  
  const item = await fetchHubDetail('legal', lang, slug);

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <main className="max-w-4xl mx-auto">
        
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-white border-b border-white/10 pb-6">
            {item.frontMatter.title}
          </h1>

          <article className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-gray-100 prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:no-underline
            prose-hr:border-white/10
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-400
            ">
            {/* DÜZELTİLEN KISIM: MDXContent yerine MDXRemote kullanıyoruz */}
            <MDXRemote source={item.content} />
          </article>
          
          <div className="mt-12 pt-6 border-t border-white/5 text-sm text-gray-500">
            Son Güncelleme: {item.frontMatter.date}
          </div>
        </div>
      </main>
    </div>
  );
}