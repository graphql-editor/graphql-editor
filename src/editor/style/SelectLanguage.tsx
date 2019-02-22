import { style, keyframes } from 'typestyle';
import { Colors } from '../../Colors';

const copyAnim = keyframes({
  '0%': {
    opacity: 0.0
  },
  '25%': {
    opacity: 1.0
  },
  '75%': {
    opacity: 1.0
  },
  '100%': {
    opacity: 0.0
  }
});

export const SelectLangugage = style({
  overflow: 'hidden',
  width: 90,
  background: `url(${require('../assets/arrowDown.png')}) no-repeat right`,
  height: 35,
  outline: 'none',
  marginRight: 'auto',
  backgroundSize: 18
});
export const Select = style({
  background: 'transparent',
  color: Colors.grey[0],
  width: 122,
  padding: 5,
  fontSize: 12,
  lineHeight: 1,
  border: 0,
  borderRadius: 0,
  height: 34,
  outline: 'none',
  $nest: {
    '&:focus': {
      border: 'none',
      outline: 'none'
    },
    '&:-moz-focusring': {
      color: 'transparent',
      textShadow: `0 0 0 ${Colors.grey[0]}`
    },
    option: {
      color: Colors.grey[6]
    }
  }
});
export const Bar = style({
  background: Colors.grey[8],
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyItems: 'flex-end',
  padding: 10
});
export const CopyIcon = style({
  height: 24,
  marginRight: 5,
  cursor: 'pointer'
});
export const Copied = style({
  color: Colors.green[0],
  fontSize: 10,
  marginRight: 10,
  letterSpacing: 1,
  animationName: copyAnim,
  animationDuration: '1s'
});
