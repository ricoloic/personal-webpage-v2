import React from 'react';
import { useTranslation } from 'react-i18next';
import { H3 } from '../typography';
import { Children } from '../../types';
import ReferencesWrapper from './References.styles';

interface ElementProps {
  title: Children;
  href: string;
}

function Element({ href, title }: ElementProps) {
  return (
    <div>
      <a href={href} target="_blank" rel="noreferrer">
        {title}
      </a>
    </div>
  );
}

interface Props {
  children: Children;
}

function References({ children }: Props) {
  const { t } = useTranslation('general');
  return (
    <ReferencesWrapper>
      <H3>{t('references')}</H3>
      {children}
    </ReferencesWrapper>
  );
}

References.Element = Element;

export default References;
