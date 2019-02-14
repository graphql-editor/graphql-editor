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
export const FileButton = style({
  position: 'relative',
  overflow: 'hidden',
  margin: 10
});
export const FileButtonLayer = style({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: 0,
  padding: 0,
  fontSize: 12,
  cursor: 'pointer',
  opacity: 0
});
