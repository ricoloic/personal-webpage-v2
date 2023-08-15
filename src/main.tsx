import * as React from 'react';
import { inject } from '@vercel/analytics';
import { createRoot } from 'react-dom/client';
import App from './App';
import './main.scss';

if (import.meta.env.PROD) {
  inject();
}

declare global {
  interface Window {
    DARK_MODE: boolean;
  }
}

window.DARK_MODE = localStorage.getItem('theme') === 'dark';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
