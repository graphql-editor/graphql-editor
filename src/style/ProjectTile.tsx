import { style } from 'typestyle';
import { Colors } from './colors';

export const Tile = style({
  padding: 10,
  background: Colors.grey[0],
  display: 'flex',
  color: Colors.grey[7],
  flexFlow: 'column nowrap'
});

export const Top = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  alignSelf: 'stretch'
});
export const Name = style({
  fontSize: 18,
  fontWeight: 700
});
export const Updated = style({
  fontSize: 10,
  marginLeft:'auto',
  fontWeight: 300
});
export const Slug = style({
  fontSize: 8,
  fontWeight: 300,
  alignSelf: 'stretch'
});
export const Actions = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end'
});
