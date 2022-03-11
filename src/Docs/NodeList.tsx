import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';
import cx from 'classnames';

const List = themed(({ background: { mainFar } }) =>
  style({
    textAlign: 'right',
    width: '100%',
  }),
);

const ListElement = themed(({ colors }) =>
  style({
    width: '100%',
    cursor: 'pointer',
    borderBottom: `1px solid transparent`,
    $nest: {
      '&:hover': {
        color: colors.type,
        borderBottomColor: colors.type,
      },
      '&.active': {
        color: colors.type,
        borderBottomColor: colors.type,
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
        borderBottomColor: colors.type,
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

  console.log(selectedNode);

  return (
    <div className={`${List(theme)}`}>
      <p className={`${Title(theme)}`}>{listTitle}</p>
      {nodeList &&
        nodeList.map((node) => (
          <div
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
