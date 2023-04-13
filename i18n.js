import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './resources';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultLng: 'fr',
    // defaultLocale: 'fr', // Default language of your website
    // locales: ['fr', 'en'],
    resources,
    debug: true,
    detection: {
      order: ['navigator', 'localStorage'],
      caches: ['localStorage'],
      lookupCookie: 'i18next',
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
