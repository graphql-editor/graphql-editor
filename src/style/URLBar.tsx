import { style } from 'typestyle';

import * as vars from './vars';

export const URLBar = style({
  display: 'flex',
  flex: 1,
  flexFlow: 'row nowrap',
  alignItems:'center'
});

export const URLBarInput = style({
  alignSelf:'stretch',
  padding:5,
  marginLeft:10,
  borderRadius:4,
  display: 'inline-flex',
  flex:1,
  border: 0,
  background: vars.colorButtonActive,
  color: vars.colorHighlightContra
});

export const URLLoading = style({
  color:vars.colorHighlightContra,
  fontSize:12
})