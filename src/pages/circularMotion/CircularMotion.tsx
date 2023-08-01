import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import P5 from 'p5';
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

export default function CircularMotion() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('circularMotion');

  const ref = useRef<HTMLDivElement>();
  const activeSketch = useRef<P5>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const refresh = () => {
    activeSketch.current?.remove();
    args.current.particles = defaultArgs.particles;
    args.current.latestMousePositions = defaultArgs.latestMousePositions;
    args.current.averageMousePosition = defaultArgs.averageMousePosition;
    activeSketch.current = sketch(args.current, ref.current?.offsetHeight ?? 0);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleMaximumRadiusChange = (value: number) => {
    args.current.maxRadius = value;
  };

  const handleLineAmountChange = (value: number) => {
    args.current.lineAmount = value;
  };

  const handleColorPaletteChange = (value: string) => {
    args.current.selectColorPalette = value as ColorPalettesKeys;
    refresh();
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    activeSketch.current = newSketch;
    setEdit(() => true);

    return () => {
      setEdit(() => false);
      newSketch.remove();
      if (activeSketch.current) activeSketch.current?.remove();
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
            name="maximumRadius"
            title={t('inputs.maximumRadius')}
            min={30}
            max={150}
            step={10}
            onChange={handleMaximumRadiusChange}
            defaultValue={defaultArgs.maxRadius}
          />
          <Range
            name="lineAmount"
            title={t('inputs.lineAmount')}
            min={3}
            max={50}
            step={1}
            onChange={handleLineAmountChange}
            defaultValue={defaultArgs.lineAmount}
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
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
