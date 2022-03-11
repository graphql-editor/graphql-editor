import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';

interface DocsElementI {
  node: ParserField;
}

const Wrapper = themed(({ background: { mainFar } }) =>
  style({
    width: '100%',
    margin: 16,
  }),
);

const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontFamily,
  }),
);

const Type = themed(({ colors }) =>
  style({
    color: colors.type,
    fontFamily,
  }),
);

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree } = useTreesState();
  const { theme } = useTheme();

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0) setSelectedNode(newSelectedNode[0]);
  };

  return (
    <div className={`${Wrapper(theme)}`}>
      <div>
        <h1 className={`${Title(theme)}`}>{node.name}</h1>
        <p className={`${Type(theme)}`}>{node.type.name}</p>
        <p className={`${Title(theme)}`}>{node.description}</p>
      </div>
      <div>
        <h1 className={`${Title(theme)}`}>Fields</h1>
        {node.args?.map((arg) => (
          <div>
            <p onClick={() => setNode(arg.type.name)}>{arg.name}</p>
            <p> {arg.type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
