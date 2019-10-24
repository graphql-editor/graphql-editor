import { style } from 'typestyle';

import { Colors } from '../../Colors';
import { sizeSidebar } from '../../vars';

export const Sidebar = style({
  flexBasis: sizeSidebar,
  width: sizeSidebar,
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  background: Colors.grey[8],
  position: 'relative'
});
export const HiderPanel = style({
  width: 30,
  background: Colors.grey[9],
  color: Colors.grey[2],
  fontSize: 12,
  padding: 3
});
export const Hider = style({
  width: 24,
  height: 24,
  marginBottom: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      background: Colors.grey[10]
    },
    '&.active': {
      color: Colors.green[0]
    }
  }
});
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

export const Resizer = style({
  width: 20,
  height: '100%',
  alignSelf: 'stretch',
  justifySelf: 'flex-end',
  zIndex: 6,
  cursor: 'ew-resize',
  position: 'absolute',
  right: -10,
  top: 0,
  bottom: 0,
  $nest: {
    [`&.drag`]: {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      left: 0,
      top: 0
    }
  }
});
