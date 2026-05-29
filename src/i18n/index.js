import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './locales/tr.json';
import en from './locales/en.json';

const SUPPORTED_LANGUAGES = ['tr', 'en'];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            tr: { translation: tr },
            en: { translation: en },
        },
        fallbackLng: 'tr',
        supportedLngs: SUPPORTED_LANGUAGES,
        nonExplicitSupportedLngs: true,
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

// Apply RTL direction on language change
const applyDirection = (lang) => {
    const normalized = SUPPORTED_LANGUAGES.includes(lang?.split('-')[0]) ? lang.split('-')[0] : 'tr';
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = normalized;
};

applyDirection(i18n.language);
i18n.on('languageChanged', applyDirection);

export default i18n;
