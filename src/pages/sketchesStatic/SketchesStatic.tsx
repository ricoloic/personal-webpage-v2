import React from 'react';
import { useTranslation } from 'react-i18next';
import MaxWidthContainer from '../../components/maxWidthContainer';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import ROUTES from '../../routes/constants';
import timesTablePreview from '../../assets/previews/times-table-preview.png';
import chaosGamePreview from '../../assets/previews/chaos-game-preview.png';
import maurerRosePreview from '../../assets/previews/maurer-rose-preview.png';
import caveGenerationPreview from '../../assets/previews/cave-generation-preview.png';

export default function SketchesStatic() {
  const { t } = useTranslation('general');
  return (
    <MaxWidthContainer>
      <SketchesGrid>
        <SketchCard to={ROUTES.timesTable} imageUrl={timesTablePreview}>
          {t('sketches.timesTable')}
        </SketchCard>
        <SketchCard to={ROUTES.chaosGame} imageUrl={chaosGamePreview}>
          {t('sketches.chaosGame')}
        </SketchCard>
        <SketchCard to={ROUTES.maurerRose} imageUrl={maurerRosePreview}>
          {t('sketches.maurerRose')}
        </SketchCard>
        <SketchCard to={ROUTES.caveGeneration} imageUrl={caveGenerationPreview}>
          {t('sketches.caveGeneration')}
        </SketchCard>
      </SketchesGrid>
    </MaxWidthContainer>
  );
}
