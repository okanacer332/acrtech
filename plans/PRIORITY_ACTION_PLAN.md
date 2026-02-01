# ACR Tech - Önceliklendirilmiş Performans Optimizasyon Planı

## 🎯 Hızlı Bakış

Bu doküman, ACR Tech projesi için araştırılan tüm performans optimizasyon tekniklerini **öncelik**, **etki** ve **uygulama kolaylığına** göre sıralar.

---

## 📊 Öncelik Matrisi

```
                    YÜKSEK ETKİ
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │   Phase 3:         │   Phase 2:         │
    │   Advanced         │   Core             │
    │   Optimizations    │   Improvements     │
    │                    │                    │
    │   • Service Worker │   • Edge Runtime   │
    │   • Virtualization │   • Streaming SSR  │
    │   • Advanced Cache │   • Bundle Analyze │
    │                    │                    │
D   ├────────────────────┼────────────────────┤ Z
O   │                    │                    │ O
R   │   Phase 4:         │   Phase 1:         │ R
T   │   Future Work      │   Quick Wins       │ T
    │                    │                    │ A
    │   • AI-powered     │   • Remove Unused  │
    │   • Edge AI        │   • PPR Enable     │
    │   • Advanced PWA   │   • React Compiler │
    │                    │                    │
    └────────────────────┼────────────────────┘
                         │
                    DÜŞÜK ETKİ
         
    ◄────────────────────────────────────────►
         ZOR                            KOLAY
```

---

## ⚡ Phase 1: Quick Wins (Hemen Uygula)

**Süre:** 1-2 gün  
**Beklenen İyileştirme:** %15-20 performans artışı

### 1.1 Kullanılmayan Bağımlılıkları Kaldır
```bash
# Kaldırılacak paketler:
npm uninstall recharts cmdk

# Etki: ~100KB bundle boyutu azalması
```

**Dosyalar:**
- [`package.json`](package.json:57) - `recharts` satırını kaldır
- [`package.json`](package.json:42) - `cmdk` satırını kaldır
- [`src/components/ui/chart.tsx`](src/components/ui/chart.tsx:1) - Dosyayı sil (kullanılmıyor)
- [`src/components/ui/command.tsx`](src/components/ui/command.tsx:1) - Dosyayı sil (kullanılmıyor)

### 1.2 Next.js 16 PPR Etkinleştir
```typescript
// next.config.ts - experimental bölümüne ekle
experimental: {
  ppr: true, // Partial Prerendering
}
```

**Etki:** Statik shell anında yüklenir, dinamik içerik streaming ile gelir

### 1.3 React Compiler Etkinleştir
```typescript
// next.config.ts - experimental bölümüne ekle
experimental: {
  reactCompiler: true, // Otomatik memoization
}
```

**Etki:** Manuel `useMemo`, `useCallback` kullanımına gerek kalmaz

### 1.4 Image Placeholder Ekle
```typescript
// src/components/Portfolio.tsx
<Image
  src={project.image}
  alt={project.title}
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  // ... diğer props
/>
```

**Etki:** Daha iyi LCP (Largest Contentful Paint)

### 1.5 Font Display Optimizasyonu
```typescript
// app/[lang]/layout.tsx
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: 'swap',      // ✅ Zaten var
  preload: true,        // ✅ Zaten var
  fallback: ['system-ui', 'arial'], // ✅ Zaten var
  adjustFontFallback: true, // EKLE: Font fallback optimizasyonu
});
```

---

## 🔧 Phase 2: Core Improvements (Önemli)

**Süre:** 3-5 gün  
**Beklenen İyileştirme:** %20-30 performans artışı

### 2.1 Edge Runtime Kullanımı
```typescript
// app/[lang]/hub/page.tsx
export const runtime = 'edge';
export const preferredRegion = 'fra1'; // Vercel bölgesi
```

**Uygulanacak Sayfalar:**
- Hub kategori sayfaları
- Legal sayfalar
- Statik içerik sayfaları

### 2.2 Streaming SSR Implementasyonu
```typescript
// app/[lang]/hub/[category]/[slug]/page.tsx
import { Suspense } from 'react';

export default function ContentPage() {
  return (
    <>
      {/* Statik shell */}
      <HubHeader />
      
      {/* Dinamik içerik - streaming */}
      <Suspense fallback={<MDXContentSkeleton />}>
        <MDXContent />
      </Suspense>
    </>
  );
}
```

### 2.3 Bundle Analyzer Çalıştır
```bash
# Kurulum
npm install --save-dev @next/bundle-analyzer

# Analiz
ANALYZE=true npm run build
```

**Hedef:** Bundle boyutunu 400KB'dan 300KB'a düşür

