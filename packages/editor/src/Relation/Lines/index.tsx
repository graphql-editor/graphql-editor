import { Draw } from './Draw';
import { ParserField } from 'graphql-js-tree';
import React, { useMemo } from 'react';
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
  transform: translatez(0);
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
  showAllPaths?: boolean;
}

export const Lines: React.FC<LinesProps> = ({
  relations,
  selectedNode,
  showAllPaths,
}) => {
  const { theme } = useTheme();

  // For optimization purposes
  const relationContent = useMemo(() => {
    return relations
      ?.filter((r) => r.from)
      ?.map((r) => r.from.map((f) => f.field.name).join('.') + r.fromLength)
      .join(',');
  }, [relations]);

  const RelationSVGS = useMemo(() => {
    return relations?.map((r, index) => {
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
        if (!showAllPaths && !fromField && !toField) return null;
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
    });
  }, [relationContent]);

  return <RelationsContainer>{RelationSVGS}</RelationsContainer>;
};
