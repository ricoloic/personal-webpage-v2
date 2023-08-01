import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';

export default function MaurerRose() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('maurerRose');

  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleColorHighlightChange = (checked: boolean) => {
    args.current.colorHighlight = checked;
  };

  const handlePetalAmountChange = (value: number) => {
    args.current.petalAmount = value;
  };

  const handleDegreesChange = (value: number) => {
    args.current.degrees = value;
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
            name="colorHighlight"
            title={t('inputs.colorHighlight')}
            onClick={handleColorHighlightChange}
            defaultChecked={defaultArgs.colorHighlight}
          />
          <Range
            name="petalAmount"
            title={t('inputs.petalAmount')}
            onChange={handlePetalAmountChange}
            min={3}
            max={30}
            step={1}
            defaultValue={defaultArgs.petalAmount}
          />
          <Range
            name="degrees"
            title={t('inputs.degrees')}
            onChange={handleDegreesChange}
            min={1}
            max={361}
            step={1}
            defaultValue={defaultArgs.degrees}
          />
          <div>
            <hr />
          </div>
          <div>
            <p>
              <a
                href="https://www.youtube.com/embed/4uU9lZ-HSqA"
                target="_blank"
                rel="noreferrer"
              >
                The Coding Train - Maurer Rose
              </a>
            </p>
            <iframe
              width="350"
              height="230"
              src="https://www.youtube.com/embed/4uU9lZ-HSqA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Maurer_rose"
                target="_blank"
                rel="noreferrer"
              >
                Wikipedia - Maurer Rose
              </a>
            </p>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
