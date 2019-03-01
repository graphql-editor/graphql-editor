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
  $nest: {
    '&:hover': {
      background:Colors.main[8]
    }
  }
});
export const Open = style({
  background: Colors.main[5]
});
export const Fork = style({
  background: Colors.main[7]
});
export const Delete = style({
  background: Colors.main[3]
});
export const Edit = style({
  background: Colors.main[4]
});
