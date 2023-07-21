import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';

export default function SketchesMouseMovement() {
  const { t } = useTranslation('general');

  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard to={ROUTES.mouseFollow} imageUrl={mouseFollowPreview}>
          {t('sketches.mouseFollow')}
        </SketchCard>
        <SketchCard to={ROUTES.mouseConfetti} imageUrl={mouseConfettiPreview}>
          {t('sketches.mouseConfetti')}
        </SketchCard>
        <SketchCard to={ROUTES.circularMotion} imageUrl={circularMotionPreview}>
          {t('sketches.circularMotion')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
