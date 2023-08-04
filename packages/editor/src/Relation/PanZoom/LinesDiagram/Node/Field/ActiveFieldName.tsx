import React from "react";
import { ParserField } from "graphql-js-tree";
import styled from "@emotion/styled";
import { FIELD_NAME_SIZE } from "@/Graf/constants";
import { ActiveType } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType";
import { Stack } from "@aexol-studio/styling-system";

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
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
    parentTypes?: Record<string, string>;
    onClick?: (n: ParserField) => void;
  }
> = ({ args, name, parentTypes, onClick }) => {
  if (args && args.length > 0) {
    return (
      <Main>
        <Name>{name}</Name>
        {args && (
          <>
            {"("}
            {args.map((a, i) => (
              <Stack key={a.name}>
                <span>{a.name}</span>
                :
                <ActiveType
                  onClick={() => onClick?.(a)}
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
