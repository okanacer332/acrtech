"use client";

import Link from "next/link";
import { useLanguage } from "@/src/lib/i18n/LanguageContext";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  // Context'ten çevirileri (t) ve dili alıyoruz
  const { t, language } = useLanguage();
  const langPrefix = `/${language.toLowerCase()}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      
      {/* Arkaplan Efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg mx-auto">
        {/* Büyük 404 Yazısı */}
        <h1 className="text-9xl font-bold text-white/5 select-none pointer-events-none mb-8">
          404
        </h1>
        
        {/* Ana Mesaj (Çevirilerden Geliyor) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full w-max">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.notFound.title}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            {t.notFound.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Ana Sayfa Butonu */}
            <Link 
              href={`${langPrefix}/`} 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25"
            >
              <Home className="w-4 h-4" />
              {t.notFound.homeBtn}
            </Link>

            {/* Hub Butonu */}
            <Link 
              href={`${langPrefix}/hub`} 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.notFound.hubBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}