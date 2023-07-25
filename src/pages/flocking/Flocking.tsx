import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Range from '../../components/range';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';

export default function Flocking() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('flocking');

  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleDisplayQuadTreeChange = (checked: boolean) => {
    args.current.displayQuadTree = checked;
  };

  const handleBoidsAmount = (value: number) => {
    args.current.boidAmount = value;
  };

  const handleSeperationForce = (value: number) => {
    args.current.separationForce = value;
  };

  const handleCohesionForce = (value: number) => {
    args.current.cohesionForce = value;
  };

  const handleAlignmentForce = (value: number) => {
    args.current.alignmentForce = value;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);

    return () => {
      setEdit(() => false);
      newSketch.remove();
    };
  }, []);

  return (
    <>
      <SlidingPanel
        backgroundColor={COLORS.gray1000}
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
            name="displayQuadTree"
            title={t('inputs.displayQuadTree')}
            onClick={handleDisplayQuadTreeChange}
            defaultChecked={defaultArgs.displayQuadTree}
          />
          <Range
            name="alignmentForce"
            title={t('inputs.alignmentForce')}
            min={0.1}
            max={2}
            step={0.1}
            onChange={handleAlignmentForce}
            defaultValue={defaultArgs.alignmentForce}
          />
          <Range
            name="seperationForce"
            title={t('inputs.seperationForce')}
            min={0.3}
            max={5}
            step={0.1}
            onChange={handleSeperationForce}
            defaultValue={defaultArgs.separationForce}
          />
          <Range
            name="cohesionForce"
            title={t('inputs.cohesionForce')}
            min={0.1}
            max={1}
            step={0.1}
            onChange={handleCohesionForce}
            defaultValue={defaultArgs.cohesionForce}
          />
          <Range
            name="boidsAmount"
            title={t('inputs.boidsAmount')}
            min={20}
            max={500}
            step={10}
            onChange={handleBoidsAmount}
            defaultValue={defaultArgs.boidAmount}
          />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
