import { style } from 'typestyle';
import { Colors } from '../../../../../src';

export const Input = style({
  background: Colors.main[8],
  color: Colors.main[0],
  padding: 15,
  fontSize:12,
  width:"100%",
  border: 0,
  $nest: {
    '&::placeholder': {
      color: Colors.grey[3],
      opacity: 0.8
    }
  }
});

export const Form = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'column nowrap',
});
