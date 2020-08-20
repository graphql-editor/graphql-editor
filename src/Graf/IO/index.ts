import { useEffect } from 'react';
import { DOM } from '@Graf/DOM';

export enum KeyboardActions {
  Delete = 'Delete',
  Undo = 'Undo',
  Redo = 'Redo',
}

export const useIO = ({ on }: { on: (action: KeyboardActions) => void }) => {
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (DOM.panLock) return;
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
    };
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [on]);
};
