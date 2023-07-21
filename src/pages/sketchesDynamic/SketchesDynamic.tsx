import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';

export default function SketchesDynamic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard to={ROUTES.flowField} imageUrl={flowFieldPreview}>
          {t('sketches.flowField')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
