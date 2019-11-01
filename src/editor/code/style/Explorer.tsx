import { style } from 'typestyle';
import { Colors, mix } from '../../../Colors';
import { fontFamily } from '../../../vars';

export const Background = style({
  background: mix(Colors.grey[9], Colors.grey[10]),
  height: '100%',
  font: `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
});
export const Title = style({
  padding: 15,
  color: Colors.grey[1],
  fontSize: 12,
  width: '100%',
  background: `${Colors.grey[10]}55`,
  border: 0,
  outline: 0,
  fontFamily,
  $nest: {
    '&::placeholder': {
      color: Colors.grey[5]
    }
  }
});
export const NodeList = style({
  padding: 10,
  overflowY: 'auto',
  height: '100%'
});
export const Node = style({
  display: 'flex',
  flexFlow: 'nowrap',
  alignItems: 'center',
  color: Colors.grey[3],
  $nest: {
    '&.active': {
      color: Colors.green[0]
    }
  }
});

export const NodeIcon = style({
  cursor: 'pointer',
  padding: 5,
  display: 'flex',
  alignItems: 'center'
});

export const NodeTitle = style({
  fontSize: 12,
  cursor: 'pointer',
  userSelect: 'none',
  ['-moz-user-select']: '-moz-none',
  padding: 5
});

export const NodeType = style({
  fontSize: 8,
  userSelect: 'none',
  ['-moz-user-select']: '-moz-none'
});
