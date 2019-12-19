import { style } from 'typestyle';

import { Colors } from '../../../Colors';

export const Sidebar = style({
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
  background: Colors.grey[8],
  position: 'relative',
});
export const HiderPanel = style({
  width: 30,
  background: Colors.grey[9],
  color: Colors.grey[2],
  fontSize: 12,
  padding: 3,
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
      background: Colors.grey[10],
    },
    '&.active': {
      color: Colors.green[0],
    },
  },
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
      top: 0,
    },
  },
});
