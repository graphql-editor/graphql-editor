import { style } from 'typestyle';
import { Colors } from '../../../../../src';

export const Text = style({
  color: Colors.grey[0],
  display: 'none',
  fontSize: 12,
  position: 'absolute'
});
export const Main = style({
  height: 50,
  width: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  cursor: 'pointer',
  color:Colors.grey[0],
  $nest: {
    '&:hover': {
      background:Colors.main[8]
    }
  }
});
export const Open = style({
});
export const Fork = style({
});
export const Delete = style({
});
export const Edit = style({
});
