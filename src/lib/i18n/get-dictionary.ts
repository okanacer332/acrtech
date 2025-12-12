import 'server-only';
import { dictionaries } from './locales';
import type { Locale } from '@/src/i18n-config';

type DictionaryKey = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  const dictionaryKey = locale.toUpperCase() as DictionaryKey;
  
  return dictionaries[dictionaryKey] ?? dictionaries['TR'];
};