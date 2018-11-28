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
  justifyContent:'center'
});
