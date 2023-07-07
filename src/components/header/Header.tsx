import React from 'react';
import Icon from '../icons';
import Wrapper from './Header.styles';

interface Props {
  onOpenMenu: () => void;
}

function Header({ onOpenMenu }: Props) {
  const handleOpenMenu = () => {
    onOpenMenu();
  };

  return (
    <Wrapper>
      <Icon fontSize="10xl" name="menu" onClick={handleOpenMenu} />
    </Wrapper>
  );
}

export default Header;
