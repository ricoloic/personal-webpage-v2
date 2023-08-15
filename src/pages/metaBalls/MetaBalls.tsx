import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';
import References from '../../components/references';

export default function MetaBalls() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('metaBalls');

  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleShowCircles = (checked: boolean) => {
    args.current.showCircles = checked;
  };

  const handleBallAmountChange = (value: number) => {
    args.current.ballAmount = value;
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
            name="ShowCircles"
            title={t('inputs.showCircles')}
            onClick={handleShowCircles}
            defaultChecked={defaultArgs.showCircles}
          />
          <Range
            name="ballAmount"
            title={t('inputs.ballAmount')}
            onChange={handleBallAmountChange}
            min={1}
            max={20}
            step={1}
            defaultValue={defaultArgs.ballAmount}
          />
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/"
              title="Jamie Wong - Metaballs Marching Squares"
            />
            <References.Element
              href="https://www.youtube.com/embed/6oMZb3yP_H8"
              title="Reducible - Marching Squares"
            />
            <References.Element
              href="https://www.youtube.com/embed/0ZONMNUKTfU"
              title="The Coding Train - Marching Squares"
            />
            <References.Element
              href="https://www.youtube.com/embed/ccYLb7cLB1I"
              title="The Coding Train - Metaballs"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Marching_squares"
              title="Wikipedia  - Marching Squares"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Metaballs"
              title="Wikipedia - Metaballs"
            />
          </References>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
