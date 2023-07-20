import styled from 'styled-components';

export const AboutContainer = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr min(1200px, 100%) 1fr;
`;

export const AboutContent = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  margin: auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;
  grid-column: 2;
  align-items: center;

  @media (min-width: 775px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const AboutTopContent = styled.div`
  @media (min-width: 775px) {
    grid-column: span 2;
  }
`;

export const AboutBottomContent = styled.div`
  @media (min-width: 775px) {
    grid-column: span 3;
  }
`;

export const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  border-radius: 50%;
  aspect-ratio: 1;
  margin: auto;
`;

export const Description = styled.p`
  margin-left: 20px;
  margin-top: 10px;
  line-height: 1.3;
`;

export const LinkElement = styled.a`
  font-weight: bold;
  text-decoration: underline;
`;
