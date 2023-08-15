import styled from 'styled-components';

export const Wrapper = styled.div`
  position: sticky;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
`;

export default Wrapper;
