import { useLayoutEffect, useRef } from 'react';

// Reusable component that also takes dependencies
export const useAnimationFrame = (
  cb?: (p: { time: number; delta: number }) => void,
) => {
  if (typeof performance === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const cbRef = useRef<typeof cb>();
  const frame = useRef<number>();
  const init = useRef(performance.now());
  const last = useRef(performance.now());

  cbRef.current = cb;

  const animate = (now: number) => {
    cbRef.current?.({
      time: now - init.current,
      delta: now - last.current,
    });
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);
};
