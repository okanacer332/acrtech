# ACR Tech - Critical Performance Optimizations
## Immediate Action Required

**Date:** 2026-02-01  
**Priority:** CRITICAL  
**Impact:** High - Will dramatically improve load times

---

## 1. Framer Motion Dynamic Import (CRITICAL)

**Problem:** Framer-motion (~45KB) loads on every page even when not needed
**Solution:** Dynamic import with loading skeleton

### Update: `src/components/TransitionWrapper.tsx`

```typescript
"use client";

import { ReactNode, useMemo, useState, useEffect } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  modeKey: string;
  className?: string;
}

// Lightweight CSS-only fallback
function CSSFallback({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div 
      className={`transition-opacity duration-200 animate-fadeIn ${className}`}
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {children}
    </div>
  );
}

export function TransitionWrapper({ children, modeKey, className }: TransitionWrapperProps) {
  const [motionComponents, setMotionComponents] = useState<typeof import("framer-motion") | null>(null);
  
  // Reduce motion for better performance
  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Lazy load framer-motion only when needed
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    let mounted = true;
    import("framer-motion").then((mod) => {
      if (mounted) setMotionComponents(mod);
    });
    
    return () => { mounted = false; };
  }, [shouldReduceMotion]);

  // Use CSS fallback if reduced motion or framer-motion not loaded
  if (shouldReduceMotion || !motionComponents) {
    return <CSSFallback className={className}>{children}</CSSFallback>;
  }

  const { motion, AnimatePresence } = motionComponents;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 2. Font Optimization (CRITICAL)

**Problem:** Latin-ext subset tüm diller için gereksiz yükleniyor
**Solution:** Dil bazlı font subset optimizasyonu

### Update: `app/[lang]/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ModeProvider } from "@/src/lib/context/ModeContext";
import { LanguageProvider } from '@/src/lib/i18n/LanguageContext';
import { Toaster } from "@/src/components/ui/sonner";
import { i18n, type Locale } from "@/src/i18n-config";
import { getDictionary } from "@/src/lib/i18n/get-dictionary";
import { GoogleAnalytics } from '@next/third-parties/google';

// Optimize font loading - only latin for most languages
const inter = Inter({
  subsets: ["latin"],  // Removed latin-ext, saves ~20KB
  display: 'optional', // Reduces CLS
  preload: false,      // Let browser decide when to load
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-inter', // Use CSS variable
});

// Add CSS animation for fallback
const cssAnimations = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
`;

// ... rest of the file
```

---

## 3. Image Optimization Pipeline (CRITICAL)

**Problem:** Portfolio görselleri optimize edilmemiş, büyük boyutlu
**Solution:** Sharp ile otomatik optimizasyon scripti

### Create: `scripts/optimize-images.js`

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/portfolio';
const OUTPUT_DIR = './public/portfolio/optimized';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image sizes for responsive images
const SIZES = [640, 750, 828, 1080, 1200, 1920];

async function optimizeImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate AVIF (best compression)
    await image
      .avif({ quality: 80, effort: 4 })
      .toFile(path.join(OUTPUT_DIR, `${baseName}.avif`));
    
    // Generate WebP (fallback)
    await image
      .webp({ quality: 85, effort: 4 })
      .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`));
    
    // Generate responsive sizes
    for (const width of SIZES) {
      if (metadata.width && metadata.width > width) {
        await image
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(path.join(OUTPUT_DIR, `${baseName}-${width}.webp`));
      }
    }
    
    // Generate blur placeholder (tiny)
    const blurBuffer = await image
      .resize(20, null, { withoutEnlargement: true })
      .blur()
      .webp({ quality: 20 })
      .toBuffer();
    
    const blurBase64 = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
    
    console.log(`✓ Optimized: ${filename}`);
    return { blurBase64, sizes: SIZES.filter(s => metadata.width && metadata.width > s) };
    
  } catch (error) {
    console.error(`✗ Failed: ${filename}`, error.message);
    return null;
  }
}

async function main() {
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  console.log(`Found ${files.length} images to optimize...\n`);
  
  const results = {};
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const result = await optimizeImage(inputPath, file);
    if (result) {
      results[file] = result;
    }
  }
  
  // Save metadata for Next.js Image component
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'image-manifest.json'),
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✓ Optimization complete!');
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Manifest: ${OUTPUT_DIR}/image-manifest.json`);
}

