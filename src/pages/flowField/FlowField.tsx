import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import P5 from 'p5';
import SketchContainer from '../../components/sketchContainer';
import sketch, {
  Args,
  COLOR_OPTIONS,
  ColorOptionsKeys,
  defaultArgs,
} from './sketch';
import COLORS from '../../constants/colors';
import SlidingPanel from '../../components/slidingPanel';
import { useApp } from '../../context/AppContext';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Icon from '../../components/icons';
import Checkbox from '../../components/checkbox';

export default function FlowField() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('flowField');

  const activeSketch = useRef<P5>();
  const ref = useRef<HTMLDivElement>();

  const args = useRef<Args>(defaultArgs);

  const refresh = () => {
    activeSketch.current?.remove();
    args.current.flowField = defaultArgs.flowField;
    args.current.particles = defaultArgs.particles;
    args.current.zoff = defaultArgs.zoff;
    args.current.columns = defaultArgs.columns;
    args.current.rows = defaultArgs.rows;
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

  const handleColorChange = (value: string) => {
    args.current.selectColor = value as ColorOptionsKeys;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    activeSketch.current = newSketch;
    setEdit(() => true);

    return () => {
      setEdit(() => false);
      newSketch.remove();
      if (activeSketch.current) activeSketch.current?.remove();
    };
  }, []);

  return (
    <>
      <SlidingPanel
        backgroundColor={COLORS.blue800}
        open={isEditing}
        width="400px"
        side="right"
        onClickAway={handleCloseEditing}
        onClose={handleCloseEditing}
      >
        <SlidingPanel.Content $gap="10px">
          <Button
            icon={<Icon name="refresh" />}
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
        </SlidingPanel.Content>
      </SlidingPanel>
      <SketchContainer ref={ref as any} id="parent" />
    </>
  );
}
