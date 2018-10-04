import { style } from 'typestyle';
import { sizeSidebar } from './vars';

export const Full = style({
  backgroundColor: '#444444',
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingLeft: 0,
  transition: 'padding-left 0.12s linear',
});

export const Pinned = style({
  paddingLeft: sizeSidebar
});
