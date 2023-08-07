import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import P5 from 'p5';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Boundary from './sketch/boundary';
import Button from '../../components/button';
import References from '../../components/references';

export default function RayCasting() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('rayCasting');

  const ref = useRef<HTMLDivElement>();
  const activeSketch = useRef<P5>();
  const args = useRef<Args>(defaultArgs);

  const handleCloseEditing = () => {
    setIsEditing(false);
  };

  const handleDarkMode = (checked: boolean) => {
    args.current.darkMode = checked;
  };

  const handleEditing = (checked: boolean) => {
    args.current.editing = checked;
  };

  const handleAutoMove = (checked: boolean) => {
    args.current.autoMove = checked;
  };

  const handleSnapNodes = (checked: boolean) => {
    args.current.snapNode = checked;
  };

  const handleShowCasting = (checked: boolean) => {
    args.current.casting = checked;
  };

  const handleShowBackground = (checked: boolean) => {
    args.current.background = checked;
  };

  const handleAddBoundary = (pointAmount: number) => () => {
    args.current.boundaries.push(
      new Boundary(activeSketch.current!, pointAmount)
    );
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);
    activeSketch.current = newSketch;
    setEdit(() => true);

    return () => {
      setEdit(() => false);
      newSketch.remove();
      args.current.boundaries = [];
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
          <Checkbox
            name="editing"
            title={t('inputs.editing')}
            onClick={handleEditing}
            defaultChecked={defaultArgs.editing}
          />
          <Checkbox
            name="autoMove"
            title={t('inputs.autoMove')}
            onClick={handleAutoMove}
            defaultChecked={defaultArgs.autoMove}
          />
          <Checkbox
            name="snapNode"
            title={t('inputs.snapNode')}
            onClick={handleSnapNodes}
            defaultChecked={defaultArgs.snapNode}
          />
          <Checkbox
            name="showCasting"
            title={t('inputs.showCasting')}
            onClick={handleShowCasting}
            defaultChecked={defaultArgs.casting}
          />
          <Checkbox
            name="showBackground"
            title={t('inputs.showBackground')}
            onClick={handleShowBackground}
            defaultChecked={defaultArgs.background}
          />
          <Button name="addBoundary" onClick={handleAddBoundary(2)}>
            {t('inputs.addBoundary', { pointAmount: 2 })}
          </Button>
          <Button name="addBoundary" onClick={handleAddBoundary(3)}>
            {t('inputs.addBoundary', { pointAmount: 3 })}
          </Button>
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://github.com/ricoloic/RayCasting"
              title="Loïc Rico - Ray Casting (Processing)"
            />
            <References.Element
              href="https://www.youtube.com/embed/TOEi6T2mtHo"
              title="The Coding Train - Ray Casting"
            />
            <References.Element
              href="https://ncase.me/sight-and-light/"
              title="Nicky Case - Nothing To Hide"
            />
            <References.Element
              href="https://www.youtube.com/embed/Qz0KTGYJtUk"
              title="Sebastian Lague - Ray Tracing"
            />
          </References>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
