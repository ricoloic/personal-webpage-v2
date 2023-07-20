import React from 'react';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../routes/constants';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';

export default function Sketches() {
  const { t } = useTranslation('sketches');

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
    </SketchesGrid>
  );
}
