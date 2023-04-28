import { useEffect, useRef } from 'react';

export function useTraceUpdate<T extends Record<string, unknown>>(props: T) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (ps: Record<string, [unknown, unknown]>, [k, v]) => {
        if (prev.current[k] !== v) {
          ps[k] = [prev.current[k], v];
        }
        return ps;
      },
      {},
    );
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}
