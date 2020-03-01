import { style } from 'typestyle';
import { Colors, mix, fade } from '../../../Colors';
import { fontFamily, transition } from '../../../vars';

export const Background = style({
  background: mix(Colors.grey[9], Colors.grey[10]),
  height: '100%',
  font: `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`,
});
export const Title = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  width: '100%',
});
export const SearchInput = style({
  padding: 15,
  color: Colors.grey[1],
  fontSize: 12,
  flex: 1,
  background: Colors.grey[9],
  border: 0,
  outline: 0,
  fontFamily,
  $nest: {
    '&::placeholder': {
      color: Colors.grey[5],
    },
  },
});
export const NodeList = style({
  padding: 10,
  overflowY: 'auto',
  height: '100%',
});

export const NodeTitle = style({
  fontSize: 12,
  cursor: 'pointer',
  userSelect: 'none',
  ['-moz-user-select']: '-moz-none',
  padding: 5,
  transition,
});

export const Node = style({
  display: 'flex',
  flexFlow: 'nowrap',
  cursor: 'pointer',
  alignItems: 'center',
  color: Colors.grey[3],
  $nest: {
    '&:hover': {
      backgroundColor: fade(Colors.grey[0], 0.05),
    },
    '&.active': {
      backgroundColor: fade(Colors.grey[0], 0.1),
      color: Colors.green[0],
      fontWeight: 'bold',
    },
  },
});

export const Highlight = style({
  color: Colors.grey[0],
  fontWeight: 'bold',
});

export const NodeIcon = style({
  cursor: 'pointer',
  padding: 5,
  display: 'flex',
  alignItems: 'center',
  transition,
  $nest: {
    '&:hover': {
      color: Colors.grey[0],
    },
  },
});
export const NodeType = style({
  fontSize: 8,
});
export const NodeTypeHoverable = style({
  cursor: 'pointer',
  transition,
  $nest: {
    '&:hover': {
      color: Colors.grey[0],
    },
  },
});
export const NodeSpacer = style({
  borderBottom: `1px solid ${Colors.grey[0]}11`,
  margin: `10px 20px`,
});

// Filters

export const FilterIcon = style({
  padding: 15,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  background: Colors.grey[9],
  color: Colors.grey[1],
  transition,
  $nest: {
    '&:hover': {
      color: Colors.grey[0],
      background: Colors.grey[10],
    },
    '&.active': {
      color: Colors.green[0],
    },
  },
});

export const FilterTable = style({
  display: 'flex',
  flexFlow: 'row wrap',
  padding: 15,
  paddingBottom: 5,
  paddingRight: 5,
  background: Colors.grey[10],
});

export const FilterBlock = style({
  fontFamily,
  fontSize: 10,
  opacity: 0.4,
  padding: `3px 8px`,
  border: `1px solid`,
  marginRight: 10,
  marginBottom: 10,
  userSelect: 'none',
  ['-moz-user-select']: '-moz-none',
  cursor: 'pointer',
  transition,
  $nest: {
    '&.active': {
      opacity: 1.0,
    },
    '&:hover': {
      opacity: 0.8,
    },
  },
});
