import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';
import cx from 'classnames';
import { compareNodesWithData } from '@/compare/compareNodes';

const List = style({
  textAlign: 'left',
  padding: 10,
});

const NodeText = themed(({ colors, backgroundedText, background }) =>
  style({
    fontFamily,
    color: backgroundedText,
    cursor: 'pointer',
    display: 'block',
    fontSize: 14,
    $nest: {
      '&:hover': {
        color: colors.type,
        background: background.mainClose,
      },
      '&.active': {
        color: colors.type,
      },
    },
  }),
);

const Title = themed(({ colors }) =>
  style({
    fontFamily,
    textTransform: 'uppercase',
    color: colors.type,
    margin: 0,
    fontSize: 14,
    marginBottom: 5,
  }),
);

type ListTitle =
  | 'Schema'
  | 'Types'
  | 'Interface'
  | 'Inputs'
  | 'Enums'
  | 'Scalars'
  | 'Unions'
  | 'Directives';

interface NodeListI {
  listTitle: ListTitle;
  nodeList?: ParserField[];
}

export const NodeList: React.FC<NodeListI> = ({ nodeList, listTitle }) => {
  const { theme } = useTheme();
  const { selectedNode, setSelectedNode } = useTreesState();
  return (
    <div className={`${List}`}>
      <p className={`${Title(theme)}`}>{listTitle}</p>
      {nodeList &&
        nodeList.map((node, i) => (
          <a
            key={i}
            onClick={() => {
              setSelectedNode({
                field: node,
                source: 'docs',
              });
            }}
            className={cx(NodeText(theme), {
              active:
                selectedNode &&
                !!compareNodesWithData(node, selectedNode.field),
            })}
          >
            {node.name}
          </a>
        ))}
    </div>
  );
};
