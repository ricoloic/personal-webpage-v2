import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 3rem;
  text-align: center;
`;

export const Features = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 1px;
  margin-top: -32px;
  width: 100%;
`;

export const SectionContainer = styled.div`
  width: 100%;
`;

export const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
