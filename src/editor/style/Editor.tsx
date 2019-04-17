import { style } from 'typestyle';
import { Colors } from '../../Colors';

export const Editor = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignSelf: 'stretch',
  flex: 1
});

export const DiagramContainer = style({
  flex: 1,
  alignSelf: 'stretch'
});
export const ErrorContainer = style({
  position: 'absolute',
  right: 280,
  width: 300,
  padding: 20,
  color: Colors.red[0],
  background: `${Colors.grey[9]}dd`,
  marginTop: 10,
  fontSize: 12,
  letterSpacing: 1
});
