import { FieldsList } from '@/Docs/FieldsList';
import { InterfacesList } from '@/Docs/InterfacesList';
import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';

export const FieldText = themed(({ backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
    fontSize: 14,
    margin: 0,
    lineHeight: 1.6,
    paddingLeft: 2,
  }),
);

export const TypeText = (isScalar: boolean) =>
  themed(({ colors }) =>
    style({
      fontFamily,
      color: isScalar ? colors.String : colors.type,
      fontSize: 14,
      paddingLeft: 8,
      margin: 0,
      lineHeight: 1.6,
    }),
  );

export const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontFamily,
    fontSize: '1vw',
  }),
);

export const DescText = themed(({ backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
    fontSize: 12,
    paddingLeft: 16,
    marginTop: 8,
  }),
);

const Wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '96vh',
});

const Type = themed(({ colors }) =>
  style({
    color: colors.type,
    fontFamily,
  }),
);

interface DocsElementI {
  node: ParserField;
}

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree } = useTreesState();
  const { theme } = useTheme();

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0) setSelectedNode(newSelectedNode[0]);
  };

  return (
    <div className={`${Wrapper}`}>
      <h1 className={`${Title(theme)}`}>{node.name}</h1>
      <p className={`${Type(theme)}`}>{node.type.name}</p>
      {node.interfaces && node.interfaces.length > 0 && (
        <InterfacesList setNode={setNode} interfacesList={node.interfaces} />
      )}
      <p className={`${DescText(theme)}`}>{node.description}</p>
      {node.args && node.args.length > 0 && (
        <FieldsList node={node} setNode={setNode} />
      )}
    </div>
  );
};
