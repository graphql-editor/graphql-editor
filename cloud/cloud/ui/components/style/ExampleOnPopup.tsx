import { style } from 'typestyle';
import { Colors } from '../../../../../src';

export const Main = style({
    padding:20,
    fontSize:12,
    fontWeight:600,
    color:Colors.grey[2],
    background:Colors.main[6],
    cursor:'pointer',
    $nest:{
        "&:hover":{
            color:Colors.grey[0]
        }
    }
})