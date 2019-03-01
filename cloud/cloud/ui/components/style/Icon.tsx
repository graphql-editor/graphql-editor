import { style } from 'typestyle';
import { Colors } from '../../../../../src';
import { TOP_BAR_HEIGHT } from '../../../style/UI';


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
  top: TOP_BAR_HEIGHT+15,
  zIndex:4,
  textAlign: 'left'
});

export const TopBarIcon = style({
  width: TOP_BAR_HEIGHT,
  height: TOP_BAR_HEIGHT,
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
