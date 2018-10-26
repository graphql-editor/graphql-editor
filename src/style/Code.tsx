import { style } from 'typestyle';

import { sizeSidebar } from './vars';

export const Sidebar = style({
  position: 'fixed',
  width: sizeSidebar,
  zIndex: 2000,
  height: '100vh',
  transition: 'transform 0.4s, background-color 0.4s',
  display: 'flex',
  left: 0,
  top: 0,
  flexDirection: 'column',
  background: '#000000aa',
  transform: 'translate(0,0)',
});

export const SidebarHidden = style({
  background: 'transparent',
  transform: `translate(${-sizeSidebar + 50}px,0)`
});

export const Pre = style({
  padding: 20
});

export const Toolbar = style({
  flex: '0 0 52px',
  padding: 8,
  display: 'flex',
  background: '#00000033',
  alignItems:'center',
  justifyContent: 'flex-end'
});

export const ToolbarHidden = style({
  borderBottomRightRadius: 16
});

export const CodeContainer = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden'
});

export const CodeContainerHidden = style({
  flex: 1,
  overflowY: 'hidden'
});

export const SidebarControl = style({
  marginLeft: 12
});

export const FlippedButton = style({
  transform: 'rotate(180deg)'
});

export const Tabs = style({
  position: 'relative',
  display: 'flex',
  background: '#ffffff11'
});
export const Tab = style({
  display: 'inline-flex',
  padding: '10px 24px',
  borderRight: '1px solid #00000022',
  fontSize: 12,
  color: '#fff',
  background: '#ffffff05',
  cursor: 'pointer'
});
