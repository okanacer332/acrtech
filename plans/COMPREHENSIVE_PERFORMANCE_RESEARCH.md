# ACR Tech - Kapsamlı Performans Araştırması ve Optimizasyon Planı

## 📋 Proje Özeti

**Proje:** ACR Tech  
**Framework:** Next.js 16.0.7 + React 19.2.1  
**Stil:** Tailwind CSS v4  
**UI:** Radix UI + shadcn/ui (40+ bileşen)  
**Animasyon:** Framer Motion  
**İçerik:** 126 MDX dosyası (7 dil × 18 içerik)  
**Diller:** TR, EN, DE, ES, RU, FR, AR

---

## 🔍 Mevcut Durum Analizi

### Uygulanmış Optimizasyonlar (✅)

| Alan | Optimizasyon | Durum |
|------|--------------|-------|
| **next.config.ts** | AVIF/WebP formatları, 30 gün cache TTL, paket import optimizasyonu | ✅ |
| **Font** | display: swap, preload: true, fallback sistem fontları | ✅ |
| **Görsel** | lazy loading, sizes prop, quality={85} | ✅ |
| **Code Splitting** | 6 bileşen dinamik import (Portfolio, PricingPlans, Services, FocusAreas, CTA, Footer) | ✅ |
| **Framer Motion** | Süre 0.4s → 0.2s, prefers-reduced-motion desteği | ✅ |
| **Middleware** | Matcher optimize edildi | ✅ |

### Kullanılan Bağımlılıklar Analizi

```json
// Kritik Bağımlılıklar
"next": "^16.0.7"              // ✅ Güncel
"react": "^19.2.1"            // ✅ React 19
"tailwindcss": "^4"           // ✅ Tailwind v4
"framer-motion": "^12.23.25"  // ⚠️ Büyük bundle
"recharts": "^3.5.1"          // ❌ Kullanılmıyor
"cmdk": "^1.1.1"              // ❌ Kullanılmıyor
"@radix-ui/react-*": "25+"    // ⚠️ Tree shaking gerekli
```

---

## 🚀 Next.js 16 Yeni Performans Özellikleri

### 1. Partial Prerendering (PPR)

Next.js 16'nın en önemli özelliği. Statik ve dinamik içeriği aynı sayfada birleştirir.

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: true, // Partial Prerendering etkinleştir
  },
};
```

**Uygulama:**
- Hub sayfalarında (makaleler, demolar) shell'i statik render et
- MDX içeriği streaming ile yükle

```typescript
// app/[lang]/hub/[category]/[slug]/page.tsx
import { Suspense } from 'react';
import { MDXContent } from '@/src/components/hub/MDXContent';
import { MDXContentSkeleton } from '@/src/components/hub/MDXContentSkeleton';

export default function ContentPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      {/* Statik shell - anında yüklenir */}
      <HubHeader />
      <HubSidebar />
      
      {/* Dinamik içerik - streaming */}
      <Suspense fallback={<MDXContentSkeleton />}>
        <MDXContent slug={params.slug} />
      </Suspense>
    </div>
  );
}
```

### 2. React 19 Compiler (React Compiler)

React 19 ile gelen otomatik memoization.

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    reactCompiler: true, // Otomatik memoization
  },
};
```

**Faydalar:**
- Manuel `useMemo`, `useCallback` kullanımına gerek kalmaz
- `TransitionWrapper`, `ModeContext` otomatik optimize edilir
- Daha temiz kod

### 3. Server Actions Optimizasyonu

```typescript
// Server Action'ları grupla ve cache'le
'use server';

import { cache } from 'react';

// Cache'lenmiş server action
export const getContent = cache(async (slug: string) => {
  // MDX içeriği oku
  return await fetchContent(slug);
});
```

### 4. Route Segment Config

```typescript
// app/[lang]/hub/page.tsx
export const runtime = 'edge'; // Edge runtime kullan
export const preferredRegion = 'fra1'; // Vercel bölgesi
export const revalidate = 3600; // 1 saat ISR
```

### 5. next/after (Deneysel)

```typescript
import { after } from 'next/server';

export default async function Page() {
  // Ana içerik hemen göster
  const data = await fetchCriticalData();
  
  // Analytics, logging vs. response sonrası çalıştır
  after(async () => {
    await logAnalytics(data);
    await updateViewCount(data.id);
  });
  
  return <PageContent data={data} />;
}
```

---

## 🎨 Tailwind CSS v4 Optimizasyonları

### 1. @import Syntax

Tailwind v4'te yeni import syntax'ı:

