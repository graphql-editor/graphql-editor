import { style } from 'typestyle';
import { vars, Colors } from '../../../src';

export const Container = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  flex: 1,
  width: 500,
  zIndex: 2,
  overflowY: 'auto',
  position: 'relative',
  maxHeight: '100%'
});

export const Left = style({
  width: 180,
  background: Colors.main[3],
  color: Colors.grey[0],
  alignSelf: 'stretch',
  padding: 10
});

export const Right = style({
  flex: 1,
  background: Colors.grey[1],
  alignSelf: 'stretch',
  display: 'flex',
  flexFlow: 'column nowrap',
  overflowY: 'auto',
  padding: 10
});

export const ProjectsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto',
  gridGap: 10
});

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
