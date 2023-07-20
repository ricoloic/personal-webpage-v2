import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import { CssSize, Children, Colors } from '../../types';
import {
  Wrapper,
  CloseContainer,
  ContentContainer,
  WrapperContent,
} from './SlidingPanel.styles';
import Icon from '../icons';

type Side = 'left' | 'right';

type Overflow = 'scroll' | 'hidden' | 'auto';

interface Props {
  children: Children;
  open: boolean;
  side: Side;
  overflow?: Overflow;
  backgroundColor: Colors;
  width: CssSize;
  onClickAway?: () => void;
  onClose: () => void;
}

function SlidingPanel({
  children,
  open,
  side,
  width,
  backgroundColor,
  overflow = 'hidden',
  onClickAway = undefined,
  onClose,
}: Props) {
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (onClickAway) onClickAway();
  });

  const calcSide = (() => (side === 'left' ? { left: '0' } : { right: '0' }))();
  const calcTransformation = (() =>
    side === 'left'
      ? `translate(${open ? '0%' : '-100%'})`
      : `translate(${open ? '0%' : '100%'})`)();

  return (
    <Wrapper
      ref={ref}
      $open={open}
      right={calcSide.right as CssSize | undefined}
      left={calcSide.left as CssSize | undefined}
      width={width}
      transform={calcTransformation}
      background={backgroundColor}
      overflow={overflow}
    >
      <WrapperContent>
        <CloseContainer>
          <Icon name="close" onClick={onClose} fontSize="5xl" />
        </CloseContainer>
        {children}
      </WrapperContent>
    </Wrapper>
  );
}

SlidingPanel.Content = ContentContainer;

export default SlidingPanel;
