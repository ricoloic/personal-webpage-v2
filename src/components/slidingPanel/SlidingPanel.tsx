import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import { CssSize, Children } from '../../types';
import {
  Wrapper,
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
  width: CssSize;
  onClickAway?: () => void;
  onClose: () => void;
}

function SlidingPanel({
  children,
  open,
  side,
  width,
  overflow = 'hidden',
  onClickAway = undefined,
  onClose,
}: Props) {
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (onClickAway) onClickAway();
  });

  const calcSide = (() =>
    side === 'left'
      ? { left: '0', right: undefined }
      : { left: undefined, right: '0' })();
  const calcTransformation = (() =>
    side === 'left'
      ? `translate(${open ? '0%' : '-100%'})`
      : `translate(${open ? '0%' : '100%'})`)();

  return (
    <Wrapper
      ref={ref}
      $open={open}
      $right={calcSide.right as CssSize}
      $left={calcSide.left as CssSize}
      width={width}
      transform={calcTransformation}
      overflow={overflow ?? 'hidden'}
    >
      <WrapperContent>
        <div>
          <Icon name="carbon:close-outline" onClick={onClose} fontSize="5xl" />
        </div>
        {children}
      </WrapperContent>
    </Wrapper>
  );
}

SlidingPanel.Content = ContentContainer;

export default SlidingPanel;
