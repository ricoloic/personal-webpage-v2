import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { AdjacentBackground, LoaderWrapper } from './Loading.styles';
import COLORS from '../../constants/colors';

function Loading() {
  return (
    <>
      <LoaderWrapper>
        <PuffLoader color={COLORS.blue800} />
      </LoaderWrapper>
      <AdjacentBackground $background={COLORS.gray100} />
    </>
  );
}

export default Loading;
