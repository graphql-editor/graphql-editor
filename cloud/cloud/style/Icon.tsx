import { style } from 'typestyle';
import { Colors } from '../../../src';

const ICON_SIZE = 48;

export const Hint = style({
  fontSize: 12,
  fontWeight:700,
  background: Colors.yellow[0],
  padding: 10,
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  color: Colors.grey[8],
  opacity: 0.0,
  position: 'absolute',
  alignSelf: 'baseline',
  marginTop: ICON_SIZE + 5,
  textAlign: 'left',
});

export const TopBarIcon = style({
  width: ICON_SIZE,
  height: ICON_SIZE,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  $nest: {
    '&.active': {
      background: Colors.yellow[0],
      $nest: {
        img: {
          filter: 'invert(100%)'
        }
      }
    },
    img: {
      height: ICON_SIZE - 25,
      width: 'auto'
    },
    '&:hover': {
      background: Colors.yellow[0],
      cursor: 'pointer',
      $nest: {
        img: {
          filter: 'invert(100%)'
        },
        '.hint': {
          opacity: 1.0
        }
      }
    }
  }
});
