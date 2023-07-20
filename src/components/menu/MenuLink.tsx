import React from 'react';
import { useTranslation } from 'react-i18next';
import { PagesKeys } from '../../types';
import { ListItem } from '../list';
import Icon from '../icons';

interface Props {
  page: PagesKeys;
  currentPage: PagesKeys;
  paddingLeft?: boolean;
  onClick: (pageKey: PagesKeys) => () => void;
}

function MenuLink({ page, currentPage, paddingLeft = false, onClick }: Props) {
  const { t } = useTranslation('general', { keyPrefix: 'pages' });
  return (
    <ListItem
      $zoom
      $leftPadding={paddingLeft}
      onClick={onClick(page)}
      fontSize="xl"
    >
      {page === currentPage && <Icon name="cornerDownRight" fontSize="2xl" />}
      <div>{t(page)}</div>
    </ListItem>
  );
}

export default MenuLink;
