import { style } from 'typestyle';
import { Colors } from '../../Colors';

export const Editor = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignSelf: 'stretch',
  flex: 1,
});

export const FullScreenContainer = style({
  flex: 1,
  alignSelf: 'stretch',
  height: '100%',
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
  letterSpacing: 1,
});

export const Sidebar = style({
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
  background: Colors.grey[8],
  position: 'relative',
});
