import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import { H3 } from '../../components/typography';

export default function ChaosGame() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('blackHole');

  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
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
          <div>
            <hr />
          </div>
          <div>
            <H3>References</H3>
            <p>
              <a
                href="https://www.youtube.com/embed/EpgB3cNhKPM"
                target="_blank"
                rel="noreferrer"
              >
                The Coding Train - Gravitational Attraction
              </a>
            </p>
          </div>
          <iframe
            width="350"
            height="230"
            src="https://www.youtube.com/embed/EpgB3cNhKPM"
            title="Attraction gravitationnelle - La Nature of Code"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
