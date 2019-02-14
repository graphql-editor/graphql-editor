import { style } from 'typestyle';

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
  height:'100%',
  alignSelf: 'stretch',
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr auto'
});
export const UIDiagramFull = style({
  gridTemplateColumns: '1fr'
});
