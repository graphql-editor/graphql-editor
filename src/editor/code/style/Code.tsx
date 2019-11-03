import { style } from 'typestyle';
import { Colors } from '../../../Colors';
import * as vars from '../../../vars';

export const CodeContainer = style({
  flex: 1,
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'column'
});
export const Marker = style({
  background: 'red'
});
export const ErrorLonger = style({
  position: 'absolute',
  background: Colors.red[0],
  color: Colors.grey[0],
  padding: 10,
  fontSize: 10,
  maxWidth: 200,
  margin: 5,
  borderRadius: 5,
  right: 0,
  letterSpacing: 1,
  zIndex: 3
});
export const FullScreenIcon = style({
  cursor: 'pointer',
  display: 'flex',
  color: Colors.grey[0],
  transition: vars.transition,
  padding: `0 10px`,
  $nest: {
    '&:hover,&.active': {
      color: Colors.green[0]
    }
  }
});

export const Generate = style({
  marginLeft: 'auto',
  color: Colors.green[3],
  padding: `2px 6px`,
  cursor: 'pointer',
  fontSize: 10,
  textTransform: 'lowercase',
  borderRadius: 3,
  fontWeight: 'bold',
  $nest: {
    '&.disabled': {
      color: Colors.grey[6]
    }
  }
});
