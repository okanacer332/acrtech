import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr.json';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import de from './locales/de.json';

const RTL_LANGUAGES = ['ar'];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            tr: { translation: tr },
            en: { translation: en },
            ar: { translation: ar },
            ru: { translation: ru },
            de: { translation: de },
        },
        fallbackLng: 'tr',
        supportedLngs: ['tr', 'en', 'ar', 'ru', 'de'],
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

// Apply RTL direction on language change
const applyDirection = (lang) => {
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
};

applyDirection(i18n.language);
i18n.on('languageChanged', applyDirection);

export default i18n;
