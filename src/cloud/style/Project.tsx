import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const Project = style({
  width: 240,
  height: 140,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth:2,
  borderColor: vars.overlayText,
  borderStyle:"solid",
  borderRadius:10
});
export const Name = style({
  textTransform: 'uppercase'
});