```css
/* globals.css */
@import "tailwindcss";
@import "@tailwindcss/typography";

@plugin "tailwindcss-animate";

@theme inline {
  /* Custom theme variables */
}
```

### 2. CSS-First Configuration

Tailwind v4'te `tailwind.config.js` yerine CSS içinde konfigürasyon:

```css
/* globals.css */
@theme inline {
  --color-primary: #030213;
  --color-secondary: oklch(0.97 0 0);
  /* ... diğer değişkenler */
  
  /* Animasyonlar */
  --animate-fadeIn: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

### 3. Unused CSS Temizleme

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true, // CSS optimizasyonu
  },
};
```

### 4. Container Queries

```css
/* Responsive olmadan container-based responsive */
@container (min-width: 400px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 5. Dynamic Theme Değişkenleri

```css
:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: oklch(0.985 0 0);
  }
}
```

---

## ⚛️ React 19 Performans İyileştirmeleri

### 1. Actions

```typescript
// Form işlemleri için yeni useActionState hook'u
'use client';

import { useActionState } from 'react';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      // Form işlemi
      return { success: true };
    },
    null
  );
  
  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>Gönder</button>
    </form>
  );
}
```

### 2. useOptimistic

```typescript
// Optimistic UI güncellemeleri
'use client';

import { useOptimistic } from 'react';

export function LikeButton({ postId, initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (state, newLike) => state + newLike
  );
  
  async function handleLike() {
    addOptimisticLike(1); // Hemen UI güncelle
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' }); // API çağrısı
  }
  
  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;
}
```

### 3. use Hook

```typescript
// Suspense ile kullanılan yeni hook
import { use, Suspense } from 'react';

function Comments({ commentsPromise }) {
  // Promise resolve olana kadar Suspense fallback gösterilir
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment.text}</p>);
}

export function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

### 4. Document Metadata API

```typescript
// SEO için yerleşik destek
export const metadata = {
  title: 'ACR Tech',
  description: 'İşinizi büyüten yazılım çözümleri',
  openGraph: {
    images: ['/og-image.png'],
  },
};
```

---

## 🌐 Edge Runtime ve Streaming Stratejileri

### 1. Edge Runtime Kullanımı

```typescript
// app/[lang]/hub/page.tsx
export const runtime = 'edge';

// Middleware edge runtime'da çalışır zaten
// middleware.ts
export const config = {
  runtime: 'edge',
};
```

**Edge Runtime Avantajları:**
- Düşük latency (kullanıcıya yakın konumda çalışır)
- Cold start süresi neredeyse yok
- Otomatik ölçeklenme

### 2. Streaming SSR

```typescript
// app/[lang]/page.tsx
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      {/* Kritik içerik - hemen göster */}
      <Hero />
      
      {/* Non-kritik içerik - streaming */}
      <Suspense fallback={<PortfolioSkeleton />}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
    </>
  );
}
```

### 3. Progressive Enhancement

```typescript
// app/[lang]/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>
        {children}
        {/* Non-critical JS async yükle */}
        <Script src="/analytics.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
```

---

## 💾 Service Worker ve Caching Stratejileri

### 1. Workbox Entegrasyonu

```typescript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 gün
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 gün
        },
      },
    },
  ],
});

module.exports = withPWA(nextConfig);
```

### 2. Özel Service Worker

```typescript
// public/sw.ts
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache edilecek dosyalar (build zamanı)
precacheAndRoute(self.__WB_MANIFEST);

// MDX içerikleri için cache stratejisi
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/content'),
  new StaleWhileRevalidate({
    cacheName: 'mdx-content',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // 1 gün
      }),
    ],
  })
);
```

### 3. Cache API Kullanımı

```typescript
// lib/cache.ts
const CACHE_NAME = 'acrtech-v1';

export async function cacheContent(key: string, data: any) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(
    key,
    new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  );
}

export async function getCachedContent(key: string) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(key);
  if (response) {
    return await response.json();
  }
  return null;
}
```

---

## 🖼️ Advanced Image Optimization

### 1. AVIF/WEBP Otomatik Dönüşüm

```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### 2. Responsive Images

```typescript
// src/components/Portfolio.tsx
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading={index < 2 ? "eager" : "lazy"}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // LQIP
/>
```

### 3. Art Direction

```typescript
// Farklı ekran boyutları için farklı görseller
<picture>
  <source
    media="(max-width: 640px)"
    srcSet="/image-mobile.avif"
    type="image/avif"
  />
  <source
    media="(min-width: 641px)"
    srcSet="/image-desktop.avif"
    type="image/avif"
  />
  <Image
    src="/image-desktop.jpg"
    alt="Description"
    width={800}
    height={600}
  />
