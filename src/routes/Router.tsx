import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './constants';
import AppLayout from '../AppLayout';
import Loading from '../components/loading';

const Home = lazy(() => import('../pages/home'));
const Sketches = lazy(() => import('../pages/sketches'));
const MouseFollow = lazy(() => import('../pages/mouseFollow'));
const TimesTable = lazy(() => import('../pages/timesTable'));
const MouseConfetti = lazy(() => import('../pages/mouseConfetti'));
const FlowField = lazy(() => import('../pages/flowField'));
const CircularMotion = lazy(() => import('../pages/circularMotion'));
const ChaosGame = lazy(() => import('../pages/chaosGame'));

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
