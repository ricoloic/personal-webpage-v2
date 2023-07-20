import React, { ComponentType, useEffect } from 'react';

export default function withSketch() {
  return (Component: ComponentType<unknown>) => {
    return () => {
      useEffect(() => {
        window.scrollTo(0, 1);
        const html = document.body.parentNode;
        if (html) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          html.className = 'no-move';

          return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            html.className = '';
          };
        }

        return () => undefined;
      }, []);

      return <Component />;
    };
  };
}
