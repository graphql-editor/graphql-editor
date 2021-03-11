import { keyframes, style, cssRaw } from 'typestyle';
import { Colors } from '@/Colors';
import * as vars from '@/vars';
import { themed } from '@/Theming/utils';

const animationName = keyframes({
  ['0%']: {
    transform: `rotate(0deg)`,
  },
  ['100%']: {
    transform: `rotate(360deg)`,
  },
});

export const Editor = style({
  flex: 1,
});
export const CodeContainer = style({
  flex: 1,
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'column',
});

export const Generate = themed(
  ({
    colors: {
      code: {
        synchronize: { color, disabled, ready, readyHover },
      },
    },
  }) =>
    style({
      marginLeft: 'auto',
      color,
      padding: `2px 6px`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      fontSize: 10,
      textTransform: 'lowercase',
      borderRadius: 3,
      fontWeight: 'bold',
      transition: vars.transition,
      $nest: {
        '&.disabled': {
          color: disabled,
        },
        '&.ready': {
          color: ready,
          $nest: {
            '&:hover': {
              color: readyHover,
              $nest: {
                svg: {
                  animationName,
                  animationDuration: '1s',
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear',
                },
              },
            },
          },
        },
      },
    }),
);

cssRaw(`
.monacoError{
  background:${Colors.red[0]}33
}
.monacoMarginError{
  background:${Colors.red[0]};
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
