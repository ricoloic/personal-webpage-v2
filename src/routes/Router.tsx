import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MouseFollow from '../pages/mouseFollow';
import Home from '../pages/home';
import ROUTES from './constants';
import AppLayout from '../AppLayout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={`${ROUTES.home}/*`} element={<Home />} />
          <Route path={`${ROUTES.mouseFollow}/*`} element={<MouseFollow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
