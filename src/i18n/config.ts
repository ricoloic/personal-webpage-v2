import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import general from './locales/en/general.json';

export const defaultNS = 'general';
export const resources = {
  en: {
    general,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources,
  ns: ['general'],
  defaultNS,
});

i18n.languages = ['en'];

export default i18n;
