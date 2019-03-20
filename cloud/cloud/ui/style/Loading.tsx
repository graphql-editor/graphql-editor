import { style, keyframes } from 'typestyle';
import {  Colors } from '../../../../src';
import { TOP_BAR_HEIGHT } from '../../../constants';
const fadeIn = keyframes({
  '0%': {
    width: '0%'
  },
  '10%': {
    width: '0%'
  },
  '11%': {
    width: '20%'
  },
  '30%': {
    width: '20%'
  },
  '31%': {
    width: '45%'
  },
  '80%': {
    width: '80%'
  },
  '88%': {
    width: '80%'
  },
  '100%': {
    width: '100%'
  }
});

const loading = keyframes({
  '0%': {
    opacity: 0.0
  },
  '10%': {
    opacity: 1.0
  },
  '90%': {
    opacity: 1.0
  },
  '100%': {
    opacity: 0.0
  }
});

export const Text = style({
  animationName: loading,
  animationDuration: '3s',
  animationIterationCount: 'infinite',
  color: Colors.grey[0],
  fontWeight:700,
  fontSize:12,
  padding: 10,
  maxWidth: 640
});
export const Err = style({
  padding: 10,
  color: 'red',
  maxWidth: 640
});
export const Main = style({
  top: 0,
  left: 0,
  position: 'fixed',
  zIndex: 7,
  background: Colors.main[3],
  animationName: fadeIn,
  animationDuration: '2s',
  animationIterationCount: 1,
  width: '100%',
  height: TOP_BAR_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
});
