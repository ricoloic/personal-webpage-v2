import React from 'react';
import { Children } from '../../types';

interface Props {
  children: Children;
}

function PaperContent({ children }: Props) {
  return <div>{children}</div>;
}

export default PaperContent;
