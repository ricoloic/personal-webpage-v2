import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReactHighlightSyntax from 'react-highlight-syntax';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel, { PageSlidingPanel } from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Dropdown from '../../components/dropdown';
import { PALETTE_OPTIONS } from '../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../types';
import Range from '../../components/range';
import Checkbox from '../../components/checkbox';
import queryFileContent from '../../utils/queryFileContent';
import ViewCodeButton from '../../components/button/ViewCodeButton';

export default function MouseConfetti() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('mouseConfetti');

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

  const handleFillConfetti = (checked: boolean) => {
    args.current.fillConfetti = checked;
  };

  const handleColorPaletteChange = (value: string) => {
    args.current.selectColorPalette = value as ColorPalettesKeys;
  };

  const handleConfettiSpeedChange = (value: number) => {
    args.current.velocity = value;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);

    queryFileContent('mouseConfetti/sketch/index.ts')
      .then((codeContent) => {
        setCode(codeContent);
        return queryFileContent('mouseConfetti/sketch/confetti.ts');
      })
      .then((codeContent) =>
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`)
      );

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
            name="darkMode"
            title={t('inputs.fillConfetti')}
            onClick={handleFillConfetti}
            defaultChecked={defaultArgs.fillConfetti}
          />
          <Range
            name="confettiSpeed"
            title={t('inputs.confettiSpeed')}
            min={1}
            max={6}
            step={1}
            onChange={handleConfettiSpeedChange}
            defaultValue={defaultArgs.velocity}
          />
          <Dropdown
            name="colorPalette"
            title={t('inputs.colorPalette')}
            onChange={handleColorPaletteChange}
            options={PALETTE_OPTIONS.map((key) => ({ value: key, label: key }))}
            defaultValue={defaultArgs.selectColorPalette}
          />
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
