import React, { useState, useEffect, useRef } from 'react';
import useIsOverflow from '../../hooks/useIsOverflow';
import { Children } from '../../types';
import { Wrapper, ContentContainer } from './Scroll.styles';
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
        <ButtonContainer top="-30px">
          <Icon
            name="carbon:arrow-up"
            fontSize="2xl"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              listContainerRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              } as ScrollToOptions);
            }}
          />
        </ButtonContainer>
      )}
      <ContentContainer ref={listContainerRef} onScroll={handleScroll}>
        {children}
        <div ref={listBottomRef} />
      </ContentContainer>
      {overflow && showDownArray && (
        <ButtonContainer bottom="-35px">
          <Icon
            name="carbon:arrow-down"
            fontSize="2xl"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              listBottomRef?.current?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          />
        </ButtonContainer>
      )}
    </Wrapper>
  );
}

export default Scroll;