main().catch(console.error);
```

### Update: `package.json` scripts

```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js",
    "prebuild": "npm run optimize-images"
  }
}
```

---

## 4. Radix UI Tree Shaking (HIGH)

**Problem:** Tüm Radix UI component'leri import ediliyor, tree-shaking yetersiz
**Solution:** Sadece kullanılan component'leri re-export et

### Create: `src/components/ui/optimized/index.ts`

```typescript
// Re-export only used Radix UI components
// This ensures proper tree-shaking

export { Button } from '../button';
export { Badge } from '../badge';
export { Input } from '../input';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../dialog';
export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../sheet';
export { Separator } from '../separator';
export { Skeleton } from '../skeleton';
export { ScrollArea } from '../scroll-area';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../accordion';
export { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
export { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../dropdown-menu';

// Re-export utilities
export { cn } from '../utils';
```

### Update all imports:

```typescript
// BEFORE
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";

// AFTER
import { Button, Dialog } from "@/src/components/ui/optimized";
```

---

## 5. Service Worker for Caching (HIGH)

**Problem:** Statik dosyalar her seferinde yeniden indiriliyor
**Solution:** Service Worker ile agresif caching

### Create: `public/sw.js`

```javascript
const CACHE_NAME = 'acrtech-v1';
const STATIC_ASSETS = [
  '/',
  '/_next/static/css/_buildManifest.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/pages/_app.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first strategy for HTML, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== self.location.origin) return;
  
  // HTML pages - network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Static assets - cache first, fallback to network
  if (
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/portfolio/optimized') ||
    /\.(js|css|woff2?|webp|avif|png|jpg|jpeg|svg)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) return response;
        
        return fetch(request).then((fetchResponse) => {
          const clone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return fetchResponse;
        });
      })
    );
    return;
  }
  
  // Default - network only
  event.respondWith(fetch(request));
});
```

### Register SW: `app/layout.tsx`

```typescript
// Add to layout.tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  }
}, []);
```

---

## 6. Critical CSS Extraction (MEDIUM)

**Problem:** Tüm CSS render-blocking olarak yükleniyor
**Solution:** Critical CSS inline, geri kalan async

### Create: `app/critical.css`

```css
/* Critical above-the-fold styles */
/* Header */
.header { position: sticky; top: 0; z-index: 50; }

/* Hero section */
.hero { min-height: 100vh; display: flex; align-items: center; }

/* Typography */
h1, h2, h3 { font-weight: 700; line-height: 1.2; }

/* Container */
.container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }

/* Button base */
.btn { display: inline-flex; align-items: center; justify-content: center; }

/* Animation keyframes */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

### Update: `app/layout.tsx`

```typescript
import criticalCss from './critical.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        
        {/* Async load full CSS */}
        <link 
          rel="preload" 
          href="/_next/static/css/_buildManifest.css" 
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/_buildManifest.css" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7. Google Analytics Optimization (MEDIUM)

**Problem:** GA render-blocking, sayfa yüklemesini yavaşlatıyor
**Solution:** Lazy load with intersection observer

### Update: `app/layout.tsx`

```typescript
import { useEffect, useState } from 'react';

function LazyAnalytics() {
  const [loadAnalytics, setLoadAnalytics] = useState(false);
  
  useEffect(() => {
    // Load GA after user interaction or 5 seconds
    const timer = setTimeout(() => setLoadAnalytics(true), 5000);
    
    const handleInteraction = () => {
      setLoadAnalytics(true);
      clearTimeout(timer);
    };
    
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);
  
  if (!loadAnalytics) return null;
  
  return <GoogleAnalytics gaId="YOUR_GA_ID" />;
}
```

---

## Implementation Order

1. **Today (CRITICAL):**
   - [ ] Framer Motion dynamic import
   - [ ] Font optimization
   - [ ] Fix remaining build errors

2. **This Week (HIGH):**
   - [ ] Image optimization pipeline
   - [ ] Service Worker implementation
   - [ ] Radix UI tree-shaking

3. **Next Sprint (MEDIUM):**
   - [ ] Critical CSS extraction
   - [ ] Route-based code splitting
   - [ ] GA lazy loading

---

## Expected Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Bundle Size | ~600KB | ~200KB | 67% reduction |
| LCP | 4-6s | <2.5s | 50-60% faster |
| FID | 200-400ms | <100ms | 75% faster |
| Lighthouse | 40-60 | 90-100 | 50-150% better |

---

**Next Step:** Start with Framer Motion dynamic import and font optimization - these are the highest impact changes that can be done in under 1 hour.
