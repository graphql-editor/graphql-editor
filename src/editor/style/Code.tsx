import { style } from 'typestyle';

import { sizeSidebar } from '../../vars';
import { Colors } from '../../Colors';

export const Sidebar = style({
  width: sizeSidebar,
  height: '100%',
  flex: 1,
  zIndex: 2,
  transition: 'transform 0.4s, background-color 0.4s',
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
