import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';

export default function TimesTable() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('timesTable');

  const ref = useRef<HTMLDivElement>();

  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleAmountOfPointsChange = (value: number) => {
    args.current.amountOfPoints = value;
  };

  const handleTransparencyChange = (value: number) => {
    args.current.transparency = value;
  };

  const handleLineThicknessChange = (value: number) => {
    args.current.lineThickness = value;
  };

  const handleMultiplierChange = (value: number) => {
    args.current.multiplier = value;
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
          <Range
            name="amountOfPoints"
            title={t('inputs.amountOfPoints')}
            onChange={handleAmountOfPointsChange}
            min={100}
            max={1000}
            step={1}
            defaultValue={defaultArgs.amountOfPoints}
          />
          <Range
            name="transparency"
            title={t('inputs.transparency')}
            onChange={handleTransparencyChange}
            min={1}
            max={100}
            step={1}
            defaultValue={defaultArgs.transparency}
          />
          <Range
            name="lineThickness"
            title={t('inputs.lineThickness')}
            onChange={handleLineThicknessChange}
            min={1}
            max={10}
            step={1}
            defaultValue={defaultArgs.lineThickness}
          />
          <Range
            name="multiplier"
            title={t('inputs.multiplier')}
            onChange={handleMultiplierChange}
            min={1}
            max={600}
            step={1}
            defaultValue={defaultArgs.multiplier}
          />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
