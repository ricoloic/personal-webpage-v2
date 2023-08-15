import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../../components/sketchesGrid';
import ROUTES from '../../../routes/constants';
import besierQuadraticCurvePreview from '../../../assets/previews/besier-quadratic-curve-preview.png';
import besierCubicCurvePreview from '../../../assets/previews/besier-cubic-curve-preview.png';
import besierQuadraticCurveGif from '../../../assets/gifs/besier-quadratic-curve-gif.gif';
import besierCubicCurveGif from '../../../assets/gifs/besier-cubic-curve-gif.gif';

export default function SketchesDynamic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard
          to={ROUTES.besierQuadraticCurve}
          imageUrl={besierQuadraticCurvePreview}
          gifUrl={besierQuadraticCurveGif}
        >
          {t('sketches.besierQuadraticCurve')}
        </SketchCard>
        <SketchCard
          to={ROUTES.besierCubicCurve}
          imageUrl={besierCubicCurvePreview}
          gifUrl={besierCubicCurveGif}
        >
          {t('sketches.besierCubicCurve')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
