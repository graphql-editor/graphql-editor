import { style } from 'typestyle';
import { Colors } from './Colors';
export const UI = style({
  height: '100vh',
  display: 'flex',
  flexFlow: 'column nowrap'
});
export const TopBar = style({
  padding: 8,
  background: Colors.grey[6],
  display: 'flex',
  flexFlow: 'row nowrap',
  zIndex: 2,
  justifyContent: 'space-between',
  width: '100%'
});
export const Center = style({
  margin: 'auto',
  color: Colors.grey[3],
  letterSpacing: 2,
  fontSize: 14,
  fontWeight: 100
});
export const Left = style({
  marginRight: 'auto',
  display: 'flex',
  flexFlow: 'row nowrap'
});
export const Right = style({
  marginLeft: 'auto',
  display: 'flex',
  flexFlow: 'row nowrap'
});
