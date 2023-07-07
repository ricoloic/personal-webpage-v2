import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 64px;
`;

export const TitleContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  position: absolute;
  width: fit-content;
  left: 0;
  right: 0;
  margin: auto;
  background-color: hsl(0, 0%, 0%);
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  font-size: 1.5rem;
`;

export const Divider = styled.div`
  position: relative;
  top: 32px;
  width: 100%;
  height: 2px;
  background-color: hsl(0, 0%, 100%);
`;
