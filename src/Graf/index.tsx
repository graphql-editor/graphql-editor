import React, { useEffect, useState } from 'react';
import { Parser, ParserTree } from 'graphql-zeus';
import { Node } from './Node';
import { style } from 'typestyle';
import { fontFamily } from '../vars';
export interface GrafProps {
  schema: string;
  libraries?: string;
  onFocus: () => void;
  onBlur: () => void;
}
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  columnCount: 4,
  background: '#191919',
  fontFamily,
});
export const Graf: React.FC<GrafProps> = ({ schema, libraries, onFocus, onBlur }) => {
  const [tree, setTree] = useState<ParserTree>({ nodes: [] });
  useEffect(() => {
    if (libraries) {
      const excludeLibraryNodesFromDiagram = Parser.parse(libraries);
      const parsedResult = Parser.parse(schema, [], libraries);
      setTree({
        nodes: parsedResult.nodes.filter(
          (n) =>
            !excludeLibraryNodesFromDiagram.nodes.find((eln) => eln.name === n.name && eln.data.type === n.data.type),
        ),
      });
    } else {
      setTree(Parser.parse(schema));
    }
  }, [schema, libraries]);
  return (
    <div className={Main} onFocus={onFocus} onBlur={onBlur}>
      {tree.nodes.map((n) => (
        <Node key={n.name} node={n} />
      ))}
    </div>
  );
};
