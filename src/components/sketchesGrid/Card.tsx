import React from 'react';
import { CardWrapper } from './SketchesGrid.styles';
import { H3 } from '../typography';

interface Props {
  title: string;
  subtitle: string;
  to: string;
}

function Card({ title, subtitle, to }: Props) {
  return (
    <CardWrapper to={to}>
      <div>
        <H3 $fontSize="2xl">{title}</H3>
        <p>{subtitle}</p>
      </div>
    </CardWrapper>
  );
}

export default Card;
