import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from './index';
import Icon from '../icons';

interface Props {
  onClick: () => void;
}

export default function ViewCodeButton({ onClick }: Props) {
  const { t } = useTranslation('general');

  return (
    <Button
      name="viewCode"
      icon={<Icon name="carbon:code" fontSize="2xl" />}
      onClick={onClick}
    >
      {t('buttons.viewCode')}
    </Button>
  );
}
