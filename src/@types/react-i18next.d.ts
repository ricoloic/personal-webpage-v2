import React from 'react';
import { resources, defaultNS } from '../i18n/config';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
  interface I18nextProviderProps {
    children: React.ReactElement;
  }
}
