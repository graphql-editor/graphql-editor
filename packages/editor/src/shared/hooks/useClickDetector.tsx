import { useCallback, useRef } from 'react';

export const useClickDetector = () => {
  const md = useRef({ clientX: 0, clientY: 0, start: 0 });
  const mouseDown = useCallback((e: React.MouseEvent) => {
    md.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      start: Date.now(),
    };
  }, []);
  const isClick = useCallback((e: React.MouseEvent) => {
    const timeDelta = Date.now() - md.current.start;
    const positionDelta = Math.sqrt(
      Math.pow(e.clientX - md.current.clientX, 2) +
        Math.pow(e.clientY - md.current.clientY, 2),
    );
    return timeDelta < 1000 && positionDelta < 5;
  }, []);
  return {
    mouseDown,
    isClick,
  };
};
