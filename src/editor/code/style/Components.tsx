import { style } from 'typestyle';
import { Colors } from '../../../Colors';
import { fontFamily } from '../../../vars';

export const TitleOfPane = style({
  padding: 15,
  fontFamily,
  fontSize: 14,
  textTransform: 'uppercase',
  color: Colors.blue[3],
  background: Colors.grey[10],
  letterSpacing: 1,
  display: 'flex',
  alignItems: 'center'
});
