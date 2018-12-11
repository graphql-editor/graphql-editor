
import { style } from 'typestyle';
import * as vars from '../../style/vars';

export const ActionButton = style({
    padding: `10px 24px`,
    cursor: 'pointer',
    borderColor: vars.overlayText,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    textAlign: 'center',
    background: vars.overlayBackground,
    color: vars.overlayText,
    transition: vars.transition,
    $nest: {
      '&:hover': {
        background: vars.overlayText,
        color: vars.overlayBackground
      }
    }
  });
  