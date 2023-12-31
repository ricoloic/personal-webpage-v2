import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardWrapper = styled(Link)`
  background: ${({ theme }) => theme.black};
  border-radius: 5px;
  min-height: 350px;
  color: ${({ theme }) => theme.black};
  padding: 15px;
  position: relative;
  font-size: 1.5rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    text-decoration: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
    transform: scale(0.95);
    transition: all 0.15s ease-in-out;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 5px 10px;

    &:hover h3 {
      text-decoration: underline;
    }

    & h3 {
      width: fit-content;
      margin: 0;
      padding: 5px 10px;
      background-color: ${({ theme }) => theme.white};
    }

    & p {
      width: fit-content;
      background-color: ${({ theme }) => theme.white};
      padding: 5px 10px;
      font-size: 20px;
      margin: 0;
    }
  }
`;

export const SketchCardWrapper = styled(Link)<{
  $imageUrl: string;
  $gifUrl?: string;
}>`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  border-radius: 5px;
  min-height: 350px;
  color: ${({ theme }) => theme.black};
  padding: 15px;
  position: relative;
  font-size: 1.5rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    ${({ $gifUrl }) =>
      $gifUrl ? `background-image: url(${$gifUrl});` : undefined}

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
    transform: scale(0.95);
    transition: all 0.15s ease-in-out;
  }

  & p {
    display: inline-block;
    margin: 0;
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.white};
  }
`;

export const SketchesGridWrapper = styled.div`
  padding: 50px;
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
