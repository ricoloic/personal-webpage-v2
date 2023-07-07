import React from 'react';
import COLORS from '../../constants/colors';
import SlidingPanel from '../slidingPanel/index';
import { Wrapper, CloseContainer } from './Menu.styles';
import Scroll from '../scroll/Scroll';
import List from '../list/index';
import Icon from '../icons/Icon';

interface Props {
  open: boolean;
  onClose: () => void;
}

function Menu({ open, onClose }: Props) {
  return (
    <SlidingPanel
      backgroundColor={COLORS.blue800}
      open={open}
      width="250px"
      side="left"
    >
      <Wrapper>
        <CloseContainer>
          <Icon name="close" onClick={onClose} fontSize="5xl" />
        </CloseContainer>
        <Scroll>
          <List color={COLORS.white}>
            <List.Item onClick={() => null} fontSize="xl">
              Test
            </List.Item>
            <List.Item onClick={() => null} fontSize="xl" leftPadding>
              Test
            </List.Item>
            <List.Item onClick={() => null} fontSize="xl">
              Test
            </List.Item>
            <List.Item onClick={() => null} fontSize="xl">
              Test
            </List.Item>
            <List.Item onClick={() => null} fontSize="xl">
              Test
            </List.Item>
          </List>
        </Scroll>
      </Wrapper>
    </SlidingPanel>
  );
}

export default Menu;
