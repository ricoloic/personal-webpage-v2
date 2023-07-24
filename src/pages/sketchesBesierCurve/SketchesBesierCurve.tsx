import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import besierQuadraticCurvePreview from '../../assets/previews/besier-quadratic-curve-preview.png';
import besierCubicCurvePreview from '../../assets/previews/besier-cubic-curve-preview.png';

export default function SketchesDynamic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard
          to={ROUTES.besierCubicCurve}
          imageUrl={besierCubicCurvePreview}
        >
          {t('sketches.besierCubicCurve')}
        </SketchCard>
        <SketchCard
          to={ROUTES.besierQuadraticCurve}
          imageUrl={besierQuadraticCurvePreview}
        >
          {t('sketches.besierQuadraticCurve')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
