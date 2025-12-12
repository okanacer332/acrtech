export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en', 'de', 'es', 'ru', 'fr', 'ar'],
} as const;

export type Locale = (typeof i18n)['locales'][number];