</picture>
```

### 4. Görsel Ön Yükleme

```typescript
// app/[lang]/layout.tsx
import { preload } from 'react-dom';

export default function Layout() {
  // Kritik görselleri ön yükle
  preload('/hero-image.jpg', { as: 'image' });
  
  return <html>...</html>;
}
```

---

## 📦 Bundle Analizi ve Tree Shaking

### 1. Bundle Analyzer

```bash
# Kurulum
npm install --save-dev @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Çalıştırma
ANALYZE=true npm run build
```

### 2. Import Optimizasyonu

```typescript
// ❌ Kötü - tüm kütüphane import edilir
import * as LucideIcons from 'lucide-react';

// ✅ İyi - sadece kullanılan ikonlar
import { Menu, X, ArrowRight } from 'lucide-react';

// ❌ Kötü - tüm Radix UI
import * as Dialog from '@radix-ui/react-dialog';

// ✅ İyi - tree shaking ile sadece kullanılanlar
import { Dialog, DialogContent, DialogTrigger } from '@/src/components/ui/dialog';
```

### 3. Dynamic Import ile Code Splitting

```typescript
// app/[lang]/client-home-wrapper.tsx
import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('@/src/components/Portfolio').then(mod => ({ default: mod.Portfolio })), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
  ssr: false,
});

// Heavy component'leri lazy load et
const HeavyChart = dynamic(() => import('@/src/components/HeavyChart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
```

### 4. Kullanılmayan Bağımlılıkları Kaldır

```bash
# Kullanılmayan bağımlılıkları bul
npm install -g depcheck
depcheck

# Kaldırılacaklar:
# - recharts (kullanılmıyor)
# - cmdk (kullanılmıyor)
```

---

## 🎯 Critical CSS ve Inline Styles

### 1. Critical CSS Extract

```typescript
// lib/critical-css.ts
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'; // veya benzeri

export function extractCriticalCss(component: React.ReactElement) {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(component));
  const styleTags = sheet.getStyleTags();
  sheet.seal();
  
  return { html, css: styleTags };
}
```

### 2. Inline Critical CSS

```typescript
// app/[lang]/layout.tsx
export default async function RootLayout() {
  const criticalCss = await getCriticalCss();
  
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>...</body>
    </html>
  );
}
```

### 3. CSS-in-JS Optimizasyonu

```typescript
// Tailwind v4 ile CSS-first yaklaşım
// globals.css
@import "tailwindcss";

/* Sadece kullanılan stiller bundle'a dahil olur */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-transparent;
  }
}
```

---

## 🌐 Network Optimizasyonu

### 1. Preconnect ve DNS Prefetch

```typescript
// app/[lang]/layout.tsx
export const metadata = {
  // Preconnect kritik domainlere
  other: {
    'link': [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    ],
  },
};
```

### 2. Resource Hints

```html
<!-- Kritik kaynakları önceden yükle -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/hero-image.jpg" as="image" type="image/jpeg">

<!-- Sonraki sayfa için prefetch -->
<link rel="prefetch" href="/about">
<link rel="prefetch" href="/services">
```

### 3. HTTP/2 Server Push (CDN destekliyorsa)

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Link',
          value: '</fonts/inter.woff2>; rel=preload; as=font, </hero-image.jpg>; rel=preload; as=image',
        },
      ],
    },
  ];
}
```

---

## 🗜️ Compression ve Minification

### 1. Brotli ve Gzip

```typescript
// next.config.ts
const nextConfig = {
  compress: true, // Gzip/Brotli otomatik
  
  // Vercel'de otomatik, kendi sunucunda:
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Accept-Encoding',
            value: 'gzip, deflate, br',
          },
        ],
      },
    ];
  },
};
```

### 2. Minification

```typescript
// next.config.ts
const nextConfig = {
  swcMinify: true, // SWC ile hızlı minification
  
  // Terser alternatifi (daha yavaş ama daha agresif)
  // terserOptions: { ... }
};
```

### 3. MDX Sıkıştırma

```typescript
// lib/mdx.ts
import { serialize } from 'next-mdx-remote/serialize';
import rehypeMinify from 'rehype-preset-minify';

export async function getMdxContent(source: string) {
  return await serialize(source, {
    mdxOptions: {
      rehypePlugins: [rehypeMinify],
    },
  });
}
```

---

## 🧠 Memory ve Runtime Optimizasyonları

### 1. React.memo Kullanımı

