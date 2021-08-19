import { NestedCSSProperties } from 'typestyle/lib/types';
import { themed } from '@/Theming/utils';

const NodeName = themed<NestedCSSProperties>(({ text }) => ({
  marginRight: 10,
  color: text,
  fontSize: 12,
  padding: `5px 0 5px 10px`,
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
}));
const NodeType = themed<NestedCSSProperties>(({ text }) => ({
  color: text,
  fontSize: 12,
  marginRight: 'auto',
  padding: `5px 30px 5px 0`,
}));
const NodeIconArea = themed<NestedCSSProperties>(
  ({ background: { mainFurthest } }) => ({
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
        background: mainFurthest,
      },
    },
  }),
);
export const NodeTitle = themed<NestedCSSProperties>((theme) => ({
  display: 'flex',
  alignItems: 'stretch',
  color: theme.text,
  fontSize: 14,
  padding: `5px 0 5px 10px`,
  userSelect: 'none',
  '-moz-user-select': '-moz-none',
  $nest: {
    '.NodeName': NodeName(theme),
    '.NodeType': NodeType(theme),
    '.NodeIconArea': NodeIconArea(theme),
  },
}));
