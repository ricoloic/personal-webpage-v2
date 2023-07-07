import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './mocks/translations/mockI18n';

interface Config {
  routeInitialEntries: string[];
}

/**
 * It replace the render from testing-library. The purpose of this is to be able to add
 * provider or any other components who need to be rendered.
 * @param ui The UI element to render
 * @param config The configuration object
 */
const customRender = (ui: React.ReactElement, config?: Config | undefined) =>
  render(
    <MemoryRouter initialEntries={config && config.routeInitialEntries}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </MemoryRouter>
  );

export * from '@testing-library/react';
export { customRender as render };
