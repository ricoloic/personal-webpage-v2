import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../constants/colors';
import SlidingPanel from '../slidingPanel/index';
import Scroll from '../scroll';
import List, { ListItem } from '../list/index';
import { RoutesKeys } from '../../routes/types';
import ROUTES from '../../routes/constants';

interface Props {
  open: boolean;
  onClose: () => void;
}

function Menu({ open, onClose }: Props) {
  const { t } = useTranslation('general');
  const navigate = useNavigate();

  const handlePageChange = (page: RoutesKeys) => () => {
    navigate(ROUTES[page]);
    onClose();
  };

  return (
    <SlidingPanel
      backgroundColor={COLORS.blue800}
      open={open}
      width="250px"
      side="left"
      onClickAway={onClose}
      onClose={onClose}
    >
      <Scroll>
        <List color={COLORS.white}>
          <ListItem $zoom onClick={handlePageChange('home')} fontSize="xl">
            {t('pages.home')}
          </ListItem>
          <ListItem
            $zoom
            onClick={handlePageChange('mouseFollow')}
            fontSize="xl"
          >
            {t('pages.mouseFollow')}
          </ListItem>
          <ListItem
            $zoom
            onClick={handlePageChange('mouseConfetti')}
            fontSize="xl"
          >
            {t('pages.mouseConfetti')}
          </ListItem>
          <ListItem $zoom onClick={handlePageChange('flowField')} fontSize="xl">
            {t('pages.flowField')}
          </ListItem>
        </List>
      </Scroll>
    </SlidingPanel>
  );
}

export default Menu;
