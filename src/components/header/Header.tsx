import React from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../icons';
import Wrapper from './Header.styles';
import { H2 } from '../typography';

interface Props {
  onOpenMenu: () => void;
}

function Header({ onOpenMenu }: Props) {
  const { title, edit, setIsEditing } = useApp();
  const handleOpenMenu = () => {
    onOpenMenu();
  };

  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <Wrapper>
      <Icon fontSize="10xl" name="menu" onClick={handleOpenMenu} />
      <H2 userSelect="none">{title}</H2>
      <div style={{ flex: 1 }} />
      {edit && <Icon fontSize="10xl" name="edit" onClick={handleToggleEdit} />}
    </Wrapper>
  );
}

export default Header;
