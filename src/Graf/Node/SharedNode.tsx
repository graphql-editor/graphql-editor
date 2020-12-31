import { NestedCSSProperties } from 'typestyle/lib/types';
import { Colors } from '@/Colors';

const NodeName: NestedCSSProperties = {
  marginRight: 10,
  color: Colors.grey[0],
  fontSize: 12,
  padding: `5px 0 5px 10px`,
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
};
const NodeType: NestedCSSProperties = {
  color: Colors.main[0],
  fontSize: 12,
  marginRight: 'auto',
  padding: `5px 30px 5px 0`,
};
const NodeIconArea: NestedCSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  width: 24,
  height: 24,
  transition: 'background 0.25s ease-in-out',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: 12,
  $nest: {
    '&:hover': {
      background: '#0003',
    },
  },
};
export const NodeTitle: NestedCSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  color: Colors.grey[0],
  fontSize: 14,
  padding: `5px 0 5px 10px`,
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
  $nest: {
    '.NodeName': NodeName,
    '.NodeType': NodeType,
    '.NodeIconArea': NodeIconArea,
  },
};
