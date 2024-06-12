import { OperationType, ParserField } from "graphql-js-tree";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { transition } from "@/vars";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import { ChevronDown } from "@aexol-studio/styling-system";
import {
  SingleNodeInList,
  SingleSchemaNodeInList,
} from "@/shared/NodeNavigation/SingleNodeInList";

interface TitleProps {
  open?: boolean;
  empty?: boolean;
  color: keyof EditorTheme["colors"];
}

const Title = styled.div<TitleProps>`
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-weight: 600;
  font-size: 14px;
  cursor: ${({ empty }) => (empty ? "auto" : "pointer")};
  color: ${({ theme, empty }) =>
    empty ? theme.text.disabled : theme.text.active};
  margin: 0;
  padding-bottom: 5px;
  padding-left: 1rem;
  margin-right: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${transition};
  svg {
    color: ${({ theme, open }) =>
      open ? theme.text.active : theme.content.standalone.disabled};
    transition: ${transition};
    transform-origin: 50%;
    transform: ${({ open }) => (open ? "rotate(0deg)" : "rotate(-90deg)")};
  }
`;

type ToggleableParserField = ParserField & { isHidden?: boolean };

interface NodeListI {
  listTitle: string;
  nodeList?: ToggleableParserField[];
  expanded: Array<string>;
  setExpanded: (e: string) => void;
  colorKey: keyof EditorTheme["colors"];
}

export const NodeList: React.FC<NodeListI> = ({
  nodeList,
  listTitle,
  setExpanded,
  expanded,
  colorKey,
}) => {
  const open = expanded.includes(listTitle);
  const empty = !nodeList?.length;
  const [activeContextNode, setActiveContextNode] =
    useState<ToggleableParserField | null>(null);

  return (
    <>
      <Title
        color={colorKey}
        empty={empty}
        onClick={() => setExpanded(listTitle)}
        open={open}
      >
        <div>{listTitle}</div>
        {!empty && <ChevronDown width={18} />}
      </Title>
      {open &&
        nodeList &&
        nodeList.map((node) => (
          <SingleNodeInList
            key={node.id}
            colorKey={colorKey}
            node={node}
            activeContext={activeContextNode === node}
            setActive={(node: ToggleableParserField | null) =>
              setActiveContextNode(node)
            }
          />
        ))}
    </>
  );
};
export const SchemaList: React.FC<{
  queryNode?: ParserField;
  mutationNode?: ParserField;
  subscriptionNode?: ParserField;
}> = ({ queryNode, mutationNode, subscriptionNode }) => {
  return (
    <>
      <Title
        color={"type"}
        empty={!queryNode && !mutationNode && !subscriptionNode}
        open
      >
        <div>Schema</div>
      </Title>
      <SingleSchemaNodeInList
        node={queryNode}
        schemaProps={{ name: "query", operationType: OperationType.query }}
      />
      <SingleSchemaNodeInList
        node={mutationNode}
        schemaProps={{
          name: "mutation",
          operationType: OperationType.mutation,
        }}
      />
      <SingleSchemaNodeInList
        node={subscriptionNode}
        schemaProps={{
          name: "subscription",
          operationType: OperationType.subscription,
        }}
      />
    </>
  );
};
