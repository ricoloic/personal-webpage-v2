import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './constants';
import AppLayout from '../AppLayout';
import Home from '../pages/home';
import MouseFollow from '../pages/mouseFollow';
import MouseConfetti from '../pages/mouseConfetti';
import FlowField from '../pages/flowField';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="*" element={<Home />} />
          <Route path={`${ROUTES.home}/*`} element={<Home />} />
          <Route path={`${ROUTES.mouseFollow}/*`} element={<MouseFollow />} />
          <Route
            path={`${ROUTES.mouseConfetti}/*`}
            element={<MouseConfetti />}
          />
          <Route path={`${ROUTES.flowField}/*`} element={<FlowField />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
