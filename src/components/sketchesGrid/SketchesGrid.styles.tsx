import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SketchCardWrapper = styled(Link)<{ $imageUrl: string }>`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  border-radius: 5px;
  min-height: 350px;
  color: black;
  padding: 15px;
  position: relative;
  font-size: 1.5rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
    transform: scale(0.95);
    transition: all 0.15s ease-in-out;
  }

  & p {
    display: inline-block;
    margin: 0;
    padding: 5px 10px;
    background-color: white;
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
