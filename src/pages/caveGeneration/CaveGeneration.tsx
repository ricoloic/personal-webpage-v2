import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';

export default function ChaosGame() {
  const { t } = useTranslation('caveGeneration');

  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    return () => {
      newSketch.remove();
    };
  }, []);

  return <SketchContainer ref={ref as any} id="parent" />;
}
