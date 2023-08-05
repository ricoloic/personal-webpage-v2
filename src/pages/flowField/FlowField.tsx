import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import P5 from 'p5';
import ReactHighlightSyntax from 'react-highlight-syntax';
import SketchContainer from '../../components/sketchContainer';
import sketch, { Args, defaultArgs } from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel, { PageSlidingPanel } from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Icon from '../../components/icons';
import Checkbox from '../../components/checkbox';
import { COLOR_OPTIONS, ColorOptionsKeys } from './sketch/colorOptions';
import Range from '../../components/range';
import References from '../../components/references';
import ViewCodeButton from '../../components/button/ViewCodeButton';
import queryFileContent from '../../utils/queryFileContent';

export default function FlowField() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('flowField');

  const [code, setCode] = useState('');
  const [openCode, setOpenCode] = useState(false);
  const activeSketch = useRef<P5>();
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

  const handleDisplayFlow = (checked: boolean) => {
    args.current.displayFlow = checked;
    // if (checked) args.current.scale = 30;
    // else args.current.scale = 10;
    refresh();
  };

  const handleParticleAmountChange = (value: number) => {
    args.current.particleAmount = value;
    refresh();
  };

  const handleScaleChange = (value: number) => {
    args.current.scale = value;
    refresh();
  };

  const handleColorChange = (value: string) => {
    args.current.selectColor = value as ColorOptionsKeys;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    activeSketch.current = newSketch;
    setEdit(() => true);

    queryFileContent('flowField/sketch/index.ts')
      .then((codeContent) => {
        setCode(codeContent);
        return queryFileContent('flowField/sketch/particle.ts');
      })
      .then((codeContent) => {
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`);
        return queryFileContent('flowField/sketch/flow.ts');
      })
      .then((codeContent) => {
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`);
        return queryFileContent('flowField/sketch/colorOptions.ts');
      })
      .then((codeContent) =>
        setCode((previousContent) => `${previousContent}\n\n${codeContent}`)
      );

    return () => {
      setEdit(() => false);
      newSketch.remove();
      if (activeSketch.current) activeSketch.current?.remove();
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
            name="displayFlow"
            title={t('inputs.displayFlow')}
            onClick={handleDisplayFlow}
            defaultChecked={defaultArgs.displayFlow}
          />
          <Range
            name="particleAmount"
            title={t('inputs.particleAmount')}
            onChange={handleParticleAmountChange}
            min={500}
            max={10000}
            step={100}
            defaultValue={defaultArgs.particleAmount}
          />
          <Range
            name="scale"
            title={t('inputs.scale')}
            onChange={handleScaleChange}
            min={5}
            max={100}
            step={1}
            defaultValue={defaultArgs.scale}
          />
          <Dropdown
            name="color"
            title={t('inputs.color')}
            onChange={handleColorChange}
            options={Object.keys(COLOR_OPTIONS).map((key) => ({
              value: key,
              label: key,
            }))}
            defaultValue={defaultArgs.selectColor}
          />
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://www.youtube.com/embed/BjoM9oKOAKY"
              title="The Coding Train - Flow Field"
            />
            <References.Element
              href="https://en.wikipedia.org/wiki/Perlin_noise"
              title="Wikipedia - Perlin Noise"
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
