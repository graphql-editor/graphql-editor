import { style } from 'typestyle';
import { themed } from '@/Theming/utils';

export const Editor = style({
  flex: 1,
});
export const CodeContainer = themed(
  ({
    colors: {
      grey: { greyFurthest, greyFar },
    },
  }) =>
    style({
      flex: 1,
      overflowY: 'hidden',
      overflowX: 'hidden',
      display: 'flex',
      flexFlow: 'column',
      $nest: {
        '.monaco-scrollable-element': {
          padding: 8,
        },
        '.vs-dark .monaco-scrollable-element > .scrollbar': {
          background: greyFurthest,
          $nest: {
            '&.invisible': {
              opacity: 0.5,
            },
          },
        },
        '.vs-dark .monaco-scrollable-element > .scrollbar > .slider': {
          background: greyFar,
        },
      },
    }),
);

export const Generate = themed(({}) =>
  style({
    marginLeft: 'auto',
    padding: `2px 6px`,
    display: 'flex',
    alignItems: 'center',
  }),
);
