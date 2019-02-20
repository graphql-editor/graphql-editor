import { style } from 'typestyle';
import { Colors } from '../../../src';

export const Tile = style({
  height:180,
  padding:20,
  background: Colors.main[6],
  display: 'flex',
  color: Colors.grey[0],
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
  fontSize: 14,
  fontWeight: 600
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
  justifyContent: 'flex-end',
  marginTop:'auto'
});
