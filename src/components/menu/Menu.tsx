import React from 'react';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../constants/colors';
import SlidingPanel from '../slidingPanel/index';
import Scroll from '../scroll';
import List from '../list/index';
import { RoutesKeys } from '../../routes/types';
import ROUTES from '../../routes/constants';
import { useApp } from '../../context/AppContext';
import MenuLink from './MenuLink';
import { PagesKeys } from '../../types';

const sketches = (
  [
    'pong',
    'blackHole',
    'besierCubicCurve',
    'besierQuadraticCurve',
    'caveGeneration',
    'mouseFollow',
    'mouseConfetti',
    'circularMotion',
    'flocking',
    'flowField',
    'timesTable',
    'chaosGame',
    'maurerRose',
    'metaBalls',
    'rayCasting',
    'mazeGeneration',
  ] as PagesKeys[]
).sort();

interface Props {
  open: boolean;
  onClose: () => void;
}

function Menu({ open, onClose }: Props) {
  const { page, theme } = useApp();
  const navigate = useNavigate();

  const handlePageChange = (pageKey: RoutesKeys) => () => {
    navigate(ROUTES[pageKey]);
  };

  return (
    <SlidingPanel
      open={open}
      width="320px"
      side="left"
      onClickAway={onClose}
      onClose={onClose}
    >
      <Scroll>
        <List color={COLORS[theme].white}>
          <MenuLink page="home" currentPage={page} onClick={handlePageChange} />
          <MenuLink
            page="sketches"
            currentPage={page}
            onClick={handlePageChange}
          />
          {sketches.map((pageName) => (
            <MenuLink
              key={pageName}
              paddingLeft
              page={pageName}
              currentPage={page}
              onClick={handlePageChange}
            />
          ))}
        </List>
      </Scroll>
    </SlidingPanel>
  );
}

export default Menu;
