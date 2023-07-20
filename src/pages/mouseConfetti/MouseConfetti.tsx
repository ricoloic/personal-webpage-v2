import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Dropdown from '../../components/dropdown';
import { PALETTE_OPTIONS } from '../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../types';
import Range from '../../components/range';
import Checkbox from '../../components/checkbox';

export default function MouseConfetti() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('mouseConfetti');

  const ref = useRef<HTMLDivElement>();

  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleFillConfetti = (checked: boolean) => {
    args.current.fillConfetti = checked;
  };

  const handleColorPaletteChange = (value: string) => {
    args.current.selectColorPalette = value as ColorPalettesKeys;
  };

  const handleConfettiSpeedChange = (value: number) => {
    args.current.velocity = value;
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
        backgroundColor={COLORS.blue800}
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
            name="darkMode"
            title={t('inputs.fillConfetti')}
            onClick={handleFillConfetti}
            defaultChecked={defaultArgs.fillConfetti}
          />
          <Range
            name="confettiSpeed"
            title={t('inputs.confettiSpeed')}
            min={1}
            max={6}
            step={1}
            onChange={handleConfettiSpeedChange}
            defaultValue={defaultArgs.velocity}
          />
          <Dropdown
            name="colorPalette"
            title={t('inputs.colorPalette')}
            onChange={handleColorPaletteChange}
            options={PALETTE_OPTIONS.map((key) => ({ value: key, label: key }))}
            defaultValue={defaultArgs.selectColorPalette}
          />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
