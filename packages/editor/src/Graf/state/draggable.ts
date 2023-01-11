import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useDraggableContainer = createContainer(() => {
  const [draggable, setDraggable] = useState(true);
  return {
    draggable,
    setDraggable,
  };
});

export const useDraggable = useDraggableContainer.useContainer;
export const DraggableProvider = useDraggableContainer.Provider;
