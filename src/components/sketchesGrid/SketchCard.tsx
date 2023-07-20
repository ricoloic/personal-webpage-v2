import React from 'react';
import { Children } from '../../types';
import { SketchCardWrapper } from './SketchesGrid.styles';

interface Props {
  children: Children;
  to: string;
  imageUrl: string;
}

function SketchCard({ children, to, imageUrl }: Props) {
  return (
    <SketchCardWrapper to={to} $imageUrl={imageUrl}>
      <p>{children}</p>
    </SketchCardWrapper>
  );
}

export default SketchCard;
