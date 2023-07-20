import React from 'react';
import styled from 'styled-components';
import { TypographyProps } from './types';
import FONT_SIZE from '../../constants/sizes';

const Element = styled.h3<Omit<TypographyProps, 'children'>>`
  font-size: ${({ fontSize = undefined }) => fontSize && FONT_SIZE[fontSize!]};
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-top: ${({ $my }) => $my};
  margin-bottom: ${({ $my }) => $my};
  user-select: ${({ $userSelect }) => $userSelect};
`;

function H3({
  children,
  fontSize = undefined,
  fontWeight = undefined,
  $my = 0,
  $userSelect = undefined,
}: TypographyProps) {
  return (
    <Element
      $my={$my}
      fontSize={fontSize}
      fontWeight={fontWeight}
      $userSelect={$userSelect}
    >
      {children}
    </Element>
  );
}

export default H3;
