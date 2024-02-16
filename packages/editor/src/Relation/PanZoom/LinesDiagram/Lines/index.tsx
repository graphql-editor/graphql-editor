import { Draw } from "./Draw";
import { getTypeName, Options, ParserField } from "graphql-js-tree";
import React from "react";
import { useTheme } from "@/state/containers";
import styled from "@emotion/styled";
import { NumberNode, RelativeNumberConnection } from "graphql-editor-worker";

const RelationsContainer = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  stroke: ${({ theme }) => theme.neutrals.L5};
  fill: transparent;
  stroke-width: 2px;
  transform: translatez(0);
  margin: -20px;
  overflow: visible;
`;

export interface RelationPath {
  field: NumberNode;
  index: number;
  connectingField: ParserField;
}
interface LinesProps {
  relations: RelativeNumberConnection[] | undefined;
  isPrintPreviewActive: boolean;
}

export const Lines: React.FC<LinesProps> = ({
  relations,
  isPrintPreviewActive,
}) => {
  const { theme } = useTheme();
  const relationCount = relations?.length || 0;
  const optimized = relationCount > 200;
  return (
    <RelationsContainer>
      {relations?.map((r, index) => {
        return (
          <React.Fragment key={index}>
            <Draw
              optimized={optimized}
              relationType={
                r.target?.parserField.type.fieldType || {
                  type: Options.name,
                  name: "",
                }
              }
              color={
                r.connectionType
                  ? theme.colors[r.connectionType as keyof typeof theme.colors]
                  : theme.colors[
                      getTypeName(
                        r.target?.parserField.type.fieldType || {
                          type: Options.name,
                          name: "",
                        }
                      ) as keyof typeof theme.colors
                    ]
              }
              key={`${index}}-${index}-${r.source?.parserField.name}-${r.target?.parserField.name}`}
              from={r.source}
              to={r.target}
              isPrintPreviewActive={isPrintPreviewActive}
            />
            );
          </React.Fragment>
        );
      })}
    </RelationsContainer>
  );
};
