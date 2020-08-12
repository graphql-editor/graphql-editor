import React from 'react';
import { ParserTree } from 'graphql-zeus';
import { Node } from './Node';
import { style } from 'typestyle';
import { fontFamily } from '../vars';
export interface GrafProps {
  tree: ParserTree;
  onFocus: () => void;
  onBlur: () => void;
}
const Main = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  columnCount: 3,
  background: '#191919',
  fontFamily,
  overflowX: 'auto',
});
export const Graf: React.FC<GrafProps> = ({ tree, onFocus, onBlur }) => {
  return (
    <div className={Main} onFocus={onFocus} onBlur={onBlur}>
      {tree.nodes.map((n) => (
        <Node nodes={tree.nodes} key={n.name} node={n} />
      ))}
    </div>
  );
};
