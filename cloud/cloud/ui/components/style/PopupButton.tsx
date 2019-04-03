import { style } from 'typestyle';
import { Colors } from '../../../../../src';
import { transition } from '../../../../../src/vars';

export const Main = style({
  height: 40,
  width: 120,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexFlow: 'row nowrap',
  cursor: 'pointer',
  color: Colors.grey[9],
  verticalAlign: 'middle',
  fontSize: 12,
  fontWeight:"bold",
  transition,
  marginRight: 5,
  $nest: {
    span: {
      marginRight: 10
    },
    '&:hover': {
      color: Colors.grey[0]
    }
  }
});
export const Green = style({
  background: Colors.green[0],
  $nest: {
    '&:hover': {
      background: Colors.green[5]
    }
  }
});
export const Red = style({
  background: Colors.red[0],
  $nest: {
    '&:hover': {
      background: Colors.red[5]
    }
  }
});
export const Yellow = style({
  background: Colors.yellow[0],
  $nest: {
    '&:hover': {
      background: Colors.yellow[5]
    }
  }
});
