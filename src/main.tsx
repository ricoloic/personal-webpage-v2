import * as React from 'react';
import { inject } from '@vercel/analytics';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.scss';

if (import.meta.env.PROD) {
  inject();
}

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
