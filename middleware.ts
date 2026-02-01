import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/src/i18n-config'; // Yolunu dosya konumuna göre ayarla
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator headers objesi bekler
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales readonly hatası için
  const locales: string[] = i18n.locales;

  // Tarayıcının dillerini al
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    // Eşleştirme yap (Örn: Kullanıcı 'en-US' istiyor, bizde 'en' var -> Eşleşir)
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    // Herhangi bir hatada varsayılan dile dön
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Statik dosyaları ve API route'larını kontrol etme
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/acrtech.png', // Logo vb. dosyalar
      '/robots.txt',
      '/sitemap.xml',
    ].includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|css|js)$/) // Görseller ve assetler
  ) {
    return;
  }

  // 2. URL'de dil kodu var mı kontrol et
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. Eğer dil kodu yoksa (örn: "acrtech.com/hub" veya "acrtech.com/")
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Yeni URL'yi oluştur: /en/hub veya /tr
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher: Middleware'in hangi yollarda çalışacağını belirler
  // Daha agresif filtreleme ile performans artışı
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    '/(tr|en|de|es|ru|fr|ar)/:path*',
  ],
};