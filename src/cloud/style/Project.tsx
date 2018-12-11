import { style } from 'typestyle';
import * as vars from '../../style/vars';
export const Project = style({
  height: 140,
  display: 'flex',
  flexFlow: 'column nowrap',
  borderWidth: 2,
  borderColor: vars.overlayText,
  padding: 5,
  borderStyle: 'solid',
  borderRadius: 10
});
export const Name = style({
  marginTop: 'auto',
  alignSelf: 'center',
  textTransform: 'uppercase',
  letterSpacing:2,
  marginBottom:5
});
export const Delete = style({
  fontSize: 18,
  alignSelf: 'flex-end',
  cursor: 'pointer',
  padding: 10
});
export const Actions = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: 5,
  padding: 5
});
export const fakerURL = style({
  marginBottom: 'auto',
  textAlign:'center',
  textDecoration: 'none',
  color: vars.colorHighlightContra
});
