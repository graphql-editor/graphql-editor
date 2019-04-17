import { style } from 'typestyle';

import { Colors } from '../../Colors';
import { sizeSidebar } from '../../vars';

export const Sidebar = style({
  width: sizeSidebar,
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  background: Colors.grey[8],
  position: 'relative'
});

export const CodeContainer = style({
  flex: 1,
  overflowY: 'auto',
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

export const Resizer = style({
  width: 20,
  marginLeft: -10,
  alignSelf: 'stretch',
  justifySelf: 'flex-end',
  zIndex: 6,
  cursor: 'ew-resize'
});
