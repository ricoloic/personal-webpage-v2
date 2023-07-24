import React, { ComponentType, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { PagesKeys } from '../types';
import PAGES from '../constants/pages';

export default function withTitle(page: PagesKeys) {
  return (Component: ComponentType<unknown>) => {
    return () => {
      const { t } = useTranslation('general', { keyPrefix: 'pages' });
      const { setTitle, setPage } = useApp();

      const title = t(`${PAGES[page]}`) as string;

      useEffect(() => {
        setTitle(title);
        setPage(page);
      }, [setPage, setTitle, title]);

      document.title = title;

      return <Component />;
    };
  };
}
