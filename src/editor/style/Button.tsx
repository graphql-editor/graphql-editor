import { style } from 'typestyle';
import { Colors } from '../../Colors';
import * as vars from '../../vars';
export const GenerateButton = style({
  fontSize: 12,
  padding: `5px 12px`,
  cursor: 'pointer',
  borderColor: `${Colors.blue[0]}66`,
  border: `1px solid`,
  color: `${Colors.blue[0]}88`,
  transition: vars.transition,
  background: `${Colors.grey[9]}88`,
  $nest: {
    '&:hover': {
      color: `${Colors.blue[0]}ff`,
      borderColor: `${Colors.blue[0]}ff`,
      background: `${Colors.grey[9]}ff`
    }
  }
});
