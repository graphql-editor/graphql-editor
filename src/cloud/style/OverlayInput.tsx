import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const Input = style({
  fontWeight: 100,
  alignSelf: 'center',
  textAlign: 'center',
  padding: `20px 0 5px`,
  fontSize: 18,
  letterSpacing: 2,
  background: 'transparent',
  border: 0,
  color: vars.overlayText,
  borderBottomColor: vars.overlayText,
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  $nest: {
    '&::placeholder': {
      color: vars.overlayText
    }
  },
  marginBottom: 25
});
