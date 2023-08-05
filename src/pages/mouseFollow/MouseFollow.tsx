import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import ReactHighlightSyntax from 'react-highlight-syntax';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel, { PageSlidingPanel } from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Checkbox from '../../components/checkbox';
import Range from '../../components/range';
import Dropdown from '../../components/dropdown';
import { PALETTE_OPTIONS } from '../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../types';
import ViewCodeButton from '../../components/button/ViewCodeButton';
import queryFileContent from '../../utils/queryFileContent';

export default function MouseFollow() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('mouseFollow');

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

  const handleShowBlob = (checked: boolean) => {
    args.current.showBlob = checked;
  };

  const handleShowParticleBorder = (checked: boolean) => {
    args.current.particleBorder = checked;
  };

  const handleShowParticleAlfa = (checked: boolean) => {
    args.current.particleAlfa = checked;
  };

  const handleShowParticles = (checked: boolean) => {
    args.current.showParticles = checked;
  };

  const handleParticlesAmount = (value: number) => {
    args.current.particleAmount = value;
  };

  const handleColorPaletteChange = (value: string) => {
    args.current.selectColorPalette = value as ColorPalettesKeys;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);

    queryFileContent('mouseFollow/sketch/index.ts')
      .then((codeContent) => {
        setCode(codeContent);
        return queryFileContent('mouseFollow/sketch/particle.ts');
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
            name="showBlob"
            title={t('inputs.showBlob')}
            onClick={handleShowBlob}
            defaultChecked={defaultArgs.showBlob}
          />
          <Checkbox
            name="showParticleBorder"
            title={t('inputs.showParticleBorder')}
            onClick={handleShowParticleBorder}
            defaultChecked={defaultArgs.particleBorder}
          />
          <Checkbox
            name="showParticleAlfa"
            title={t('inputs.showParticleAlfa')}
            onClick={handleShowParticleAlfa}
            defaultChecked={defaultArgs.particleAlfa}
          />
          <Checkbox
            name="showParticles"
            title={t('inputs.showParticle')}
            onClick={handleShowParticles}
            defaultChecked={defaultArgs.showParticles}
          />
          <Range
            name="particleAmount"
            title={t('inputs.particleAmount')}
            min={10}
            max={200}
            step={10}
            onChange={handleParticlesAmount}
            defaultValue={defaultArgs.particleAmount}
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
