import React from 'react';
import { useTranslation } from 'react-i18next';
import SketchesGrid, { SketchCard } from '../sketchesGrid';
import ROUTES from '../../routes/constants';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';
import timesTablePreview from '../../assets/previews/times-table-preview.png';
import chaosGamePreview from '../../assets/previews/chaos-game-preview.png';
import maurerRosePreview from '../../assets/previews/maurer-rose-preview.png';

function SketchesMenu() {
  const { t } = useTranslation('general');

  return (
    <SketchesGrid>
      <SketchCard to={ROUTES.mouseFollow} imageUrl={mouseFollowPreview}>
        {t('sketches.mouseFollow')}
      </SketchCard>
      <SketchCard to={ROUTES.mouseConfetti} imageUrl={mouseConfettiPreview}>
        {t('sketches.mouseConfetti')}
      </SketchCard>
      <SketchCard to={ROUTES.flowField} imageUrl={flowFieldPreview}>
        {t('sketches.flowField')}
      </SketchCard>
      <SketchCard to={ROUTES.circularMotion} imageUrl={circularMotionPreview}>
        {t('sketches.circularMotion')}
      </SketchCard>
      <SketchCard to={ROUTES.timesTable} imageUrl={timesTablePreview}>
        {t('sketches.timesTable')}
      </SketchCard>
      <SketchCard to={ROUTES.chaosGame} imageUrl={chaosGamePreview}>
        {t('sketches.chaosGame')}
      </SketchCard>
      <SketchCard to={ROUTES.maurerRose} imageUrl={maurerRosePreview}>
        {t('sketches.maurerRose')}
      </SketchCard>
    </SketchesGrid>
  );
}

export default SketchesMenu;
