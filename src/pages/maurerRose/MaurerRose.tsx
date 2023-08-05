import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReactHighlightSyntax from 'react-highlight-syntax';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel, { PageSlidingPanel } from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';
import References from '../../components/references';
import ViewCodeButton from '../../components/button/ViewCodeButton';
import queryFileContent from '../../utils/queryFileContent';

export default function MaurerRose() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('maurerRose');

  const [code, setCode] = useState('');
  const [openCode, setOpenCode] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const args = useRef<Args>(defaultArgs);

  const handleOpenViewCode = () => {
    setOpenCode(true);
    setIsEditing(false);
  };

  const handleCloseViewCode = () => {
    setOpenCode(false);
    setIsEditing(true);
  };

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

    queryFileContent('maurerRose/sketch/index.ts').then((codeContent) => {
      setCode(codeContent);
    });

    return () => {
      setEdit(() => false);
      newSketch.remove();
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
          <References>
            <References.Element
              href="https://www.youtube.com/embed/4uU9lZ-HSqA"
              title="The Coding Train - Maurer Rose"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Maurer_rose"
              title="Wikipedia - Maurer Rose"
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
