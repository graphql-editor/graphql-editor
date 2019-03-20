import { style } from 'typestyle';
import { Colors, vars } from '../../../../../src';
import { TOP_BAR_HEIGHT } from '../../../../constants';

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
  zIndex: 8,
  textAlign: 'left'
});

export const TopBarIcon = style({
  width: TOP_BAR_HEIGHT,
  height: TOP_BAR_HEIGHT,
  textDecoration: 'none',
  fontSize: 20,
  lineHeight: 1,
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
export const IconButton = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  background: Colors.main[4],
  width: 150,
  color: Colors.grey[0],
  fontWeight:700,
  padding: 12,
  fontSize: 12,
  cursor: 'pointer',
  $nest: {
    span: {
      marginRight: 15,
      lineHeight: `18px`,
      transition: vars.transition
    },
    i: {
      verticalAlign: 'center',
      fontSize: 18,
      lineHeight: `18px`
    }
  }
});

export const IconButtonVariants = {
  Red: style({
    background: Colors.red[3]
  }),
  Blue: style({
    background: Colors.blue[3]
  }),
  Green: style({
    background: Colors.green[3]
  }),
  Main: style({
    background: Colors.main[3]
  }),
  Yellow: style({
    background: Colors.yellow[3]
  })
};
export const IconButtonHoverAnimations = {
  Shrink: style({
    $nest: {
      '&:hover': {
        $nest: {
          span: {
            marginRight: 5
          }
        }
      }
    }
  }),
  Expand: style({
    $nest: {
      '&:hover': {
        $nest: {
          span: {
            marginRight: 25
          }
        }
      }
    }
  })
};
