import { style } from 'typestyle';
import { Colors } from '../../../../../src';

export const CreateButton = style({
  color: Colors.main[7],
  background: Colors.yellow[0],
  fontSize: 12,
  fontWeight: 'bold',
  cursor:'pointer',
  padding:`15px 36px`,
  $nest:{
    "&:hover":{
      
    }
  }
});
