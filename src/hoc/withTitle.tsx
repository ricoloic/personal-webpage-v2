import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Pages } from '../types';

export default function withTitle(page: Pages) {
  return (Component: ComponentType<unknown>) => {
    return () => {
      const { t } = useTranslation('general', { keyPrefix: 'pages' });
      const { setTitle } = useApp();

      const title = t(`${page}`) as string;

      useEffect(() => {
        setTitle(title);
      }, [setTitle, title]);

      document.title = title;

      return <Component />;
    };
  };
}
