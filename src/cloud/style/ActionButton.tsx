import { style } from 'typestyle';
import * as vars from '../../style/vars';

export const ActionButton = style({
  padding: `10px 24px`,
  cursor: 'pointer',
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

export const Disabled = style({
  opacity: 0.3,
  $nest: {
    '&:hover': {
      background: vars.overlayBackground,
      color: vars.overlayText
    }
  }
});

export const Active = style({
  color: vars.colorHighlightContra,
  $nest: {
    '&:hover': {
      background: vars.overlayBackground,
      color: vars.colorHighlightContra
    }
  }
});
