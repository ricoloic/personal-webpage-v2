import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: 25%;
  background-color: hsl(209, 65%, 59%);
  border-radius: 4px;
  height: 192px;
  padding: 32px;
  margin-top: 32px;
`;

export const Link = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.div`
  font-size: 1.5rem;
`;

export const Description = styled.div`
  font-size: 1.2rem;
`;
