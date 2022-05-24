import { FieldsList } from '@/Docs/FieldsList';
import { InterfacesList } from '@/Docs/InterfacesList';
import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamilySans } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { style } from 'typestyle';
// @ts-ignore
import { Remarkable } from 'remarkable';

const Wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: fontFamilySans,
  fontSize: 14,
  height: '100%',
});

export const FieldText = themed(({ backgroundedText }) =>
  style({
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
      color: isScalar ? colors.String : colors.type,
      fontSize: 14,
      paddingLeft: 8,
      margin: 0,
      lineHeight: 1.6,
    }),
  );

const Top = themed(({ backgroundedText }) =>
  style({
    display: 'flex',
    alignItems: 'start',
  }),
);
export const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontSize: 16,
  }),
);

export const DescText = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    marginTop: 8,
  }),
);

const Type = themed(({ colors }) =>
  style({
    color: colors.type,
    marginLeft: 4,
    fontSize: 10,
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

  const description = useMemo(() => {
    return node.description ? new Remarkable().render(node.description) : '';
  }, [node.description]);

  return (
    <div className={`${Wrapper}`}>
      <div className={Top(theme)}>
        <div className={`${Title(theme)}`}>{node.name}</div>
        <div className={`${Type(theme)}`}>{node.type.name}</div>
      </div>
      {node.interfaces && node.interfaces.length > 0 && (
        <InterfacesList setNode={setNode} interfacesList={node.interfaces} />
      )}
      <p
        className={`${DescText(theme)}`}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>
      {node.args && node.args.length > 0 && (
        <FieldsList node={node} setNode={setNode} />
      )}
    </div>
  );
};
