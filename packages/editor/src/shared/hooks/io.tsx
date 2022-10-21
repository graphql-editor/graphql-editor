export enum KeyboardActions {
  Delete = 'Delete',
  Undo = 'Undo',
  Redo = 'Redo',
  Save = 'Save',
  FindRelation = 'FindRelation',
}
export const useIO = () => {
  const handleKeyboard =
    (on: (action: KeyboardActions) => void) => (event: KeyboardEvent) => {
      const ctrl = event.ctrlKey || event.metaKey;
      if (event.key === 'Delete') {
        event.preventDefault();
        on(KeyboardActions.Delete);
      }
      if (event.key === 'z' && ctrl && !event.shiftKey) {
        event.preventDefault();
        on(KeyboardActions.Undo);
      }
      if (event.key === 'z' && ctrl && event.shiftKey) {
        event.preventDefault();
        on(KeyboardActions.Redo);
      }
      if (event.key === 'f' && ctrl) {
        event.preventDefault();
        on(KeyboardActions.FindRelation);
      }
    };
  const mount = (actions: Partial<Record<KeyboardActions, Function>>) => {
    const handler = handleKeyboard((a) => actions[a]?.());
    document.addEventListener('keydown', handler);
    const dispose = () => {
      document.removeEventListener('keydown', handler);
    };
    return {
      dispose,
    };
  };
  return { mount };
};
