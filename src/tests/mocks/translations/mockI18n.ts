import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import general from '../../../i18n/locales/en/general.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['general'],
  defaultNS: 'general',
  debug: false,
  resources: {
    en: {
      general,
    },
  },
});

export default i18n;
