import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './components/menu/Menu';
import Button from './components/button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function AppLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
      <Button name="menu" onClick={() => setOpenMenu(true)}>
        click me
      </Button>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
}

export default AppLayout;
