import { style } from 'typestyle';
import { Colors } from '../../../src';

export const SearchInput = style({
  background: Colors.grey[0],
  color: Colors.main[5],
  borderRadius: 3,
  padding: 10,
  alignSelf: 'stretch',
  border: 0,
  $nest: {
    '&::placeholder': {
      color: Colors.main[5],
      opacity: 0.8
    }
  }
});

export const SearchForm = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'column nowrap',
  marginBottom:10
});
