import React from 'react';
import { useTranslation } from 'react-i18next';
import SketchesGrid, { Card, SketchCard } from '../sketchesGrid';
import ROUTES from '../../routes/constants';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseFollowGif from '../../assets/gifs/mouse-follow-gif.gif';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import mouseConfettiGif from '../../assets/gifs/mouse-confetti-gif.gif';
import caveGenerationPreview from '../../assets/previews/cave-generation-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';
import circularMotionGif from '../../assets/gifs/circular-motion-gif.gif';
import timesTablePreview from '../../assets/previews/times-table-preview.png';
import chaosGamePreview from '../../assets/previews/chaos-game-preview.png';
import maurerRosePreview from '../../assets/previews/maurer-rose-preview.png';
import maurerRoseGif from '../../assets/gifs/maurer-rose-gif.gif';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import flowFieldGif from '../../assets/gifs/flow-field-gif.gif';
import flockingPreview from '../../assets/previews/flocking-preview.png';
import flockingGif from '../../assets/gifs/flocking-gif.gif';
import besierQuadraticCurvePreview from '../../assets/previews/besier-quadratic-curve-preview.png';
import besierQuadraticCurveGif from '../../assets/gifs/besier-quadratic-curve-gif.gif';
import besierCubicCurvePreview from '../../assets/previews/besier-cubic-curve-preview.png';
import besierCubicCurveGif from '../../assets/gifs/besier-cubic-curve-gif.gif';
import blackHolePreview from '../../assets/previews/black-hole-preview.png';
import blackHoleGif from '../../assets/gifs/black-hole-gif.gif';
import pongPreview from '../../assets/previews/pong-preview.png';
import metaBallsPreview from '../../assets/previews/meta-balls-preview.png';
import metaBallsGif from '../../assets/gifs/meta-balls-gif.gif';
import rayCastingPreview from '../../assets/previews/ray-casting-preview.png';
import rayCastingGif from '../../assets/gifs/ray-casting-gif.gif';
import mazeGenerationPreview from '../../assets/previews/maze-generation-preview.png';
import mazeGenerationGif from '../../assets/gifs/maze-generation-gif.gif';

export default function SketchesMenu() {
  const { t } = useTranslation('general');

  return (
    <SketchesGrid>
      <Card
        to={ROUTES.sketchesMouseMovement}
        title={t('pages.sketchesMouseMovement')}
        subtitle={t('pages.sketchesMouseMovementDescription')}
      />
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
      <Card
        to={ROUTES.sketchesStatic}
        title={t('pages.sketchesStatic')}
        subtitle={t('pages.sketchesStaticDescription')}
      />
      <SketchCard to={ROUTES.timesTable} imageUrl={timesTablePreview}>
        {t('sketches.timesTable')}
      </SketchCard>
      <SketchCard to={ROUTES.chaosGame} imageUrl={chaosGamePreview}>
        {t('sketches.chaosGame')}
      </SketchCard>
      <SketchCard to={ROUTES.caveGeneration} imageUrl={caveGenerationPreview}>
        {t('sketches.caveGeneration')}
      </SketchCard>
      <SketchCard
        to={ROUTES.maurerRose}
        imageUrl={maurerRosePreview}
        gifUrl={maurerRoseGif}
      >
        {t('sketches.maurerRose')}
      </SketchCard>
      <Card
        to={ROUTES.sketchesDynamic}
        title={t('pages.sketchesDynamic')}
        subtitle={t('pages.sketchesDynamicDescription')}
      />
      <SketchCard
        to={ROUTES.flowField}
        imageUrl={flowFieldPreview}
        gifUrl={flowFieldGif}
      >
        {t('sketches.flowField')}
      </SketchCard>
      <SketchCard
        to={ROUTES.mazeGeneration}
        imageUrl={mazeGenerationPreview}
        gifUrl={mazeGenerationGif}
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
      <Card
        to={ROUTES.sketchesBesierCurve}
        title={t('pages.sketchesBesierCurve')}
        subtitle={t('pages.sketchesBesierCurveDescription')}
      />
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
  );
}
