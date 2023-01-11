import { diffChars } from 'diff';
import type * as monaco from 'monaco-editor';

export const getNewCursorIndex = ({
  oldSchema,
  newSchema,
  cursorIndex,
}: {
  oldSchema: string;
  newSchema: string;
  cursorIndex: number;
}) => {
  const diff = diffChars(oldSchema, newSchema, {
    ignoreCase: true,
  });
  let currentIndex = 0;
  let changedIndex = cursorIndex;
  diff.forEach((d) => {
    const count = d.count;
    if (!count) return;
    const start = currentIndex;
    const end = currentIndex + count;
    if (d.removed) {
      if (end <= cursorIndex) {
        changedIndex -= count;
      } else {
        if (start < cursorIndex) {
          changedIndex -= changedIndex - start + 1;
        }
      }
    } else if (d.added) {
      if (start < cursorIndex) {
        changedIndex += count;
      }
    } else {
    }
    currentIndex += count;
  });
  return changedIndex;
};

export const moveCursor = ({
  cursorIndex,
  editorRef,
  newText,
  previousText,
}: {
  cursorIndex: { index: number };
  previousText: string;
  newText: string;
  editorRef: monaco.editor.IStandaloneCodeEditor;
}) => {
  const model = editorRef?.getModel();
  if (!model) return;
  let changedIndex = cursorIndex.index;
  changedIndex = getNewCursorIndex({
    oldSchema: previousText || '',
    newSchema: newText || '',
    cursorIndex: cursorIndex.index,
  });
  const newPosition = model.getPositionAt(changedIndex);
  if (newPosition) {
    cursorIndex.index = changedIndex;
    editorRef?.setPosition(newPosition);
  }
};
