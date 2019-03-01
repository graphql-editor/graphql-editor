import { style } from 'typestyle';
import { TOP_BAR_HEIGHT } from './UI';

export const Full = style({
  backgroundColor: '#444444',
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingLeft: 0,
  transition: 'padding-left 0.12s linear'
});

export const UiDiagram = style({
  flex: 1,
  width:'100%',
  height:`calc(100% - ${TOP_BAR_HEIGHT}px)`,
  alignSelf: 'stretch',
  display: 'flex',
});
export const UIDiagramFull = style({
  marginLeft:'-100vh'
});
