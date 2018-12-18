import { style, classes } from 'typestyle';
import { Colors } from './colors';
import * as vars from './vars';
export const Button = style({
  padding: `10px 18px`,
  borderRadius: 3,
  fontSize: 12,
  transition: vars.transition,
  textAlign: 'center',
  cursor: 'pointer',
  display:'flex',
  alignItems:'center',
  '-moz-user-select': 'none',
  userSelect: 'none',
  $nest: {
    '&.small': {
      padding: `5px 9px`,
      fontSize: 10
    },
    '&.big': {
      padding: `12px 21px`,
      fontSize: 14
    },
    '&.disabled': {
      pointerEvents: 'none',
      opacity: 0.7
    }
  }
});

export const Pink = classes(
  Button,
  style({
    color: Colors.main[0],
    background: 'transparent',
    border: `1px solid`,
    borderColor: Colors.main[0],
    $nest: {
      '&:hover': {
        background: Colors.main[0],
        color: Colors.grey[0]
      },
      '&.active': {
        background: Colors.main[0],
        color: Colors.grey[0]
      }
    }
  })
);

export const Green = classes(
  Button,
  style({
    color: Colors.green[0],
    background: 'transparent',
    border: `1px solid`,
    borderColor: Colors.green[0],
    $nest: {
      '&:hover': {
        background: Colors.green[0],
        color: Colors.grey[0]
      }
    }
  })
);

export const PinkFull = classes(
  Button,
  style({
    background: Colors.main[0],
    border: `1px solid`,
    borderColor: Colors.main[0],
    color: Colors.grey[0]
  })
);
export const RedFull = classes(
  Button,
  style({
    background: Colors.red[0],
    border: `1px solid`,
    borderColor: Colors.red[0],
    color: Colors.grey[0]
  })
);

export const GreenFull = classes(
  Button,
  style({
    background: Colors.green[0],
    border: `1px solid`,
    borderColor: Colors.green[0],
    color: Colors.grey[0]
  })
);
export const GreenMidFull = classes(
  Button,
  style({
    background: Colors.green[2],
    border: `1px solid`,
    borderColor: Colors.green[2],
    color: Colors.grey[0]
  })
);
export const Yellow = classes(
  Button,
  style({
    color: Colors.yellow[0],
    background: 'transparent',
    border: `1px solid`,
    borderColor: Colors.yellow[0],
    $nest: {
      '&:hover': {
        background: Colors.yellow[0],
        color: Colors.grey[0]
      }
    }
  })
);

export const Deploy = classes(
  Button,
  style({
    fontWeight: 700,
    color: Colors.main[7],
    background: Colors.yellow[0],
    border: `1px solid ${Colors.yellow[0]}`
  })
);
