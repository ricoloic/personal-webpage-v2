import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import general from './locales/en/general.json';
import home from './locales/en/home.json';
import sketches from './locales/en/sketches.json';
import mouseFollow from './locales/en/mouseFollow.json';
import mouseConfetti from './locales/en/mouseConfetti.json';
import flowField from './locales/en/flowField.json';
import circularMotion from './locales/en/circularMotion.json';
import timesTable from './locales/en/timesTable.json';
import chaosGame from './locales/en/chaosGame.json';

export const defaultNS = 'general';
export const resources = {
  en: {
    general,
    home,
    sketches,
    mouseFollow,
    mouseConfetti,
    flowField,
    circularMotion,
    timesTable,
    chaosGame,
  },
} as const;
export const namespaces = [
  'general',
  'home',
  'sketches',
  'mouseFollow',
  'mouseConfetti',
  'flowField',
  'circularMotion',
  'timesTable',
  'chaosGame',
];

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources,
  ns: namespaces,
  react: {},
  defaultNS,
});

i18n.languages = ['en'];

export default i18n;
