import React, { useCallback } from "react";
import { useTreesState } from "@/state/containers/trees";
import { FieldProps as GrafFieldProps } from "@/Graf/Node/models";
import styled from "@emotion/styled";
import { ParserField, TypeSystemDefinition } from "graphql-js-tree";
import {
  RELATION_CONSTANTS,
  PRINT_PREVIEW_FIELD_HEIGHT,
} from "@/Relation/PanZoom/LinesDiagram/Lines/constants";
import { ActiveFieldName } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveFieldName";
import { ActiveType } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { useRelationNodesState, useRelationsState } from "@/state/containers";
import { isEditableParentField } from "@/utils";
import { Link } from "@aexol-studio/styling-system";

const Main = styled.div<{ printPreviewActive: boolean }>`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: ${({ printPreviewActive }) =>
    printPreviewActive
      ? PRINT_PREVIEW_FIELD_HEIGHT
      : RELATION_CONSTANTS.FIELD_HEIGHT}px;
  padding: 0 12px;
  color: ${({ theme }) => theme.text.disabled};
  margin: ${({ printPreviewActive }) =>
    printPreviewActive ? "5px -12px" : "0 -12px"};
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.neutral[500]};
  }
`;

type FieldProps = Pick<GrafFieldProps, "node"> & {
  showArgs?: boolean;
};

export const Field: React.FC<FieldProps> = ({ node }) => {
  const { parentTypes, setSelectedNodeId, getParentOfField } = useTreesState();
  const { setEditMode, printPreviewActive } = useRelationsState();
  const {
    setTypeRelatedNodesToFocusedNode,
    typeRelatedToFocusedNode,
    focusedNodes,
  } = useRelationNodesState();
  const nodeClick = useCallback(
    (n: ParserField) => {
      const parent = getParentOfField(n);
      if (parent) {
        if (isEditableParentField(parent)) {
          setEditMode(parent.id);
          return;
        }
        setTypeRelatedNodesToFocusedNode(parent);
        const alreadyExistsInTypeRelatedToFocusedNode =
          typeRelatedToFocusedNode.find((el) => el.id === parent.id);
        const alreadyExistsInFocusedNodes = focusedNodes?.find(
          (el) => el.id === parent.id
        );
        if (
          alreadyExistsInFocusedNodes ||
          alreadyExistsInTypeRelatedToFocusedNode
        ) {
          setSelectedNodeId({
            source: "relation",
            value: {
              id: parent.id,
              name: parent.name,
            },
          });
        }
      }
    },
    [typeRelatedToFocusedNode, focusedNodes]
  );
  return (
    <Main
      className={DOMClassNames.nodeField}
      onClick={(e) => {
        e.stopPropagation();
        nodeClick(node);
      }}
      printPreviewActive={printPreviewActive}
    >
      <ActiveFieldName
        name={
          node.data.type !== TypeSystemDefinition.UnionMemberDefinition
            ? node.name
            : ""
        }
        args={node.args}
        parentTypes={parentTypes}
        onClick={(n) => {
          nodeClick(n);
        }}
        printPreviewActive={printPreviewActive}
      />
      <ActiveType
        type={node.type}
        parentTypes={parentTypes}
        onClick={() => {
          nodeClick(node);
        }}
      />
      {node.fromLibrary && <Link />}
    </Main>
  );
};
