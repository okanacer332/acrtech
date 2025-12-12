"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function HubHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Arama Mantığı
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term.length >= 3) {
      // 3 harf ve üzeriyse parametreyi ekle
      params.set('search', term);
    } else {
      // Değilse parametreyi sil
      params.delete('search');
    }
    
    // URL'i güncelle (Sayfa yenilenmeden)
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 sm:px-6 md:px-8">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 md:gap-4 mr-4 md:mr-8">
          <Link href="/" className="relative w-28 h-8 opacity-80 hover:opacity-100 transition-opacity">
             <Image
                src="/acrtech.png"
                alt="ACRTECH"
                fill
                className="object-contain object-left" 
             />
          </Link>
        </div>

        {/* SEARCH BAR (GÜNCELLENDİ) */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <Input 
              placeholder="Makale, proje veya demo ara..." 
              className="pl-10 bg-white/5 border-white/5 text-sm text-gray-300 focus:bg-white/10 focus:border-blue-500/50 rounded-full transition-all"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('search')?.toString()}
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4 ml-4">
          <LanguageSelector mode="code" />
        </div>
      </div>
    </header>
  );
}