```typescript
// src/components/Portfolio.tsx
import { memo } from 'react';

function PortfolioComponent({ mode }: PortfolioProps) {
  // ...
}

// Props değişmediğinde re-render etme
export const Portfolio = memo(PortfolioComponent, (prev, next) => {
  return prev.mode === next.mode;
});
```

### 2. useMemo ve useCallback

```typescript
// src/lib/context/ModeContext.tsx
const toggleMode = useCallback((selectedMode: Mode) => {
  setMode(selectedMode);
  localStorage.setItem('acr-mode', selectedMode);
}, []);

const contextValue = useMemo(() => ({
  mode,
  toggleMode,
}), [mode, toggleMode]);
```

### 3. Virtualization (Uzun listeler için)

```typescript
// npm install react-window
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <List
      height={500}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index]}
        </div>
      )}
    </List>
  );
}
```

### 4. Intersection Observer ile Lazy Loading

```typescript
// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Bir kez tetiklendikten sonra izlemeyi bırak
      }
    }, options);
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return { ref, isInView };
}
```

---

## 📊 Önceliklendirilmiş Optimizasyon Planı

### Phase 1: Hızlı Kazanımlar (1-2 gün)

| # | Optimizasyon | Etki | Zorluk |
|---|--------------|------|--------|
| 1 | Kullanılmayan bağımlılıkları kaldır (recharts, cmdk) | -50KB | Kolay |
| 2 | next.config.ts'e PPR ekle | %20 hızlanma | Kolay |
| 3 | React Compiler etkinleştir | Otomatik memoization | Kolay |
| 4 | Image placeholder/blur ekle | Daha iyi LCP | Kolay |
| 5 | Service Worker ekle | Offline desteği | Orta |

### Phase 2: Orta Seviye (3-5 gün)

| # | Optimizasyon | Etki | Zorluk |
|---|--------------|------|--------|
| 6 | Edge runtime kullan | Düşük latency | Orta |
| 7 | Streaming SSR implemente et | Daha iyi TTFB | Orta |
| 8 | Bundle analyzer çalıştır | Farkındalık | Kolay |
| 9 | Critical CSS inline yap | Daha iyi FCP | Orta |
| 10 | Preconnect/DNS prefetch ekle | Daha hızlı network | Kolay |

### Phase 3: İleri Seviye (1-2 hafta)

| # | Optimizasyon | Etki | Zorluk |
|---|--------------|------|--------|
| 11 | MDX içerikleri cache'le | Daha hızlı navigasyon | Zor |
| 12 | Virtualization ekle (uzun listeler) | Daha az memory | Zor |
| 13 | Workbox ile advanced caching | Offline-first | Zor |
| 14 | Route-based code splitting | Daha küçük bundle | Orta |
| 15 | Core Web Vitals monitoring | Sürekli izleme | Orta |

---

## 📈 Beklenen Sonuçlar

| Metrik | Mevcut | Hedef | İyileştirme |
|--------|--------|-------|-------------|
| **First Contentful Paint (FCP)** | ~1.0s | <0.8s | %20 |
| **Largest Contentful Paint (LCP)** | ~1.5s | <1.2s | %20 |
| **Time to Interactive (TTI)** | ~2.0s | <1.5s | %25 |
| **Total Blocking Time (TBT)** | ~200ms | <100ms | %50 |
| **Cumulative Layout Shift (CLS)** | <0.05 | <0.03 | %40 |
| **Bundle Size** | ~400KB | <300KB | %25 |
| **Lighthouse Score** | ~85 | >95 | +10 |

---

## 🛠️ Implementasyon Kodları

### 1. Güncellenmiş next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Görsel optimizasyonu
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Sıkıştırma
  compress: true,
  
  // Minification
  swcMinify: true,
  
  // Powered by header'ını kaldır
  poweredByHeader: false,
  
  // Strict mode
  reactStrictMode: true,
  
  // Experimental özellikler
  experimental: {
    // Partial Prerendering
    ppr: true,
    
    // React Compiler
    reactCompiler: true,
    
    // Paket import optimizasyonu
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
      'embla-carousel-react',
    ],
    
    // CSS optimizasyonu
    optimizeCss: true,
  },
  
  // HTTP Header optimizasyonu
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  turbopack: {},
};

export default nextConfig;
```

### 2. Service Worker

```typescript
// public/sw.ts
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

// Eski cache'leri temizle
cleanupOutdatedCaches();

// Precache edilecek dosyalar
precacheAndRoute(self.__WB_MANIFEST);

// Google Fonts - Cache First
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

// Font dosyaları - Cache First
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

// Görseller - Cache First
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