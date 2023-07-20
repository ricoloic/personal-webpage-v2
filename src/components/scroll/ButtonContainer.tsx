import React from 'react';
import { Children, CssSize } from '../../types';
import Wrapper from './ButtonContainer.styles';

interface Props {
  children: Children;
  top?: CssSize;
  bottom?: CssSize;
}

function ButtonContainer({
  children,
  top = undefined,
  bottom = undefined,
}: Props) {
  return (
    <Wrapper $top={top} $bottom={bottom}>
      {children}
    </Wrapper>
  );
}

export default ButtonContainer;
