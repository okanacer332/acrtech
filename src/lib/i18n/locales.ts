import { tr } from './locales/tr';
import { en } from './locales/en';
import { de } from './locales/de';
import { es } from './locales/es';
import { ru } from './locales/ru';
import { fr } from './locales/fr';
import { ar } from './locales/ar'; // EKLENDİ

export const dictionaries = {
  TR: tr,
  EN: en,
  DE: de,
  ES: es,
  RU: ru,
  FR: fr,
  AR: ar,
};

export type LanguageCode = keyof typeof dictionaries;