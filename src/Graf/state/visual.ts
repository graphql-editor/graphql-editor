import { createContainer } from 'unstated-next';
import { useState } from 'react';

let t: NodeJS.Timeout | undefined;

const useVisualStateContainer = createContainer(() => {
  const [draggingAllowed, _setDraggingAllowed] = useState(true);
  const setDraggingAllowed = (da: boolean) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      _setDraggingAllowed(da);
    }, 100);
  };
  return {
    draggingAllowed,
    setDraggingAllowed,
    _setDraggingAllowed,
  };
});

export const useVisualState = useVisualStateContainer.useContainer;
export const VisualStateProvider = useVisualStateContainer.Provider;
