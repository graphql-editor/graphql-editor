import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const OverlayButton = style({
  color: vars.overlayText,
  padding: `10px 24px`,
  borderColor:vars.overlayText,
  cursor:"pointer",
  borderRadius:3,
  textAlign:'center',
  borderWidth:1,
  letterSpacing:2,
  borderStyle:'solid'
});
