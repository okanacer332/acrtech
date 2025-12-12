import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/src/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // 1. Tarayıcının gönderdiği dilleri al
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // 2. Desteklediğimiz dillerle eşleştir
  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return matchLocale(languages, i18n.locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Dosya isteklerini (resimler, svg, favicon vb.) yoksay
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/acrtech.png', // Logo vb. public dosyaların
      '/file.svg',
      '/globe.svg',
      '/next.svg',
      '/vercel.svg',
      '/window.svg',
    ].includes(pathname) ||
    pathname.startsWith('/portfolio/') || // Public altındaki klasörler
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') // API rotaları varsa
  ) {
    return;
  }

  // URL'de zaten dil kodu var mı kontrol et (örn: /tr/about)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Dil kodu yoksa yönlendir
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Yeni URL oluştur (örn: acrtech.com -> acrtech.com/tr)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher: Middleware'in çalışacağı yollar
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};