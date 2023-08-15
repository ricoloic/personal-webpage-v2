import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import P5 from 'p5';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import References from '../../components/references';
import Button from '../../components/button';
import Icon from '../../components/icons';
import { H3 } from '../../components/typography';

export default function Pong() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('pong');

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

  const handleRefreshClick = () => {
    refresh();
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);
    activeSketch.current = newSketch;

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
          <Button
            icon={<Icon name="carbon:renew" fontSize="2xl" />}
            name="refresh"
            onClick={handleRefreshClick}
          >
            {t('inputs.refreshSketch')}
          </Button>
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
            <H3>How to play</H3>
            <p>Find a friend to play with</p>
            <p>Make sure you have a keyboard</p>
            <p>
              Use W-S for the left paddle and &quot;UP&quot;-&quot;DOWN&quot;
              arrow for the right paddle
            </p>
            <p>START PLAYING</p>
          </div>
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://en.wikipedia.org/wiki/Pong"
              title="Wikipedia - Pong"
            />
          </References>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
