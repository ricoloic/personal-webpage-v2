import React from 'react';
import { useWindowSize } from 'react-use';
import { useApp } from '../../context/AppContext';
import Icon from '../icons';
import Wrapper from './Header.styles';
import { H2 } from '../typography';

interface Props {
  onOpenMenu: () => void;
}

function Header({ onOpenMenu }: Props) {
  const { title, edit, setIsEditing } = useApp();
  const size = useWindowSize();

  const handleOpenMenu = () => {
    onOpenMenu();
  };

  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <Wrapper>
      <Icon fontSize="10xl" name="carbon:menu" onClick={handleOpenMenu} />
      {size.width > 460 && (
        <H2 $fontWeight="400" $fontSize="lg">
          {title}
        </H2>
      )}
      <div style={{ flex: 1 }} />
      {edit && (
        <Icon fontSize="10xl" name="carbon:edit" onClick={handleToggleEdit} />
      )}
    </Wrapper>
  );
}

export default Header;
