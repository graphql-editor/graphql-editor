import { style, classes } from 'typestyle';
import { vars, Colors } from '../../../../../src';
export const Button = style({
  padding: `10px 24px`,
  fontSize: 11,
  fontWeight: 700,
  transition: vars.transition,
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '-moz-user-select': 'none',
  textDecoration: 'none',
  userSelect: 'none',
  borderRadius: 1,
  $nest: {
    '&.top': {
      fontSize: 10,
      border: 0
    },
    '&.small': {
      padding: `5px 12px`,
      fontSize: 10
    },
    '&.big': {
      padding: `12px 21px`,
      fontSize: 14
    },
    '&.disabled': {
      pointerEvents: 'none',
      opacity: 0.5
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
    background: Colors.main[6],
    border: `1px solid`,
    borderColor: Colors.main[0],
    color: Colors.grey[0],
    $nest: {
      '&:hover': {
        background: Colors.grey[8],
        color: Colors.main[0]
      }
    }
  })
);
export const RedFull = classes(
  Button,
  style({
    background: Colors.red[6],
    border: `1px solid`,
    borderColor: Colors.red[0],
    color: Colors.grey[0],
    $nest: {
      '&:hover': {
        background: Colors.grey[8],
        color: Colors.red[0]
      }
    }
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
    background: Colors.green[6],
    border: `1px solid`,
    borderColor: Colors.green[2],
    color: Colors.grey[0],
    $nest: {
      '&:hover': {
        background: Colors.grey[8],
        color: Colors.green[0]
      }
    }
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
export const Grey = classes(
  Button,
  style({
    color: Colors.grey[5],
    background: 'transparent',
    border: `1px solid`,
    borderColor: Colors.grey[5],
    $nest: {
      '&:hover': {
        background: Colors.grey[5],
        color: Colors.grey[0]
      }
    }
  })
);

export const DeployNeon = classes(
  Button,
  style({
    fontWeight: 700,
    color: Colors.grey[0],
    background: Colors.yellow[5],
    border: `1px solid ${Colors.yellow[0]}`,
    $nest: {
      '&:hover': {
        background: Colors.grey[8],
        color: Colors.yellow[0]
      }
    }
  })
);
