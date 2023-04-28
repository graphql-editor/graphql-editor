import { useCallback } from 'react';
import { useControls } from 'react-zoom-pan-pinch';

export const useLazyControls = () => {
  const ct = useControls();
  const zoomToElement = useCallback((node: string) => {
    ct.zoomToElement(
      node,
      ct.instance.transformState.scale,
      200,
      'easeInOutCubic',
    );
  }, []);
  const setTransform = useCallback(
    ((...props) => {
      ct.setTransform(...props);
    }) as typeof ct.setTransform,
    [],
  );
  return {
    zoomToElement,
    setTransform,
  };
};
