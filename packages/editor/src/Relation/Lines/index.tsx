import { Draw } from './Draw';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { useTheme } from '@/state/containers';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';

const RelationsContainer = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  stroke: ${({ theme }) => theme.background.mainClosest};
  fill: transparent;
  stroke-width: 2px;
  margin: -20px;
  overflow: visible;
`;

export interface RelationPath {
  htmlNode: HTMLDivElement;
  field: ParserField;
  index: number;
}
interface LinesProps {
  relations:
    | { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    | undefined;
  selectedNode?: ParserField;
}

export const Lines: React.FC<LinesProps> = ({ relations, selectedNode }) => {
  const { theme } = useTheme();
  return (
    <RelationsContainer>
      {relations?.map((r, index) => {
        const usedToIndexes: number[] = [];
        return r.from?.map((rf) => {
          if (!selectedNode) {
            return null;
          }
          const fromField = compareNodesWithData(selectedNode, rf.field);
          const toField = compareNodesWithData(selectedNode, r.to.field);
          let portNumber = rf.index;
          if (fromField) {
            portNumber =
              r.to.field.args?.findIndex(
                (fa, argIndex) =>
                  fa.type.name === rf.field.name &&
                  !usedToIndexes.includes(argIndex),
              ) || 0;
            portNumber = portNumber === -1 ? 0 : portNumber;
            usedToIndexes.push(portNumber);
          }
          return (
            <Draw
              hasSearch={r.fromLength > 10}
              active={fromField || toField}
              inverse={fromField}
              color={(theme.colors as any)[rf.field.type.name]}
              inActiveColor={(theme.backgrounds as any)[rf.field.type.name]}
              key={`${index}-${rf.index}-${rf.field.name}`}
              from={rf.htmlNode}
              to={r.to.htmlNode}
              PortNumber={portNumber}
              maxIndex={r.from.length}
            />
          );
        });
      })}
    </RelationsContainer>
  );
};
