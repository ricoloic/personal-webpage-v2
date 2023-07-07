import { useState, useLayoutEffect, MutableRefObject } from 'react';
import { useWindowSize } from 'react-use';

export const useIsOverflow = (
  ref: MutableRefObject<HTMLDivElement | null | undefined>
) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const { height } = useWindowSize();

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollHeight > current.clientHeight;

        setIsOverflow(hasOverflow);
      }
    };

    trigger();
  }, [ref, height]);

  return isOverflow;
};

export default useIsOverflow;
