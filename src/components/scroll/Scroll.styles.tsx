import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;
`;

export const ContentContainer = styled.div`
  max-height: 60vh;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  ul {
    margin: 0;
    li {
      margin-top: 2px;
      margin-bottom: 2px;
    }
  }
`;
