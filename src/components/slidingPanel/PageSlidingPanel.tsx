import React, { useRef } from 'react';
import styled from 'styled-components';
import { Children } from '../../types';
import { WrapperContent } from './SlidingPanel.styles';
import Icon from '../icons';

const Wrapper = styled.div<{ transform: string }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform: ${({ transform }) => transform};
  transition: 0.3s ease-out;
  overflow-y: hidden;
  overflow-x: auto;
  z-index: 999;
  background-color: ${({ theme }) => theme.white};

  & pre {
    margin: 0;
  }
`;

const WrapperIcon = styled.div`
  position: fixed;
  right: 20px;
  z-index: 999;
  * {
    color: white !important;
  }
`;

interface Props {
  children: Children;
  open: boolean;
  onClose?: () => void;
}

function PageSlidingPanel({ children, open, onClose }: Props) {
  const ref = useRef(null);

  const calcTransformation = `translateY(${open ? '0%' : '-100%'})`;

  return (
    <Wrapper ref={ref} transform={calcTransformation}>
      <WrapperContent>
        <WrapperIcon>
          <Icon name="carbon:close-outline" onClick={onClose} fontSize="5xl" />
        </WrapperIcon>
        {children}
      </WrapperContent>
    </Wrapper>
  );
}

export default PageSlidingPanel;
