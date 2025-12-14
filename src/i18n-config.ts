export const i18n = {
  defaultLocale: 'en', // Dünya geneli için varsayılan İngilizce en mantıklısıdır.
  locales: ['tr', 'en', 'de', 'fr', 'es', 'ru', 'ar'],
} as const;

export type Locale = (typeof i18n)['locales'][number];