### 2.4 Preconnect ve DNS Prefetch
```typescript
// app/[lang]/layout.tsx
export const metadata = {
  other: {
    'link': [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    ],
  },
};
```

### 2.5 Critical CSS Inline
```typescript
// lib/critical-css.ts
export const criticalCss = `
  /* Header ve Hero için kritik stiller */
  .header { ... }
  .hero { ... }
`;

// app/[lang]/layout.tsx
<head>
  <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
</head>
```

---

## 🚀 Phase 3: Advanced Optimizations (İleri Seviye)

**Süre:** 1-2 hafta  
**Beklenen İyileştirme:** %30-40 performans artışı

### 3.1 Service Worker ile Workbox
```bash
# Kurulum
npm install workbox-window workbox-webpack-plugin
```

```typescript
// public/sw.ts
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

// Görseller için cache
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);
```

### 3.2 MDX İçerik Cache'leme
```typescript
// lib/mdx-cache.ts
import { cache } from 'react';

export const getCachedContent = cache(async (slug: string, lang: string) => {
  // Bu fonksiyon aynı parametrelerle sadece bir kez çalışır
  return await getContentBySlug(slug, lang);
});
```

### 3.3 Virtualization (Uzun Listeler)
```bash
# Kurulum
npm install react-window
```

```typescript
// Hub içerik listesi için
import { FixedSizeList } from 'react-window';

function ContentList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={120}
      width="100%"
    >
      {({ index, style }) => (
        <ContentCard style={style} item={items[index]} />
      )}
    </FixedSizeList>
  );
}
```

### 3.4 Intersection Observer ile Lazy Loading
```typescript
// hooks/useLazyLoad.ts
export function useLazyLoad() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return { ref, isVisible };
}
```

### 3.5 Core Web Vitals Monitoring
```typescript
// lib/vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// app/[lang]/layout.tsx
useEffect(() => {
  reportWebVitals((metric) => {
    // Google Analytics'e gönder
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
    });
  });
}, []);
```

---

## 🔮 Phase 4: Future Work (Gelecek)

**Süre:** Değişken  
**Beklenen İyileştirme:** %10-15 ek performans artışı

### 4.1 AI-Powered Optimizasyonlar
- Smart prefetching (kullanıcı davranışına göre)
- Otomatik image optimization
- Dynamic code splitting

### 4.2 Edge AI
- Vercel AI SDK ile edge'de çalışan AI özellikleri
- Real-time içerik kişiselleştirme

### 4.3 Advanced PWA
- Push notifications
- Background sync
- Offline-first architecture

---

## 📋 Uygulama Sırası

### Bu Hafta (Hemen Başla)
1. [ ] Kullanılmayan bağımlılıkları kaldır
2. [ ] PPR ve React Compiler etkinleştir
3. [ ] Image placeholder ekle
4. [ ] Bundle analyzer çalıştır

### Gelecek Hafta
5. [ ] Edge runtime implementasyonu
6. [ ] Streaming SSR
7. [ ] Preconnect/DNS prefetch
8. [ ] Critical CSS inline

### Gelecek Ay
9. [ ] Service Worker (Workbox)
10. [ ] MDX cache'leme
11. [ ] Virtualization
12. [ ] Core Web Vitals monitoring

---

## 📊 Başarı Metrikleri

| Metrik | Mevcut | Phase 1 Sonrası | Phase 2 Sonrası | Phase 3 Sonrası |
|--------|--------|-----------------|-----------------|-----------------|
| **FCP** | ~1.0s | <0.9s | <0.8s | <0.7s |
| **LCP** | ~1.5s | <1.3s | <1.2s | <1.0s |
| **TTI** | ~2.0s | <1.8s | <1.5s | <1.2s |
| **TBT** | ~200ms | <150ms | <100ms | <50ms |
| **CLS** | <0.05 | <0.04 | <0.03 | <0.02 |
| **Bundle** | ~400KB | <350KB | <300KB | <250KB |
| **Lighthouse** | ~85 | ~90 | ~95 | ~98 |

---

## 🎯 Özet

**Hemen Yapılacaklar (Phase 1):**
- ✅ `recharts` ve `cmdk` kaldır (~100KB tasarruf)
- ✅ PPR etkinleştir
- ✅ React Compiler etkinleştir
- ✅ Image placeholder ekle

**Önemli İyileştirmeler (Phase 2):**
- Edge runtime kullan
- Streaming SSR implemente et
- Bundle analizi yap
- Network optimizasyonu

**İleri Seviye (Phase 3):**
- Service Worker
- Advanced caching
- Virtualization
- Core Web Vitals monitoring

**Toplam Beklenen İyileştirme:** %50+ performans artışı, Lighthouse 95+