import { HubHeader } from "@/src/components/hub/HubHeader";
import { HubSidebar } from "@/src/components/hub/HubSidebar";

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground flex flex-col">
      {/* 1. Özel Hub Header */}
      <HubHeader />

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* 2. Sol Sidebar (Sticky) */}
        <HubSidebar />

        {/* 3. Ana İçerik Alanı */}
        <main className="flex-1 w-full min-w-0 border-r border-white/5 bg-slate-950">
          {children}
        </main>

        {/* 4. (Opsiyonel) Sağ Sidebar - İleride "İçindekiler" vs. için kullanılabilir */}
        {/* Şu an boş bırakıyoruz veya basit bir placeholder koyuyoruz */}
        <aside className="hidden xl:block w-72 shrink-0 p-6 sticky top-16 h-[calc(100vh-64px)]">
           {/* İleride buraya "Trending" veya "Table of Contents" gelebilir */}
        </aside>
      </div>
    </div>
  );
}