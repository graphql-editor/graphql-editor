import { style } from 'typestyle';
import { Colors } from '../../../../../src';
import { TOP_BAR_HEIGHT } from '../../../style/UI';

export const Hint = style({
  fontSize: 11,
  fontWeight: 700,
  background: Colors.grey[10],
  padding: `10px 15px`,
  color: Colors.grey[0],
  opacity: 0.0,
  display: 'none',
  position: 'absolute',
  alignSelf: 'flex-start',
  justifyContent: 'space-between',
  top: TOP_BAR_HEIGHT + 5,
  zIndex: 4,
  textAlign: 'left'
});

export const TopBarIcon = style({
  width: TOP_BAR_HEIGHT,
  height: TOP_BAR_HEIGHT,
  textDecoration:'none',
  fontSize:20,
  lineHeight:1,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: Colors.grey[0],
  $nest: {
    '&.active': {
      color: Colors.yellow[0],
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
    '&:hover': {
      color: Colors.yellow[0],
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
