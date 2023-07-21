import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './constants';
import AppLayout from '../AppLayout';
import Loading from '../components/loading';

const SketchesStatic = lazy(() => import('../pages/sketchesStatic'));
const SketchesDynamic = lazy(() => import('../pages/sketchesDynamic'));
const SketchesMouseMovement = lazy(
  () => import('../pages/sketchesMouseMovement')
);
const Home = lazy(() => import('../pages/home'));
const Sketches = lazy(() => import('../pages/sketches'));
const MouseFollow = lazy(() => import('../pages/mouseFollow'));
const TimesTable = lazy(() => import('../pages/timesTable'));
const MouseConfetti = lazy(() => import('../pages/mouseConfetti'));
const FlowField = lazy(() => import('../pages/flowField'));
const CircularMotion = lazy(() => import('../pages/circularMotion'));
const ChaosGame = lazy(() => import('../pages/chaosGame'));
const MaurerRose = lazy(() => import('../pages/maurerRose'));

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
