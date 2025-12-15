"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/src/lib/i18n/LanguageContext"; // EKLENDİ

export function HubHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { t } = useLanguage(); // EKLENDİ

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term.length >= 3) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 sm:px-6 md:px-8">
        
        <div className="flex items-center gap-2 md:gap-4 mr-4 md:mr-8">
          <Link href="/" className="relative w-28 h-8 opacity-80 hover:opacity-100 transition-opacity">
             <Image
                src="/acrtech.png"
                alt="ACRTECH"
                fill
                sizes="(max-width: 768px) 100vw, 33vw" // Mobilde tam, masaüstünde 1/3 genişlik
                className="object-contain object-left" 
             />
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <Input 
              placeholder={t.hub.searchPlaceholder} // GÜNCELLENDİ
              className="pl-10 bg-white/5 border-white/5 text-sm text-gray-300 focus:bg-white/10 focus:border-blue-500/50 rounded-full transition-all"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('search')?.toString()}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-4">
          <LanguageSelector mode="code" />
        </div>
      </div>
    </header>
  );
}