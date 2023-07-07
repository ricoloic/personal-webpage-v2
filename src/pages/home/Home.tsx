import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './Home.styles';

export default function Home() {
  const { t } = useTranslation('general');
  return <Container />;
}
