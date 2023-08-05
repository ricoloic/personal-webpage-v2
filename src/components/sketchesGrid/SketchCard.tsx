import React from 'react';
import { Children } from '../../types';
import { SketchCardWrapper } from './SketchesGrid.styles';

interface Props {
  children: Children;
  to: string;
  imageUrl: string;
  gifUrl?: string;
}

function SketchCard({ children, to, imageUrl, gifUrl }: Props) {
  return (
    <SketchCardWrapper to={to} $imageUrl={imageUrl} $gifUrl={gifUrl}>
      <p>{children}</p>
    </SketchCardWrapper>
  );
}

export default SketchCard;
