import { style, keyframes } from 'typestyle';
import { Colors, mix } from '../../../../src';
import { TOP_BAR_HEIGHT } from '../../../constants';

const blink = keyframes({
  '0%': {
    color: Colors.grey[3]
  },
  '10%': {
    color: Colors.grey[0]
  },
  '50%': {
    color: Colors.grey[0]
  },
  '60%': {
    color: Colors.grey[3]
  },
  '70%': {
    color: Colors.grey[0]
  },
  '80%': {
    color: Colors.grey[3]
  },
  '100%': {
    color: Colors.grey[3]
  }
});

export const UI = style({
  height: '100vh'
});
export const TopBar = style({
  background: mix(Colors.grey[9], Colors.main[9]),
  display: 'flex',
  flexFlow: 'row nowrap',
  zIndex: 3,
  justifyContent: 'space-between',
  width: '100%',
  height: TOP_BAR_HEIGHT,
  flex: 'none'
});
export const Center = style({
  margin: 'auto',
  color: Colors.grey[0],
  fontSize: 13,
  fontWeight: 400,
  animationName: blink,
  animationDuration: '3s'
});
export const Left = style({
  marginRight: 'auto',
  display: 'flex',
  flexFlow: 'row nowrap'
});
export const Right = style({
  marginLeft: 'auto',
  display: 'flex',
  flexFlow: 'row nowrap'
});
