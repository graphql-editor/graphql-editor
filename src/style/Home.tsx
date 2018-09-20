import { style } from 'typestyle';


export const Editor = style({
  position: 'absolute',
  width: 500,
  zIndex: 2,
  height: '100vh',
  background: '#000000aa',
  overflowY:'auto',
  overflowX:'hidden',
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
  padding: 20,
  paddingTop:100
});
export const ClickInfo = style({
  color:'#ffffffdd',
  position:'absolute',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  top:0,
  textAlign:'center',
  width:50,
  height:50,
  fontSize:25,
  right:0,
  padding:20,
  background:'#000000dd',
  cursor:'pointer'
})