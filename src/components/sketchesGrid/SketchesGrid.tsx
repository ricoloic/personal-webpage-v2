import React from 'react';
import { Children } from '../../types';
import { SketchesGridWrapper } from './SketchesGrid.styles';

interface Props {
  children: Children;
}

function SketchesGrid({ children }: Props) {
  return <SketchesGridWrapper>{children}</SketchesGridWrapper>;
}

export default SketchesGrid;
