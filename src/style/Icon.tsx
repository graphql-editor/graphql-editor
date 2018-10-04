import { style } from 'typestyle';

import { colorHighlight, colorDisabled, colorDisabledHighlight } from './vars';

export const Icon = style({
  display: 'inline-block',
  backgroundColor: 'white',
});

export const IconActive = style({
  backgroundColor: colorHighlight,
});

export const IconDisabled = style({
  backgroundColor: colorDisabled,
});

export const IconDisabledActive = style({
  backgroundColor: colorDisabledHighlight,
});
