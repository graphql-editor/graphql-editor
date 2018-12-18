import { style } from 'typestyle';
import { Colors } from './colors';

export const SelectLangugage = style({
  overflow: 'hidden',
  width: 90,
  background: `url(${require('../assets/export/arrowDown.png')}) no-repeat right`,
  height: 35,
  outline: 'none',
  backgroundSize: 18
});
export const Select = style({
  background: 'transparent',
  color: Colors.grey[0],
  width: 122,
  padding: 5,
  fontSize: 12,
  lineHeight: 1,
  border: 0,
  borderRadius: 0,
  height: 34,
  outline: 'none',
  $nest: {
    '&:focus': {
      border: 'none',
      outline: 'none'
    },
    '&:-moz-focusring': {
      color: 'transparent',
      textShadow: `0 0 0 ${Colors.grey[0]}`
    },
    option: {
      color: Colors.grey[6]
    }
  }
});
export const Bar = style({
  background: Colors.grey[7],
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  padding: 5
});
export const CopyIcon = style({
  marginLeft: 'auto',
  height: 24,
  marginRight: 5,
  cursor: 'pointer'
});
