import { NestedCSSProperties } from 'typestyle/lib/types';
import { Colors } from '@Colors';
import { GraphQLBackgrounds } from '@editor/theme';

const NodeName: NestedCSSProperties = {
  marginRight: 5,
  color: Colors.grey[0],
  fontSize: 12,
  padding: `5px 0 5px 10px`,
};
const NodeType: NestedCSSProperties = {
  color: Colors.main[0],
  fontSize: 10,
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
  background: Colors.grey[8],
  display: 'flex',
  alignItems: 'stretch',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  padding: 5,
  $nest: {
    '.NodeName': NodeName,
    '.NodeType': NodeType,
    '.NodeIconArea': NodeIconArea,
  },
};

export const NodeFields: NestedCSSProperties = {
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  background: Colors.grey[8],
  ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
    a[`.NodeBackground-${b}`] = {
      background: GraphQLBackgrounds[b],
    };
    return a;
  }, {} as Record<string, NestedCSSProperties>),
};
