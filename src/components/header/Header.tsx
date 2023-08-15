import React from 'react';
import { useWindowSize } from 'react-use';
import { useApp } from '../../context/AppContext';
import Icon from '../icons';
import Wrapper from './Header.styles';
import { H2 } from '../typography';
import COLORS from '../../constants/colors';

interface Props {
  onOpenMenu: () => void;
}

function Header({ onOpenMenu }: Props) {
  const {
    title,
    theme,
    setTheme,
    edit,
    setIsEditing,
    viewCode,
    setIsViewingCode,
  } = useApp();
  const size = useWindowSize();

  const handleOpenMenu = () => {
    onOpenMenu();
  };

  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleToggleCode = () => {
    setIsViewingCode(true);
  };

  const handleToggleLight = () => {
    setTheme(() => (window.DARK_MODE ? 'light' : 'dark'));
    localStorage.setItem('theme', window.DARK_MODE ? 'light' : 'dark');
    window.DARK_MODE = !window.DARK_MODE;
  };

  return (
    <Wrapper>
      <Icon
        color={COLORS[theme].black}
        fontSize="10xl"
        name="carbon:menu"
        onClick={handleOpenMenu}
      />
      {(viewCode ? size.width > 600 : size.width > 550) && (
        <H2 $fontWeight="400" $fontSize="lg">
          {title}
        </H2>
      )}
      <div style={{ flex: 1 }} />

      <Icon
        name={theme === 'dark' ? 'carbon:light-filled' : 'carbon:light'}
        fontSize="10xl"
        onClick={handleToggleLight}
      />

      {viewCode && (
        <Icon name="carbon:code" fontSize="10xl" onClick={handleToggleCode} />
      )}
      {edit && (
        <Icon fontSize="10xl" name="carbon:edit" onClick={handleToggleEdit} />
      )}
    </Wrapper>
  );
}

export default Header;
