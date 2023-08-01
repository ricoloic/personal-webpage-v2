import React from 'react';
import { useTranslation } from 'react-i18next';
import { H3 } from '../typography';
import { Children } from '../../types';

interface ElementProps {
  title: Children;
  href: string;
}

function Element({ href, title }: ElementProps) {
  return (
    <p>
      <a href={href} target="_blank" rel="noreferrer">
        {title}
      </a>
    </p>
  );
}

interface Props {
  children: Children;
}

function References({ children }: Props) {
  const { t } = useTranslation('general');
  return (
    <div>
      <H3>{t('references')}</H3>
      {children}
    </div>
  );
}

References.Element = Element;

export default References;
