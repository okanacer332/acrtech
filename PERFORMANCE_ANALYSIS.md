# ACR Tech Performans Analizi ve Optimizasyon Planı

## 📊 Mevcut Durum Analizi

### Proje Yapısı
- **Framework**: Next.js 16.0.7 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS v4
- **UI Kütüphanesi**: Radix UI + shadcn/ui
- **Animasyon**: Framer Motion
- **İçerik**: MDX (42 makale, 21 demo, 21 proje, 42 yasal sayfa)
- **Diller**: 7 dil (TR, EN, DE, ES, RU, FR, AR)

### Tespit Edilen Kritik Performans Sorunları

#### 1. 🚨 **next.config.ts - Sıfır Optimizasyon**
```typescript
const nextConfig: NextConfig = {
  /* config options here */  // ❌ BOŞ!
};
```
**Etki**: Görsel optimizasyonu, kod bölme, önbellekleme devre dışı

#### 2. 🚨 **Görsel Optimizasyon Eksiklikleri**
- [`Portfolio.tsx`](src/components/Portfolio.tsx:48) - `fill` kullanımı ama `sizes` prop'u eksik optimizasyon
- [`Header.tsx`](src/components/Header.tsx:78) - Logo `priority` ile yükleniyor ama boyut optimizasyonu yok
- Public klasöründe 8 portfolyo görseli - WebP/AVIF formatına dönüştürülmemiş

#### 3. 🚨 **CSS ve JavaScript Sorunları**
- [`globals.css`](app/globals.css:1) - Tailwind v4 `@import "tailwindcss"` - Tüm CSS tek seferde yükleniyor
- [`index.css`](src/index.css:1) - 6000+ satır CSS değişkeni - Kullanılmayan stiller
- Framer Motion - Tüm sayfada kullanılıyor, lazy load yok
- [`TransitionWrapper.tsx`](src/components/TransitionWrapper.tsx:1) - Her bileşen animasyonlu

#### 4. 🚨 **Font Yükleme Sorunu**
```typescript
// layout.tsx
const inter = Inter({ subsets: ["latin", "latin-ext"] });  // ❌ display: 'swap' yok
```

#### 5. 🚨 **İ18n ve Middleware**
- [`middleware.ts`](middleware.ts:1) - Her istekte çalışıyor, optimizasyon yok
- 7 dil için 126 içerik dosyası - Build zamanı statik oluşturma yetersiz

#### 6. 🚨 **Bağımlılık Şişkinliği**
```json
// package.json
"@radix-ui/react-*": 25+ paket  // ❌ Tüm UI bileşenleri yükleniyor
"framer-motion": "^12.23.25"     // ❌ Büyük kütüphane
"recharts": "^3.5.1"             // ❌ Kullanılmıyor olabilir
"cmdk": "^1.1.1"                 // ❌ Command palette kullanılıyor mu?
```

#### 7. 🚨 **Code Splitting Yok**
- [`client-home-wrapper.tsx`](app/[lang]/client-home-wrapper.tsx:1) - Tüm bileşenler birlikte yükleniyor
- Lazy loading kullanılmıyor
- Dinamik import yok

---

## 🎯 Optimizasyon Planı (BMAD-METHOD ile)

### Phase 1: Hızlı Kazanımlar (Anında Etki)

#### 1.1 next.config.ts Optimizasyonu
```typescript
const nextConfig: NextConfig = {
  // Görsel optimizasyonu
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Sıkıştırma
  compress: true,
  
  // Build optimizasyonu
  swcMinify: true,
  
  // Experimental özellikler
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Header optimizasyonu
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### 1.2 Font Optimizasyonu
```typescript
// layout.tsx
const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  display: 'swap',  // ✅ FOIT önlenir
  preload: true,
  fallback: ['system-ui', 'arial'],
});
```

#### 1.3 Görsel Optimizasyonu
```typescript
// Portfolio.tsx - Optimized
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading={index < 2 ? "eager" : "lazy"}  // ✅ İlk 2 görsel eager
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

### Phase 2: Code Splitting ve Lazy Loading

#### 2.1 Dinamik Import ile Bileşenleri Bölme
```typescript
// client-home-wrapper.tsx
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/src/components/Hero').then(mod => ({ default: mod.Hero })), {
  loading: () => <div className="min-h-screen bg-slate-900" />,
});

const Portfolio = dynamic(() => import('@/src/components/Portfolio').then(mod => ({ default: mod.Portfolio })), {
  loading: () => <div className="h-96 bg-slate-900" />,
});

// Diğer bileşenler de benzer şekilde...
```

