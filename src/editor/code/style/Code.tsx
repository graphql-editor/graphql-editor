import { keyframes, style, cssRaw } from 'typestyle';
import { Colors } from '../../../Colors';
import * as vars from '../../../vars';

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
export const Marker = style({
  background: 'red',
});
export const ErrorLonger = style({
  position: 'absolute',
  background: Colors.red[0],
  color: Colors.grey[0],
  padding: 10,
  fontSize: 10,
  maxWidth: 200,
  margin: 5,
  borderRadius: 5,
  right: 0,
  letterSpacing: 1,
  zIndex: 3,
});
export const FullScreenIcon = style({
  cursor: 'pointer',
  display: 'flex',
  color: Colors.grey[0],
  transition: vars.transition,
  padding: `0 10px`,
  $nest: {
    '&:hover,&.active': {
      color: Colors.green[0],
    },
  },
});

export const Generate = style({
  marginLeft: 'auto',
  color: Colors.green[3],
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
      color: Colors.grey[6],
    },
    '&.ready': {
      color: Colors.grey[0],
      $nest: {
        '&:hover': {
          color: Colors.green[0],
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
});

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
