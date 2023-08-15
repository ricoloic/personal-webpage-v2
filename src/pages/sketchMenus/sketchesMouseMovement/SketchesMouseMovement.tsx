import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../../components/sketchesGrid';
import ROUTES from '../../../routes/constants';
import mouseFollowPreview from '../../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../../assets/previews/mouse-confetti-preview.png';
import circularMotionPreview from '../../../assets/previews/circular-motion-preview.png';
import mouseFollowGif from '../../../assets/gifs/mouse-follow-gif.gif';
import mouseConfettiGif from '../../../assets/gifs/mouse-confetti-gif.gif';
import circularMotionGif from '../../../assets/gifs/circular-motion-gif.gif';
import rayCastingPreview from '../../../assets/previews/ray-casting-preview.png';
import rayCastingGif from '../../../assets/gifs/ray-casting-gif.gif';

export default function SketchesMouseMovement() {
  const { t } = useTranslation('general');

  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard
          to={ROUTES.mouseFollow}
          imageUrl={mouseFollowPreview}
          gifUrl={mouseFollowGif}
        >
          {t('sketches.mouseFollow')}
        </SketchCard>
        <SketchCard
          to={ROUTES.rayCasting}
          imageUrl={rayCastingPreview}
          gifUrl={rayCastingGif}
        >
          {t('sketches.rayCasting')}
        </SketchCard>
        <SketchCard
          to={ROUTES.mouseConfetti}
          imageUrl={mouseConfettiPreview}
          gifUrl={mouseConfettiGif}
        >
          {t('sketches.mouseConfetti')}
        </SketchCard>
        <SketchCard
          to={ROUTES.circularMotion}
          imageUrl={circularMotionPreview}
          gifUrl={circularMotionGif}
        >
          {t('sketches.circularMotion')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
