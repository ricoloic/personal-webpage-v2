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
import References from '../../components/references';
import queryFileContent from '../../utils/queryFileContent';
import ViewCodeButton from '../../components/button/ViewCodeButton';

export default function BesierQuadraticCurve() {
  const { isEditing, setIsEditing, setEdit } = useApp();
  const { t } = useTranslation('besierQuadraticCurve');

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

  const handleDisplayControlLines = (checked: boolean) => {
    args.current.displayControlLines = checked;
  };

  useEffect(() => {
    const newSketch = sketch(args.current, ref.current?.offsetHeight ?? 0);

    setEdit(() => true);

    queryFileContent('besierQuadraticCurve/sketch/index.ts')
      .then((codeContent) => {
        setCode(codeContent);
        return queryFileContent('besierQuadraticCurve/sketch/point.ts');
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
            name="displayControlLines"
            title={t('inputs.displayControlLines')}
            onClick={handleDisplayControlLines}
            defaultChecked={defaultArgs.displayControlLines}
          />
          <div>
            <hr />
          </div>
          <References>
            <References.Element
              href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve"
              title="Wikipedia - Bézier Curve"
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
