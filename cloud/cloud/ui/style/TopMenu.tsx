import { style } from 'typestyle';
import { Colors } from '../../../../src';
import { TOP_BAR_HEIGHT } from '../../../constants';
export const TopMenuWrapper = style({
  marginLeft: 5,
  width: 20,
  display: 'inline-flex'
});
export const TopMenuArrow = style({
  width: 30,
  height: 30,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  userSelect: 'none',
  '-moz-user-select': 'none',
  justifyContent: 'center',
  opacity: 0.6,
  $nest: {
    '&:hover': {
      opacity: 1.0
    }
  }
});
export const TopMenu = style({
  background: Colors.grey[10],
  position: 'absolute',
  zIndex: 5,
  padding: `10px 18px`,
  marginLeft: -120,
  textAlign: 'left',
  top: TOP_BAR_HEIGHT + 5
});

export const TopMenuItem = style({
  color: Colors.grey[3],
  display: 'block',
  cursor: 'pointer',
  fontSize: 11,
  lineHeight: `24px`,
  fontWeight: 'bold',
  $nest: {
    '&:hover': {
      color: Colors.green[0]
    }
  }
});

export const FileButton = style({
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  color: Colors.grey[3],
  background: 'transparent',
  padding: 0,
  border: 0,
  margin: 0,
  lineHeight: `24px`,
  fontSize: 11,
  fontWeight: 'bold',
  fontFamily: 'inherit',
  textAlign: 'left',
  $nest: {
    '&:hover': {
      color: Colors.green[0]
    }
  }
});
export const FileButtonLayer = style({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: 0,
  padding: 10,
  lineHeight: `24x`,
  fontSize: 11,
  cursor: 'pointer',
  opacity: 0
});

export const TopMenuInput = style({
  color: Colors.grey[3],
  width: 200,
  background: 'transparent',
  border: 0,
  display: 'block',
  fontSize: 11,
  lineHeight: `24px`,
  fontWeight: 'bold',
  borderBottom: `solid 1px ${Colors.grey[3]}`,
  $nest: {
    '&:focus': {
      color: Colors.green[0]
    }
  }
});
