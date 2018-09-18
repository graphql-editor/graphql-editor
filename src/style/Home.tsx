import { style } from 'typestyle';


export const Editor = style({
  position: 'absolute',
  width: 500,
  zIndex: 2,
  minHeight: '100vh',
  background: '#000000aa',
  transition:'all 0.5s'
});
export const ShowEditor = style({
  left: 0
});
export const HideEditor = style({
  left: -450
});
export const Full = style({
  position: 'relative',
  width: '100%',
  height: '100%'
});
export const Pre = style({
  padding: 20
});
