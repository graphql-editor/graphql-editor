import React from "react";
import { ParserField } from "graphql-js-tree";
import styled from "@emotion/styled";
import { EditableText } from "@/Graf/Node/Field/EditableText";
import { ActiveGrafType } from "@/Graf/Node/Field/ActiveGrafType";
import { GRAF_FIELD_NAME_SIZE } from "@/Graf/constants";
import { dataIt } from "@/Models";

const Main = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: ${GRAF_FIELD_NAME_SIZE}px;
  gap: 0.1rem;
`;

export const ActiveGrafFieldName: React.FC<
  Pick<ParserField, "name" | "args"> & {
    afterChange?: (newName: string) => void;
    parentTypes?: Record<string, string>;
  }
> = ({ args, name, afterChange, parentTypes }) => {
  if (args && args.length > 0) {
    return (
      <Main {...dataIt("fieldName")}>
        <EditableText value={name} onChange={afterChange} />(
        {afterChange &&
          args.map((a, i) => (
            <React.Fragment key={a.name}>
              <span>{a.name}</span>
              :<ActiveGrafType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </React.Fragment>
          ))}
        {!afterChange &&
          args.map((a, i) => (
            <React.Fragment key={a.name}>
              <span>{a.name}</span>
              :<ActiveGrafType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </React.Fragment>
          ))}
        )
      </Main>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
