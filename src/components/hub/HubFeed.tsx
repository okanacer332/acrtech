"use client";

import { useState } from 'react'; // useEffect'i kaldırdık
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, Layers, Box, PenTool, Code2, SearchX } from 'lucide-react';
import { TransitionWrapper } from '@/src/components/TransitionWrapper';
import { Badge } from '@/src/components/ui/badge';
import type { ContentItem } from '@/src/lib/mdx';
import { cn } from '@/src/components/ui/utils';

interface HubFeedProps {
  initialCategory: 'all' | 'projects' | 'articles' | 'demos';
  initialItems: ContentItem[]; // ARTIK VERİYİ PROP OLARAK ALIYORUZ
  lang: string; // Linkler için dil kodu lazım
}

export function HubFeed({ initialCategory, initialItems, lang }: HubFeedProps) {
  const searchParams = useSearchParams();
  
  // Veriyi state'e atıyoruz ama başlangıç değerimiz zaten dolu! (SSR)
  const [items] = useState<ContentItem[]>(initialItems);
  
  // URL'den gelen arama terimi
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  // FİLTRELEME MANTIĞI (Client-Side devam edebilir)
  const filteredItems = items.filter((item) => {
    if (searchTerm.length < 3) return true;

    const title = item.frontMatter.title?.toLowerCase() || '';
    const desc = item.frontMatter.description?.toLowerCase() || '';
    const category = item.frontMatter.category?.toLowerCase() || '';

    return title.includes(searchTerm) || desc.includes(searchTerm) || category.includes(searchTerm);
  });

  const langPrefix = `/${lang}`;

  const tabs = [
    { id: 'all', label: 'Tümü', icon: Layers, href: `${langPrefix}/hub` },
    { id: 'projects', label: 'Projeler', icon: Box, href: `${langPrefix}/hub/projects` },
    { id: 'articles', label: 'Makaleler', icon: PenTool, href: `${langPrefix}/hub/articles` },
    { id: 'demos', label: 'Demolar', icon: Code2, href: `${langPrefix}/hub/demos` },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Keşfet & Öğren</h1>
        <p className="text-gray-400">Topluluk projeleri, derinlemesine teknik makaleler ve interaktif demolar.</p>
      </div>

      {/* TAB MENÜSÜ */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/5">
        {tabs.map((tab) => {
          const isActive = initialCategory === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                isActive
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20"
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* İÇERİK ALANI */}
      <TransitionWrapper modeKey={initialCategory + searchTerm}> 
        {filteredItems.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] rounded-2xl border border-white/5 border-dashed">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-gray-500" />
             </div>
             <h3 className="text-lg font-medium text-gray-300 mb-1">Sonuç Bulunamadı</h3>
             <p className="text-gray-500 text-sm max-w-xs">
               "{searchTerm}" ile ilgili bir içerik bulamadık. Lütfen farklı anahtar kelimeler deneyin.
             </p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <Link key={item.slug} href={`${langPrefix}/hub/${item.type}/${item.slug}`} className="group block h-full">
                <article className="h-full bg-slate-900/50 hover:bg-slate-800/50 border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-blue-900/10 group-hover:-translate-y-1">
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center border",
                        item.type === 'projects' ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                        item.type === 'articles' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                        "bg-orange-500/10 border-orange-500/20 text-orange-400"
                      )}>
                        {item.type === 'projects' && <Box className="w-4 h-4" />}
                        {item.type === 'articles' && <PenTool className="w-4 h-4" />}
                        {item.type === 'demos' && <Code2 className="w-4 h-4" />}
                      </div>
                      
                      <Badge variant="outline" className="bg-white/5 text-gray-300 border-white/10 font-normal">
                        {item.frontMatter.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500 font-mono opacity-60">{item.frontMatter.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors mb-3">
                    {item.frontMatter.title}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-6 flex-1">
                    {item.frontMatter.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                        AC
                      </div>
                      <span className="text-xs text-gray-400 font-medium">ACR Team</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
                      İncele <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </TransitionWrapper>
    </div>
  );
}