#### 2.2 Framer Motion Lazy Load
```typescript
// TransitionWrapper.tsx
import { motion, AnimatePresence } from 'framer-motion';

// Sadece gerekli olduğunda yükle
const shouldReduceMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export function TransitionWrapper({ children, modeKey, className }: TransitionWrapperProps) {
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}  // ✅ Daha hızlı animasyon
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Phase 3: CSS Optimizasyonu

#### 3.1 Tailwind CSS Purge
```css
/* globals.css */
@import "tailwindcss";

/* Sadece kullanılan animasyonlar */
@theme inline {
  --animate-fadeIn: fadeIn 0.3s ease-out;
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}

/* Kullanılmayan animasyonları kaldır */
```

#### 3.2 Critical CSS
```typescript
// layout.tsx - Inline critical CSS
<style dangerouslySetInnerHTML={{ __html: `
  /* Critical CSS for above-the-fold content */
  .hero-section { min-height: 100vh; }
  .header { position: fixed; top: 0; }
`}} />
```

### Phase 4: İ18n ve Middleware Optimizasyonu

#### 4.1 Middleware Optimizasyonu
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

// Statik dosyaları daha agresif filtrele
```

#### 4.2 Statik Üretim Optimizasyonu
```typescript
// page.tsx
export const revalidate = 3600; // 1 saat ISR
export const dynamic = 'force-static'; // Statik oluştur
```

### Phase 5: Bundle Optimizasyonu

#### 5.1 Gereksiz Bağımlılıkları Kaldır
```json
// package.json
{
  "dependencies": {
    // Kullanılmayanları kaldır
    "recharts": "KALDIR",  // Kullanılmıyorsa
    "cmdk": "KALDIR",      // Command palette yoksa
    
    // Radix UI - Sadece kullanılanları tut
    "@radix-ui/react-accordion": "^1.2.12",
    // ... diğer kullanılanlar
  }
}
```

#### 5.2 Tree Shaking
```typescript
// next.config.ts
module.exports = {
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    return config;
  },
};
```

---

## 📈 Beklenen Performans İyileştirmeleri

| Metrik | Mevcut | Hedef | İyileştirme |
|--------|--------|-------|-------------|
| First Contentful Paint (FCP) | ~2.5s | <1.0s | %60 |
| Largest Contentful Paint (LCP) | ~4.0s | <1.5s | %62 |
| Time to Interactive (TTI) | ~5.0s | <2.0s | %60 |
| Total Blocking Time (TBT) | ~800ms | <200ms | %75 |
| Cumulative Layout Shift (CLS) | ~0.15 | <0.05 | %67 |
| Bundle Size | ~850KB | <300KB | %65 |

---

## 🔧 Uygulama Sırası

1. **Anında** (5 dakika): `next.config.ts` optimizasyonu
2. **Anında** (5 dakika): Font optimizasyonu
3. **Hızlı** (15 dakika): Görsel optimizasyonu
4. **Orta** (30 dakika): Code splitting
5. **Orta** (30 dakika): CSS optimizasyonu
6. **Detaylı** (1 saat): Bundle analizi ve temizlik

---

## 🧪 Test Stratejisi (BMAD-METHOD TEA)

### Network-First Testing
```typescript
// Örnek: Sayfa yüklenme testi
import { test, expect } from '@playwright/test';

test('homepage loads within 2 seconds', async ({ page }) => {
  const navigationPromise = page.waitForResponse(resp => 
    resp.url().includes('/') && resp.status() === 200
  );
  
  await page.goto('/');
  await navigationPromise;
  
  // LCP elementi kontrol et
  const lcpElement = await page.locator('img[alt="ACRTECH Logo"]').first();
  await expect(lcpElement).toBeVisible({ timeout: 2000 });
});
```

### Performance Budget Testing
```typescript
// Lighthouse CI entegrasyonu
const config = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }],
      },
    },
  },
};
```

---

## 📝 Sonuç

Bu optimizasyon planı uygulandığında:
- **Mobil**: 4-5 saniye olan açılış süresi 1-1.5 saniyeye inecek
- **Web**: 2-3 saniye olan açılış süresi <1 saniyeye inecek
- **SEO**: Core Web Vitals tümü "Good" seviyesine yükselecek
- **Kullanıcı Deneyimi**: Anında etkileşim, akıcı animasyonlar

BMAD-METHOD'un TEA (Test Engineering Architecture) prensipleriyle:
- Network-first testing ile gerçek kullanıcı deneyimi ölçümü
- Fixture architecture ile tekrarlanabilir performans testleri
- Knowledge base ile sürekli iyileştirme
