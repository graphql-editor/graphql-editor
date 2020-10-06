import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
export enum KeyboardActions {
  Delete = 'Delete',
  Undo = 'Undo',
  Redo = 'Redo',
  Save = 'Save',
}

const useIOStateContainer = createContainer(() => {
  const [actions, setActions] = useState<Partial<Record<KeyboardActions, Function>>>({});
  const on = (action: KeyboardActions) => {
    actions[action]?.();
  };
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      //   if (DOM.panLock) return;
      const ctrl = event.ctrlKey || event.metaKey;
      if (event.key === 'm') {
      }
      if (event.key === 'Delete') {
        on(KeyboardActions.Delete);
      }
      if (event.key === 'Backspace') {
        on(KeyboardActions.Delete);
      }
      if (event.key === 'z' && ctrl && !event.shiftKey) {
        on(KeyboardActions.Undo);
      }
      if (event.key === 'z' && ctrl && event.shiftKey) {
        on(KeyboardActions.Redo);
      }
      if (event.key === 's' && ctrl) {
        event.preventDefault();
        on(KeyboardActions.Save);
      }
    };
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [actions]);
  return {
    setActions,
  };
});

export const useIOState = useIOStateContainer.useContainer;
export const IOStateProvider = useIOStateContainer.Provider;
