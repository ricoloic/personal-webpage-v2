import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import flockingPreview from '../../assets/previews/flocking-preview.png';
import blackHolePreview from '../../assets/previews/black-hole-preview.png';

export default function SketchesDynamic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard to={ROUTES.flowField} imageUrl={flowFieldPreview}>
          {t('sketches.flowField')}
        </SketchCard>
        <SketchCard to={ROUTES.flocking} imageUrl={flockingPreview}>
          {t('sketches.flocking')}
        </SketchCard>
        <SketchCard to={ROUTES.blackHole} imageUrl={blackHolePreview}>
          {t('sketches.blackHole')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
