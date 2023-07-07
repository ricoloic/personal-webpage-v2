import * as React from 'react';
import './i18n/config';
import styled from 'styled-components';
import Router from './routes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
}

export default App;
