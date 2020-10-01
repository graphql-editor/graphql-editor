import { style } from 'typestyle';

import { Colors } from '@/Colors';
import { menuWidth } from '@/vars';

export const HiderPanel = style({
  width: menuWidth,
  background: Colors.main[10],
  color: Colors.grey[7],
  fontSize: 12,
  padding: 3,
  zIndex: 3,
});
export const Hider = style({
  width: 42,
  height: 42,
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
      color: Colors.pink[0],
    },
  },
});
