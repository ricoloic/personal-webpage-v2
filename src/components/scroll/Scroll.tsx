import React, { useState, useEffect, useRef } from 'react';
import useIsOverflow from '../../hooks/useIsOverflow';
import { Children } from '../../types';
import { Wrapper, ContentContainer } from './Scroll.styles';
import AppearanceEffect from '../appearanceEffect/index';
import ButtonContainer from './ButtonContainer';
import Icon from '../icons/Icon';

interface Props {
  children: Children;
}

function Scroll({ children }: Props) {
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const listBottomRef = useRef<HTMLDivElement | null>(null);
  const overflow = useIsOverflow(listContainerRef);
  const [showDownArray, setShowDownArrow] = useState<boolean>(false);
  const [showUpArray, setShowUpArrow] = useState<boolean>(false);

  useEffect(() => {
    if (overflow) setShowDownArrow(true);
  }, [overflow]);

  const handleScroll = () => {
    const isAtBottom =
      listContainerRef.current?.scrollHeight ===
      (listContainerRef.current?.scrollTop as number) +
        (listContainerRef.current?.clientHeight as number);

    setShowDownArrow(!isAtBottom);

    const isAtTop = listContainerRef.current?.scrollTop === 0;
    setShowUpArrow(!isAtTop);
  };

  return (
    <Wrapper>
      {overflow && showUpArray && (
        <ButtonContainer top="-20px">
          <AppearanceEffect>
            <Icon
              name="up"
              fontSize="2xl"
              onClick={() => {
                listContainerRef?.current?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          </AppearanceEffect>
        </ButtonContainer>
      )}
      <ContentContainer ref={listContainerRef} onScroll={handleScroll}>
        {children}
        <div ref={listBottomRef} />
      </ContentContainer>
      {overflow && showDownArray && (
        <ButtonContainer bottom="-20px">
          <AppearanceEffect>
            <Icon
              name="down"
              fontSize="2xl"
              onClick={() => {
                listBottomRef?.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            />
          </AppearanceEffect>
        </ButtonContainer>
      )}
    </Wrapper>
  );
}

export default Scroll;
