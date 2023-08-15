import React, { ComponentType, useEffect, useState } from 'react';
import ReactHighlightSyntax from 'react-highlight-syntax';
import { useApp } from '../context/AppContext';
import { queryFilesContent } from '../utils/queryFileContent';
import { PageSlidingPanel } from '../components/slidingPanel';

export default function withCode(files: string[]) {
  return (Component: ComponentType<unknown>) => {
    return () => {
      const [code, setCode] = useState('');
      const { setViewCode, isViewingCode, setIsViewingCode } = useApp();

      useEffect(() => {
        setViewCode(true);
        queryFilesContent(files).then((contents) => {
          setCode(contents.join('\n\n'));
        });

        return () => {
          setCode('');
          setViewCode(false);
          setIsViewingCode(false);
        };
      }, []);

      return (
        <>
          <PageSlidingPanel
            open={isViewingCode}
            onClose={() => setIsViewingCode(false)}
          >
            <ReactHighlightSyntax
              theme="AtomOneDarkReasonable"
              language="TypeScript"
            >
              {code}
            </ReactHighlightSyntax>
          </PageSlidingPanel>
          <Component />
        </>
      );
    };
  };
}
