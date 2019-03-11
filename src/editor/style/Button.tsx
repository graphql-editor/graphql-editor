import { style, classes } from 'typestyle';
import { Colors } from '../../Colors';
export const Button = style({
  fontSize: 12,
  border: `1px solid`,
  borderRadius: 5,
  padding: `5px 12px`,
  background: 'transparent',
  cursor: 'pointer',
  boxShadow: 'none',
  $nest: {
    '&:hover': {
      border: `1px solid transparent`,
      boxShadow: 'none'
    }
  }
});
export const PinkButton = classes(
  Button,
  style({
    color: Colors.main[0],
    $nest: {
      '&:hover': {
        background: Colors.main[0],
        color: Colors.grey[7]
      }
    }
  })
);
export const GreenButton = classes(
  Button,
  style({
    color: Colors.green[0],
    $nest: {
      '&:hover': {
        background: Colors.green[0],
        color: Colors.grey[7]
      }
    }
  })
);
export const YellowButton = classes(
  Button,
  style({
    color: Colors.yellow[0],
    $nest: {
      '&:hover': {
        background: Colors.yellow[0],
        color: Colors.grey[7]
      }
    }
  })
);