import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import P5 from 'p5';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';
import References from '../../components/references';

export default function ChaosGame() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('chaosGame');

  const ref = useRef<HTMLDivElement>();
  const activeSketch = useRef<P5>();
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
    refresh();
  };

  const handleAmountOfPointsChange = (value: number) => {
    args.current.amountOfPoints = value;
    refresh();
  };

  const handleLerpAmountChange = (value: number) => {
    args.current.lerpAmount = value;
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
            name="amountOfPoints"
            title={t('inputs.amountOfPoints')}
            onChange={handleAmountOfPointsChange}
            min={3}
            max={15}
            step={1}
            defaultValue={defaultArgs.amountOfPoints}
          />
          <Range
            name="lerpAmount"
            title={t('inputs.lerpAmount')}
            onChange={handleLerpAmountChange}
            min={0.025}
            max={0.975}
            step={0.005}
            defaultValue={defaultArgs.lerpAmount}
          />
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://www.youtube.com/embed/7gNzMtYo9n4"
              title="The Coding Train - Chaos Game"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Chaos_game"
              title="Wikipedia - Chaos Game"
            />
          </References>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
