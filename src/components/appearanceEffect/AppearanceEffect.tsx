import React, { CSSProperties, useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Children } from '../../types';

interface Props {
  children: Children;
  show?: boolean;
  style?: CSSProperties;
}

function AppearanceEffect({ children, show = true, style = {} }: Props) {
  const [showTransition, setShowTransition] = useState(false);
  const props = useSpring(() => ({
    opacity: showTransition ? 1 : 0,
    config: { duration: 200 },
  }));

  useEffect(() => {
    setShowTransition(show as boolean);
  }, [show]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <animated.div style={{ ...style, ...props }}>{children}</animated.div>;
}

export default AppearanceEffect;
