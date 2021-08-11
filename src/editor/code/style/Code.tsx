import { style, cssRaw } from 'typestyle';
import { Colors } from '@/Colors';
import { themed } from '@/Theming/utils';

export const Editor = style({
  flex: 1,
});
export const CodeContainer = themed(
  ({
    colors: {
      background: { mainClosest, mainFurthest },
    },
  }) =>
    style({
      flex: 1,
      overflowY: 'hidden',
      overflowX: 'hidden',
      display: 'flex',
      flexFlow: 'column',
      $nest: {
        '.vs-dark .monaco-scrollable-element > .scrollbar': {
          background: mainFurthest,
          $nest: {
            '&.invisible': {
              opacity: 0.5,
            },
          },
        },
        '.vs-dark .monaco-scrollable-element > .scrollbar > .slider': {
          background: mainClosest,
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

cssRaw(`
.monacoError{
  background:${Colors.red}33
}
.monacoMarginError{
  background:${Colors.red};
  border-radius:50%;
  margin-left:5px;
  width:12px !important;
  height:12px !important;
}
.monaco-editor .monaco-editor-hover {
  border: 1px solid 
  #454545;
  padding: 4px 8px;
  font-size: 12px;
}
.monaco-editor-hover .hover-contents {
  padding: 0px;
}
`);
