import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { useApp } from '../../context/AppContext';
import Icon from '../icons';
import Wrapper from './Header.styles';
import { H2 } from '../typography';

interface Props {
  onOpenMenu: () => void;
}

function Header({ onOpenMenu }: Props) {
  const { title, edit, setIsEditing, page } = useApp();
  const navigate = useNavigate();
  const size = useWindowSize();

  const handleOpenMenu = () => {
    onOpenMenu();
  };

  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Icon fontSize="10xl" name="menu" onClick={handleOpenMenu} />
      {size.width > 500 && page !== 'home' && (
        <Icon fontSize="10xl" name="left" onClick={handleGoBack} />
      )}
      {size.width > 460 && <H2 $userSelect="none">{title}</H2>}
      <div style={{ flex: 1 }} />
      {edit && <Icon fontSize="10xl" name="edit" onClick={handleToggleEdit} />}
    </Wrapper>
  );
}

export default Header;
