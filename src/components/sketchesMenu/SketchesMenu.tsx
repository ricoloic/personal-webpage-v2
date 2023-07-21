import React from 'react';
import { useTranslation } from 'react-i18next';
import SketchesGrid, { Card, SketchCard } from '../sketchesGrid';
import ROUTES from '../../routes/constants';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';
import timesTablePreview from '../../assets/previews/times-table-preview.png';
import chaosGamePreview from '../../assets/previews/chaos-game-preview.png';
import maurerRosePreview from '../../assets/previews/maurer-rose-preview.png';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import flockingPreview from '../../assets/previews/flocking-preview.png';

export default function SketchesMenu() {
  const { t } = useTranslation('general');

  return (
    <SketchesGrid>
      <SketchCard to={ROUTES.mouseFollow} imageUrl={mouseFollowPreview}>
        {t('sketches.mouseFollow')}
      </SketchCard>
      <Card
        to={ROUTES.sketchesMouseMovement}
        title={t('pages.sketchesMouseMovement')}
        subtitle={t('pages.sketchesMouseMovementDescription')}
      />
      <SketchCard to={ROUTES.mouseConfetti} imageUrl={mouseConfettiPreview}>
        {t('sketches.mouseConfetti')}
      </SketchCard>
      <Card
        to={ROUTES.sketchesStatic}
        title={t('pages.sketchesStatic')}
        subtitle={t('pages.sketchesStaticDescription')}
      />
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
      <Card
        to={ROUTES.sketchesDynamic}
        title={t('pages.sketchesDynamic')}
        subtitle={t('pages.sketchesDynamicDescription')}
      />
      <SketchCard to={ROUTES.flowField} imageUrl={flowFieldPreview}>
        {t('sketches.flowField')}
      </SketchCard>
      <SketchCard to={ROUTES.flocking} imageUrl={flockingPreview}>
        {t('sketches.flocking')}
      </SketchCard>
    </SketchesGrid>
  );
}
