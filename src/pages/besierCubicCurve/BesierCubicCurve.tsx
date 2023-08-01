import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import { H3 } from '../../components/typography';

export default function BesierCubicCurve() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('besierCubicCurve');

  const ref = useRef<HTMLDivElement>();

  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleDisplayControlLines = (checked: boolean) => {
    args.current.displayControlLines = checked;
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
            name="displayControlLines"
            title={t('inputs.displayControlLines')}
            onClick={handleDisplayControlLines}
            defaultChecked={defaultArgs.displayControlLines}
          />
          <div>
            <hr />
          </div>
          <div>
            <H3>References</H3>
            <p>
              <a
                href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve"
                target="_blank"
                rel="noreferrer"
              >
                Wikipedia - Bézier Curve
              </a>
            </p>
          </div>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
