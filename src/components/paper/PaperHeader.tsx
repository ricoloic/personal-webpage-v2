import React from 'react';
import { PaperHeader as StylePaperHeader } from './Paper.styles';
import { Children } from '../../types';
import { H3 } from '../typography';

interface Props {
  title: Children;
  right?: Children;
}

function PaperHeader({ title, right = undefined }: Props) {
  return (
    <StylePaperHeader>
      <H3 fontWeight="900">{title}</H3>
      {right}
    </StylePaperHeader>
  );
}

export default PaperHeader;
