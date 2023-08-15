import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { AdjacentBackground, LoaderWrapper } from './Loading.styles';
import COLORS from '../../constants/colors';
import { useApp } from '../../context/AppContext';

function Loading() {
  const { theme } = useApp();

  return (
    <>
      <LoaderWrapper>
        <PuffLoader color={COLORS[theme].black} />
      </LoaderWrapper>
      <AdjacentBackground $background={COLORS[theme].white} />
    </>
  );
}

export default Loading;
