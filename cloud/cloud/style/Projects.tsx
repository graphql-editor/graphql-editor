import { style, media } from 'typestyle';
import { vars, Colors } from '../../../src';
import { TOP_BAR_HEIGHT } from './UI';

export const Container = style({
  width: '100vw',
  zIndex: 2,
  overflowY: 'auto',
  position: 'relative',
  height:`calc(100% - ${TOP_BAR_HEIGHT}px)`,
});

export const Right = style(
  {
    flex: 1,
    background: Colors.main[7],
    padding: `50px 100px`,
    overflowY: 'auto',
    minHeight:'100%'
  },
  media({ maxWidth: 900 }, { padding: `25px 50px` })
);

export const SearchGrid = style(
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 20,
    gridTemplateRows: 'auto',
    marginBottom: 20
  },
  media({ maxWidth: 1300 }, { gridTemplateColumns: '1fr 1fr' }),
  media({ maxWidth: 900 }, { gridTemplateColumns: '1fr' }),
  media({ maxWidth: 700 }, { gridTemplateColumns: '1fr' })
);

export const TabsGrid = style(
  {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'stretch',
    $nest: {
      a: {
        color: Colors.main[0],
        padding: 15,
        fontSize: 12,
        cursor:'pointer',
        flex: 1,
        textAlign: 'center',
        $nest: {
          '&.active': {
            color: Colors.grey[0],
            background: `${Colors.main[2]} !important`,
            fontWeight: 'bold'
          },
          '&:hover':{
            color: Colors.grey[0],
          }
        }
      },
      'a:nth-of-type(3n+0)': {
        background: Colors.main[5]
      },
      'a:nth-of-type(3n+1)': {
        background: Colors.main[6]
      },
      'a:nth-of-type(3n+2)': {
        background: Colors.main[4]
      }
    }
  },
  media(
    { minWidth: 1300 },
    {
      gridColumnStart: '2',
      gridColumnEnd: '4'
    }
  )
);

export const ProjectsGrid = style(
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    gridGap: 20
  },
  media({ maxWidth: 1300 }, { gridTemplateColumns: '1fr 1fr' }),
  media({ maxWidth: 900 }, { gridTemplateColumns: '1fr' }),
  media({ maxWidth: 700 }, { gridTemplateColumns: '1fr' })
);

export const Title = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.main[2]}`,
  lineHeight: 2.5,
  marginBottom: 10
});
export const TitleLabel = style({
  fontSize: 18,
  userSelect: 'none',
  '-moz-user-select': 'none'
});
export const AddImage = style({
  height: 20,
  marginLeft: 'auto',
  cursor: 'pointer'
});
export const Link = style({
  fontSize: 14,
  cursor: 'pointer',
  padding: `5px 0`,
  fontWeight: 600,
  color: Colors.grey[0],
  opacity: 0.7,
  transition: vars.transition,
  userSelect: 'none',
  '-moz-user-select': 'none',
  $nest: {
    '&.active, &:hover': {
      opacity: 1.0
    }
  }
});
