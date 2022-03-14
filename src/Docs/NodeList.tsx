import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';
import cx from 'classnames';

const List = style({
  textAlign: 'right',
  width: '100%',
  paddingRight: 16,
});

const ListElement = themed(({ colors }) =>
  style({
    width: '100%',
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        color: colors.type,
      },
      '&.active': {
        color: colors.type,
      },
    },
  }),
);

const NodeText = themed(({ colors, backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
    $nest: {
      '&:hover': {
        color: colors.type,
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
    lineHeight: 2,
    textTransform: 'uppercase',
    color: colors.type,
  }),
);

interface NodeListI {
  listTitle: string;
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
          <div
            key={i}
            className={cx(ListElement(theme), {
              active: node.name === selectedNode?.name,
            })}
            onClick={() => {
              setSelectedNode(node);
            }}
          >
            <p
              className={cx(NodeText(theme), {
                active: node.name === selectedNode?.name,
              })}
            >
              {node.name}
            </p>
          </div>
        ))}
    </div>
  );
};
