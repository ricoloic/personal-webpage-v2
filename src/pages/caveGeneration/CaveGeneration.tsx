import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import P5 from 'p5';
import ReactHighlightSyntax from 'react-highlight-syntax';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import SlidingPanel, { PageSlidingPanel } from '../../components/slidingPanel';
import COLORS from '../../constants/colors';
import Checkbox from '../../components/checkbox';
import { useApp } from '../../context/AppContext';
import Range from '../../components/range';
import Button from '../../components/button';
import Icon from '../../components/icons';
import References from '../../components/references';
import queryFileContent from '../../utils/queryFileContent';
import ViewCodeButton from '../../components/button/ViewCodeButton';

export default function ChaosGame() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('caveGeneration');

  const [code, setCode] = useState('');
  const [openCode, setOpenCode] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const activeSketch = useRef<P5>();
  const args = useRef<Args>(defaultArgs);

  const handleOpenViewCode = () => {
    setOpenCode(true);
    setIsEditing(false);
  };

  const handleCloseViewCode = () => {
    setOpenCode(false);
    setIsEditing(true);
  };

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
    refresh();
  };

  const handleShowBorder = (checked: boolean) => {
    args.current.showBorder = checked;
    refresh();
  };

  const handleShowMesh = (checked: boolean) => {
    args.current.showMesh = checked;
    refresh();
  };

  const handleRandomFillPercent = (value: number) => {
    args.current.randomFillPercent = value;
    refresh();
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);
    activeSketch.current = newSketch;

    queryFileContent('caveGeneration/sketch/index.ts')
      .then((codeContent) => {
        setCode(codeContent);
        return queryFileContent('caveGeneration/sketch/mapGenerator.ts');
      })
      .then((codeContent) => {
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`);
        return queryFileContent('caveGeneration/sketch/meshGenerator.ts');
      })
      .then((codeContent) =>
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`)
      );

    return () => {
      setEdit(() => false);
      newSketch.remove();
      if (activeSketch.current) activeSketch.current.remove();
    };
  }, []);

  return (
    <>
      <PageSlidingPanel open={openCode} onClose={handleCloseViewCode}>
        <ReactHighlightSyntax
          theme="AtomOneDarkReasonable"
          language="TypeScript"
        >
          {code}
        </ReactHighlightSyntax>
      </PageSlidingPanel>
      <SlidingPanel
        backgroundColor={COLORS.gray1000}
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
          <Checkbox
            name="showBorder"
            title={t('inputs.showBorder')}
            onClick={handleShowBorder}
            defaultChecked={defaultArgs.showBorder}
          />
          <Checkbox
            name="showMesh"
            title={t('inputs.showMesh')}
            onClick={handleShowMesh}
            defaultChecked={defaultArgs.showMesh}
          />
          <Range
            name="randomFillPercent"
            title={t('inputs.randomFillPercent')}
            min={40}
            max={60}
            step={1}
            onChange={handleRandomFillPercent}
            defaultValue={defaultArgs.randomFillPercent}
          />
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://www.youtube.com/embed/videoseries?list=PLFt_AvWsXl0eZgMK_DT5_biRkWXftAOf9"
              title="Sebastian Lague - Procedural Cave Generation"
            />
            <References.Element
              href="https://www.youtube.com/embed/0ZONMNUKTfU"
              title="The Coding Train - Coding Marching Squares"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Marching_squares"
              title="Wikipedia - Marching Squares"
            />
          </References>
          <div>
            <hr />
          </div>
          <ViewCodeButton onClick={handleOpenViewCode} />
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as never} id="parent" />
    </>
  );
}
