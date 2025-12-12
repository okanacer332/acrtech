"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/lib/i18n/LanguageContext";
import { 
  LayoutGrid, 
  Code2, 
  PenTool, 
  Box, 
  Hash, 
  Flame
} from "lucide-react";

export function HubSidebar() {
  const pathname = usePathname();
  // Dil kodunu alıyoruz (tr, en vs.)
  const { language } = useLanguage();
  const langPrefix = `/${language.toLowerCase()}`;

  const menuItems = [
    { label: "Genel Bakış", icon: LayoutGrid, href: `${langPrefix}/hub`, exact: true },
    { label: "Projeler", icon: Box, href: `${langPrefix}/hub/projects` },
    { label: "Makaleler", icon: PenTool, href: `${langPrefix}/hub/articles` },
    { label: "Demolar", icon: Code2, href: `${langPrefix}/hub/demos` },
  ];

  const tags = ["#React", "#NextJS", "#Tailwind", "#UI/UX", "#ThreeJS"];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-64px)] sticky top-16 border-r border-white/5 bg-slate-950/50">
      
      {/* ANA MENÜ */}
      <div className="p-4 space-y-1">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-3 tracking-wider">KEŞFET</div>
        {menuItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? "text-blue-400" : "text-gray-500"}`} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* POPÜLER ETİKETLER */}
      <div className="p-4 mt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3 px-3 tracking-wider">
          <Flame className="w-3 h-3 text-orange-500" /> POPÜLER
        </div>
        <div className="space-y-1">
          {tags.map((tag) => (
            <button key={tag} className="w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-2">
              <Hash className="w-3 h-3 opacity-30" />
              {tag.replace('#', '')}
            </button>
          ))}
        </div>
      </div>

      {/* ALT KISIM */}
      <div className="mt-auto p-4 border-t border-white/5">
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5">
          <h4 className="text-sm font-medium text-white mb-1">Bülten</h4>
          <p className="text-xs text-gray-400 mb-3">En son güncellemelerden haberdar olun.</p>
          <button className="w-full py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors border border-white/10">
            Abone Ol
          </button>
        </div>
      </div>
    </aside>
  );
}