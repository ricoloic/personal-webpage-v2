import React from 'react';
import { CssSize, Children, Colors } from '../../types';
import Wrapper from './SlidingPanel.styles';

type Side = 'left' | 'right';

type Overflow = 'scroll' | 'hidden' | 'auto';

interface Props {
  children: Children;
  open: boolean;
  side: Side;
  overflow?: Overflow;
  backgroundColor: Colors;
  width: CssSize;
}

function SlidingPanel({
  children,
  open,
  side,
  width,
  backgroundColor,
  overflow = 'hidden',
}: Props) {
  const calcSide = (() => (side === 'left' ? { left: '0' } : { right: '0' }))();
  const calcTransformation = (() =>
    side === 'left'
      ? `translate(${open ? '0%' : '-100%'})`
      : `translate(${open ? '0%' : '100%'})`)();

  return (
    <Wrapper
      right={calcSide.right as CssSize | undefined}
      left={calcSide.left as CssSize | undefined}
      width={width}
      transform={calcTransformation}
      background={backgroundColor}
      overflow={overflow}
    >
      {children}
    </Wrapper>
  );
}

export default SlidingPanel;
