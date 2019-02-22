import { style } from 'typestyle';
import { Colors } from '../../../src';

const ICON_SIZE = 60;

export const Hint = style({
  fontSize: 12,
  fontWeight: 700,
  background: Colors.yellow[0],
  padding: 10,
  borderRadius: 3,
  color: Colors.grey[8],
  opacity: 0.0,
  display: 'none',
  position: 'absolute',
  alignSelf: 'flex-start',
  justifyContent:'space-between',
  top: ICON_SIZE+15,
  textAlign: 'left'
});

export const TopBarIcon = style({
  width: ICON_SIZE,
  height: ICON_SIZE,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  $nest: {
    '&.active': {
      background: Colors.yellow[0],
      $nest: {
        img: {
          filter: 'invert(100%)'
        }
      }
    },
    '&.right': {
      $nest: {
        '.hint': {
          alignSelf: 'flex-end'
        }
      }
    },
    img: {
      width: 'auto',
    },
    '&:hover': {
      background: Colors.yellow[0],
      cursor: 'pointer',
      $nest: {
        img: {
          filter: 'invert(100%)'
        },
        '.hint': {
          display: 'block',
          opacity: 1.0
        }
      }
    }
  }
});
