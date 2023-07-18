import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import general from './locales/en/general.json';
import home from './locales/en/home.json';
import mouseFollow from './locales/en/mouseFollow.json';

export const defaultNS = 'general';
export const resources = {
  en: {
    general,
    home,
    mouseFollow,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources,
  ns: ['general', 'home', 'mouseFollow'],
  defaultNS,
});

i18n.languages = ['en'];

export default i18n;
