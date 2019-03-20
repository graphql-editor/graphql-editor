import { style, classes } from 'typestyle';
import { Colors } from '../../../../../src';

export const Tile = style({
  background: `${Colors.grey[0]}11`,
  display: 'flex',
  color: Colors.grey[0],
  flexFlow: 'column nowrap',
  minHeight:220,
  maxHeight:'100%',
  minWidth:0
});

export const Top = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  alignSelf: 'stretch',
  padding: `20px 40px`
});
export const Name = style({
  fontSize: 14,
  fontWeight: 600
});
export const Updated = style({
  fontSize: 10,
  marginLeft: 'auto',
  fontWeight: 300
});
export const Tags = style({
  display: 'flex',
  flexFlow: 'row wrap',
  padding:`0 40px`,
  $nest: {
    a: {
      padding: `5px 12px`,
      color: Colors.grey[0],
      fontSize: 10,
      display:'inline-flex',
      fontWeight: 'bold',
      cursor:'pointer'
    },
    'a:nth-of-type(5n+0)': {
      background: Colors.main[3]
    },
    'a:nth-of-type(5n+1)': {
      background: Colors.green[3]
    },
    'a:nth-of-type(5n+2)': {
      background: Colors.blue[3]
    },
    'a:nth-of-type(5n+3)': {
      background: Colors.red[3]
    },
    'a:nth-of-type(5n+4)': {
      background: Colors.yellow[3]
    }
  }
});
export const Description = style({
  fontSize:12,
  height:70,
  padding:`10px 40px`,
}) 
export const Actions = style({
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  marginTop: 'auto',
});
export const NewTile = classes(
  Tile,
  style({
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.green[0],
    borderStyle: 'dashed',
    background: 'transparent',
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        background: Colors.green[4]
      }
    }
  })
);
export const NewProject = style({
  fontWeight: 'bolder',
  fontSize: 12
});
