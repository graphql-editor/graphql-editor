import { style } from 'typestyle';

import { Colors } from '../../Colors';

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
