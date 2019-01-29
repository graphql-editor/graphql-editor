import { style } from 'typestyle';

import { sizeSidebar } from '../../vars';
import { Colors } from '../../Colors';

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
