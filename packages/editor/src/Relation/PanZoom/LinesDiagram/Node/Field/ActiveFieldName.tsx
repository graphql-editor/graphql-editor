import React, { useCallback } from "react";
import { ParserField } from "graphql-js-tree";
import styled from "@emotion/styled";
import { FIELD_NAME_SIZE } from "@/Graf/constants";
import { ActiveType } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType";
import { Stack } from "@aexol-studio/styling-system";

const Main = styled.div<{ printPreviewActive: boolean }>`
  display: flex;
  flex-flow: ${({ printPreviewActive }) =>
    printPreviewActive ? "row wrap" : "row nowrap"};
  overflow-x: ${({ printPreviewActive }) =>
    printPreviewActive ? "unset" : "auto"};
  * {
    text-overflow: ellipsis;
  }
`;

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE}px;
  color: ${({ theme }) => theme.text.default};
  margin-right: 2px;
`;

const Comma = styled.span`
  padding: 0 2px;
`;

export const ActiveFieldName: React.FC<
  Pick<ParserField, "name" | "args"> & {
    printPreviewActive: boolean;
    parentTypes?: Record<string, string>;
    onClick?: (n: ParserField) => void;
  }
> = ({ args, name, parentTypes, onClick, printPreviewActive }) => {
  const handleClickOnParamType = useCallback(
    (field: ParserField) => {
      if (!onClick) {
        return undefined;
      }
      onClick(field);
    },
    [onClick]
  );

  if (args && args.length > 0) {
    return (
      <Main printPreviewActive={printPreviewActive}>
        <Name>{name}</Name>
        {args && (
          <>
            {"("}
            {args.map((a, i) => (
              <Stack key={a.name}>
                <span>{a.name}</span>
                :
                <ActiveType
                  onClick={() => handleClickOnParamType(a)}
                  type={a.type}
                  parentTypes={parentTypes}
                />
                {i < args.length - 1 && <Comma>,</Comma>}
              </Stack>
            ))}
            {")"}
          </>
        )}
      </Main>
    );
  }
  return <Name>{name}</Name>;
};
