import { style } from 'typestyle';

import * as vars from './vars';

export const ButtonElementIcon = style({
  marginRight: 8,
});

export const Button = style({
  backgroundColor: vars.colorButton,
  border: 0,
  color: 'white',
  borderRadius: 4,
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',
});

export const ButtonReactive = style({
  cursor: 'pointer',
  transition: 'background-color 0.12s linear',
  $nest: {
    [`.${ButtonElementIcon}`]: {
      transition: 'background-color 0.12s linear',
    },
    '&:hover': {
      backgroundColor: vars.colorButtonHover,
      $nest: {
        [`.${ButtonElementIcon}`]: {
          backgroundColor: vars.colorHighlightContra,
        },
      }
    },
    '&:active': {
      backgroundColor: vars.colorButtonActive,
      $nest: {
        [`.${ButtonElementIcon}`]: {
          backgroundColor: vars.colorHighlightContra,
        },
      }
    },
    '&:focus': {
      outline: 0
    }
  },
});

export const ButtonMedium = style({
  padding: 10,
});

export const ButtonRounded = style({
  borderRadius: '100%',
});
