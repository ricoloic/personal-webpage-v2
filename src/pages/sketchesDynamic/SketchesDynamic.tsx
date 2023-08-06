import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import flockingPreview from '../../assets/previews/flocking-preview.png';
import blackHolePreview from '../../assets/previews/black-hole-preview.png';
import pongPreview from '../../assets/previews/pong-preview.png';
import flowFieldGif from '../../assets/gifs/flow-field-gif.gif';
import flockingGif from '../../assets/gifs/flocking-gif.gif';
import blackHoleGif from '../../assets/gifs/black-hole-gif.gif';
import metaBallsPreview from '../../assets/previews/meta-balls-preview.png';
import metaBallsGif from '../../assets/gifs/meta-balls-gif.gif';

export default function SketchesDynamic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard
          to={ROUTES.flowField}
          imageUrl={flowFieldPreview}
          gifUrl={flowFieldGif}
        >
          {t('sketches.flowField')}
        </SketchCard>
        <SketchCard
          to={ROUTES.metaBalls}
          imageUrl={metaBallsPreview}
          gifUrl={metaBallsGif}
        >
          {t('sketches.metaBalls')}
        </SketchCard>
        <SketchCard to={ROUTES.pong} imageUrl={pongPreview}>
          {t('sketches.pong')}
        </SketchCard>
        <SketchCard
          to={ROUTES.flocking}
          imageUrl={flockingPreview}
          gifUrl={flockingGif}
        >
          {t('sketches.flocking')}
        </SketchCard>
        <SketchCard
          to={ROUTES.blackHole}
          imageUrl={blackHolePreview}
          gifUrl={blackHoleGif}
        >
          {t('sketches.blackHole')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
