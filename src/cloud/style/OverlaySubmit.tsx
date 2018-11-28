import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const Submit = style({
  padding: 20,
  borderStyle: 'solid',
  borderColor: vars.overlayText,
  borderWidth: 2,
  opacity: 0,
  transition: '.25s all',
  alignSelf: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase'
});
export const SubmitVisible = style({
  opacity: 1.0
});
