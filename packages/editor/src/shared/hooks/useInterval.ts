import { useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number | null,
  deps: any[],
) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay, ...deps]);
};
