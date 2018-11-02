import { style } from 'typestyle';

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
  color: '#ffffff44',
  background: '#ffffff11',
  cursor: 'pointer'
});

export const active = style({
  background: '#00000011',
  color: '#fff',
})