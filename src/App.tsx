import * as React from 'react';
import './i18n/config';
import styled from 'styled-components';
import Router from './routes';
import { AppProvider } from './context/AppContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <AppProvider>
      <Wrapper>
        <Router />
      </Wrapper>
    </AppProvider>
  );
}

export default App;
