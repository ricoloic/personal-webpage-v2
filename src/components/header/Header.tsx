import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { useApp } from '../../context/AppContext';
import Icon from '../icons';
import Wrapper from './Header.styles';
import { H2 } from '../typography';
import PAGES from '../../constants/pages';

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

  const handleGoToHome = () => {
    navigate(PAGES.home);
  };

  return (
    <Wrapper>
      <Icon fontSize="10xl" name="menu" onClick={handleOpenMenu} />
      {size.width > 500 && page !== 'home' && (
        <Icon fontSize="10xl" name="home" onClick={handleGoToHome} />
      )}
      {size.width > 400 && <H2 $userSelect="none">{title}</H2>}
      <div style={{ flex: 1 }} />
      {edit && <Icon fontSize="10xl" name="edit" onClick={handleToggleEdit} />}
    </Wrapper>
  );
}

export default Header;
