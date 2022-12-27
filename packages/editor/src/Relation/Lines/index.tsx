import { Draw } from './Draw';
import { ParserField, getTypeName } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { useTheme } from '@/state/containers';
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
  path {
    pointer-events: stroke;
    :hover {
      stroke: ${({ theme }) => theme.text};
    }
  }
`;

export interface RelationPath {
  htmlNode: HTMLDivElement;
  field: ParserField;
  index: number;
  connectingField: ParserField;
}
interface LinesProps {
  relations:
    | { to: RelationPath; from: RelationPath[]; fromLength: number }[]
    | undefined;
  selectedNode?: ParserField;
}

export const Lines: React.FC<LinesProps> = ({ relations, selectedNode }) => {
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
      return r.from?.map((rf, relationNumber) => {
        let portNumber = rf.index;
        const relationType = rf.connectingField.type.fieldType;
        if (selectedNode) {
          if (
            rf.field.id !== selectedNode.id &&
            r.to.field.id !== selectedNode.id
          ) {
            return null;
          }
        }
        return (
          <Draw
            relationType={relationType}
            relationNumber={relationNumber}
            color={(theme.colors as any)[getTypeName(rf.field.type.fieldType)]}
            key={`${index}-${rf.index}-${rf.field.name}`}
            from={rf.htmlNode}
            to={r.to.htmlNode}
            PortNumber={portNumber}
            maxIndex={r.from.length}
          />
        );
      });
    });
  }, [relationContent, selectedNode]);
  return <RelationsContainer>{RelationSVGS}</RelationsContainer>;
};
