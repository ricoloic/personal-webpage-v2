import React, { useEffect, useRef } from 'react';
import P5 from 'p5';
import { useTranslation } from 'react-i18next';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';

export default function FractalTree() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('fractalTree');

  const activeSketch = useRef<P5>();
  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const refresh = () => {
    activeSketch.current?.remove();
    activeSketch.current = sketch(args.current, ref.current?.offsetHeight ?? 0);
  };

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleSimulationClick = (checked: boolean) => {
    args.current.simulation = checked;
  };

  const handleDisplacementChange = (value: number) => {
    args.current.displacementAngle = value;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    activeSketch.current = newSketch;
    setEdit(() => true);

    return () => {
      setEdit(() => false);
      newSketch.remove();

      if (activeSketch.current) activeSketch.current.remove();
    };
  }, []);

  return (
    <>
      <SlidingPanel
        open={isEditing}
        width="400px"
        side="right"
        onClickAway={handleCloseEditing}
        onClose={handleCloseEditing}
      >
        <SlidingPanel.Content $gap="10px">
          <Checkbox
            name="darkMode"
            title={t('inputs.darkMode')}
            onClick={handleDarkMode}
            defaultChecked={defaultArgs.darkMode}
          />
          <Checkbox
            name="simulation"
            title={t('inputs.simulation')}
            onClick={handleSimulationClick}
            defaultChecked={defaultArgs.simulation}
          />
          <Range
            name="displacementAngle"
            title={t('inputs.displacementAngle')}
            onChange={handleDisplacementChange}
            min={0.1}
            max={Math.PI * 2 - 0.1}
            step={0.1}
            defaultValue={defaultArgs.displacementAngle}
          />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
