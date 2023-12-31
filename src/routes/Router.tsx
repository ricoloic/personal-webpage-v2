import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './constants';
import AppLayout from '../AppLayout';
import Loading from '../components/loading';

const BlackHole = lazy(() => import('../pages/blackHole'));
const FractalTree = lazy(() => import('../pages/fractalTree'));
const BesierCubicCurve = lazy(() => import('../pages/besierCubicCurve'));
const CaveGeneration = lazy(() => import('../pages/caveGeneration'));
const Flocking = lazy(() => import('../pages/flocking'));
const SketchesStatic = lazy(
  () => import('../pages/sketchMenus/sketchesStatic')
);
const SketchesDynamic = lazy(
  () => import('../pages/sketchMenus/sketchesDynamic')
);
const SketchesBesierCurve = lazy(
  () => import('../pages/sketchMenus/sketchesBesierCurve')
);
const SketchesMouseMovement = lazy(
  () => import('../pages/sketchMenus/sketchesMouseMovement')
);
const Home = lazy(() => import('../pages/home'));
const Sketches = lazy(() => import('../pages/sketchMenus/sketches'));
const BesierQuadraticCurve = lazy(
  () => import('../pages/besierQuadraticCurve')
);
const Pong = lazy(() => import('../pages/pong'));
const MouseFollow = lazy(() => import('../pages/mouseFollow'));
const TimesTable = lazy(() => import('../pages/timesTable'));
const MouseConfetti = lazy(() => import('../pages/mouseConfetti'));
const FlowField = lazy(() => import('../pages/flowField'));
const CircularMotion = lazy(() => import('../pages/circularMotion'));
const ChaosGame = lazy(() => import('../pages/chaosGame'));
const MaurerRose = lazy(() => import('../pages/maurerRose'));
const MetaBalls = lazy(() => import('../pages/metaBalls'));
const RayCasting = lazy(() => import('../pages/rayCasting'));
const MazeGeneration = lazy(() => import('../pages/mazeGeneration'));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.home}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.sketches}
            element={
              <Suspense fallback={<Loading />}>
                <Sketches />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.sketchesMouseMovement}
            element={
              <Suspense fallback={<Loading />}>
                <SketchesMouseMovement />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.fractalTree}
            element={
              <Suspense fallback={<Loading />}>
                <FractalTree />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.blackHole}
            element={
              <Suspense fallback={<Loading />}>
                <BlackHole />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.caveGeneration}
            element={
              <Suspense fallback={<Loading />}>
                <CaveGeneration />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.besierCubicCurve}
            element={
              <Suspense fallback={<Loading />}>
                <BesierCubicCurve />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.sketchesBesierCurve}
            element={
              <Suspense fallback={<Loading />}>
                <SketchesBesierCurve />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.sketchesStatic}
            element={
              <Suspense fallback={<Loading />}>
                <SketchesStatic />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.sketchesDynamic}
            element={
              <Suspense fallback={<Loading />}>
                <SketchesDynamic />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.flocking}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <Flocking />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.mazeGeneration}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <MazeGeneration />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.pong}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <Pong />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.rayCasting}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <RayCasting />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.metaBalls}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <MetaBalls />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.besierQuadraticCurve}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <BesierQuadraticCurve />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.mouseFollow}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <MouseFollow />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.timesTable}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <TimesTable />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.mouseConfetti}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <MouseConfetti />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.flowField}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <FlowField />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.circularMotion}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <CircularMotion />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.chaosGame}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <ChaosGame />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.maurerRose}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <MaurerRose />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
