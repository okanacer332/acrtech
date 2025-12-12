import 'server-only';
import { dictionaries } from './locales';
import type { Locale } from '@/src/i18n-config';

// TypeScript'e 'TR', 'EN' gibi anahtarları kullandığımızı belirtiyoruz
type DictionaryKey = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  // Gelen küçük harfli 'tr' locale bilgisini 'TR'ye çeviriyoruz
  const dictionaryKey = locale.toUpperCase() as DictionaryKey;
  
  // Sözlüğü döndürüyoruz, eğer bulamazsa varsayılan olarak TR dönüyor
  return dictionaries[dictionaryKey] ?? dictionaries['TR'];
};