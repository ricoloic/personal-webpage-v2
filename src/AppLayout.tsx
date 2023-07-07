import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './components/menu/Menu';
import Header from './components/header';
import COLORS from './constants/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${COLORS.gray100};
`;

function AppLayout() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  return (
    <>
      <Menu open={openMenu} onClose={handleCloseMenu} />
      <Header onOpenMenu={handleOpenMenu} />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
}

export default AppLayout;
