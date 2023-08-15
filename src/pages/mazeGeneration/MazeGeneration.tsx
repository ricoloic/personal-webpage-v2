import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import P5 from 'p5';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import SlidingPanel from '../../components/slidingPanel';
import Checkbox from '../../components/checkbox';
import { useApp } from '../../context/AppContext';
import Button from '../../components/button';
import Icon from '../../components/icons';
import References from '../../components/references';

export default function ChaosGame() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('mazeGeneration');

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
  };

  const handleRefreshClick = () => {
    refresh();
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
          <References>
            <References.Element
              href="https://www.youtube.com/embed/HyK_Q5rrcr4"
              title="The Coding Train - Maze Generator"
            />
            <References.Element
              href="https://www.youtube.com/embed/aKYlikFAV4k"
              title="The Coding Train - A* Pathfinding"
            />
            <References.Element
              href="https://www.youtube.com/embed/Y37-gB83HKE"
              title="javidx9 - Programming Mazes"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search"
              title="Wikipedia - Maze Generation Algorithm"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/A*_search_algorithm"
              title="Wikipedia - A* Search Algorithm"
            />
          </References>
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
