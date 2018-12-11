import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const Overlay = style({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  background: vars.overlayBackground,
  color: vars.overlayText,
  zIndex: 3,
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  padding:20
});

export const CloseButton = style({
  position: 'absolute',
  right: 0,
  top:0,
  padding:20,
  fontSize: 18,
  cursor:'pointer',
  color: vars.overlayText
});
