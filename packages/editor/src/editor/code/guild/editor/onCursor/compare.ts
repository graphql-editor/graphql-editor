import { diffChars } from 'diff';

export const getNewCursorIndex = ({
  oldSchema,
  newSchema,
  cursorIndex,
}: {
  oldSchema: string;
  newSchema: string;
  cursorIndex: number;
}) => {
  console.time('diffs');
  const diff = diffChars(oldSchema, newSchema, {
    ignoreCase: true,
  });
  console.timeEnd('diffs');
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
