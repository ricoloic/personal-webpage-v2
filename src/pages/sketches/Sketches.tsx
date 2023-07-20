import React from 'react';
import SketchesMenu from '../../components/sketchesMenu';
import { MaxWidthContainer } from './Sketches.styles';

export default function Sketches() {
  return (
    <MaxWidthContainer>
      <SketchesMenu />
    </MaxWidthContainer>
  );
}
