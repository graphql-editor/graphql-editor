import { useRelationsState, useTreesState } from "@/state/containers";
import { getTypeName, ParserField } from "graphql-js-tree";
import React, { useMemo, useRef } from "react";
import { fontFamilySans, transition } from "@/vars";
import styled from "@emotion/styled";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import {
  ChevronRightDouble,
  EagleEye,
  PenLine,
  Stack,
} from "@aexol-studio/styling-system";
import { ActiveType } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType";
import { Field } from "@/Relation/PanZoom/LinesDiagram/Node/Field";
import { NumberNode } from "graphql-editor-worker";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { useClickDetector } from "@/shared/hooks/useClickDetector";
import {
  RELATION_NODE_MAX_FIELDS,
  RELATION_NODE_MAX_WIDTH,
} from "@/Relation/shared/nodeLook";

type NodeTypes = keyof EditorTheme["colors"];

interface ContentProps {
  nodeType: NodeTypes;
  isLibrary?: boolean;
  readOnly?: boolean;
  width: number;
}

const Content = styled.div<ContentProps>`
  width: ${(p) => Math.min(p.width, RELATION_NODE_MAX_WIDTH)}px;
  background-color: ${({ theme }) => `${theme.neutral[600]}`};
  padding: 12px;
  position: relative;
  text-rendering: optimizeSpeed;
  border-radius: ${(p) => p.theme.radius}px;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  font-family: ${fontFamilySans};
  font-size: 14px;
  max-width: 66vw;
  visibility: hidden;
  cursor: pointer;
  border-width: 2px;
  border-style: ${({ isLibrary }) => (isLibrary ? "dashed" : "solid")};
  border-color: ${({ theme }) => `${theme.dividerMain}88`};
  &:hover {
    border-color: ${({ theme, nodeType }) =>
      theme.colors[nodeType]
        ? theme.colors[nodeType]
        : `${theme.accents[100]}00`};
  }
  .graph-field {
    pointer-events: none;
  }
  &.inViewport {
    visibility: visible;
  }
  &.selection {
    opacity: 0.3;
    &.active {
      opacity: 1;
      visibility: visible;
      cursor: auto;
      border-color: ${({ theme, nodeType }) =>
        theme.colors[nodeType]
          ? theme.colors[nodeType]
          : `${theme.dividerMain}88`};
      .editNode {
        display: flex;
      }
      .graph-field {
        pointer-events: auto;
      }
      &.far {
        .graph-field {
          pointer-events: none;
        }
      }
    }
    &.related {
      visibility: visible;
      opacity: 1;
    }
  }
  .editNode {
    display: none;
  }
  &.far {
    width: ${(p) => p.width}px;
    border-width: 0;
    background-color: transparent;
    .graph-node-fields {
      opacity: 0;
      pointer-events: none;
    }
    .graph-node-title {
      transform: translate(-50%, -50%);
      flex-direction: column;
      padding: 1.5rem;
      font-size: 34px;
      letter-spacing: 1px;
      top: 50%;
      left: 50%;
    }
    .editNode {
      scale: 2;
      transform: translate(0, -50%);
      font-size: 14px;
    }
  }
`;

const NodeRelationFields = styled.div`
  transition: ${transition};
  position: relative;
  margin-top: 24px;
`;

const NodeTitle = styled.div`
  position: absolute;
  align-items: center;
  /* background-color: ${({ theme }) => `${theme.neutral[600]}`}; */
  color: ${({ theme }) => theme.text.active};
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  transition: ${transition};
  display: flex;
  left: 0;
  top: 0;
  right: 0;
`;
const EditNodeContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  gap: 0.25rem;
  top: 0;
  transform: translateY(calc(-100% - 0.5rem));
`;
const SmallClickableButton = styled.div`
  background-color: ${(p) => p.theme.neutral[400]};
  color: ${(p) => p.theme.button.standalone.active};
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transition};
  gap: 0.25rem;
  pointer-events: all;
  cursor: pointer;
  z-index: 1;
  :hover {
    background-color: ${(p) => p.theme.neutral[200]};
  }
`;
const EditNodeClickableButton = styled(SmallClickableButton)`
  border-radius: ${(p) => p.theme.radius}px;
`;
const FocusNodeClickableButton = styled(SmallClickableButton)`
  border-radius: ${(p) => p.theme.radius}px;
`;

const NameInRelation = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.text.active};
  padding: 0;
  font-family: ${fontFamilySans};
`;

const EditToSeeWhole = styled(Stack)`
  padding: 1rem;
  position: absolute;
  z-index: 10;
  color: ${(p) => p.theme.text.default};
  margin: 1rem -12px;
  background: ${(p) => p.theme.neutral[500]};
  width: calc(100% + 26px);
  border-bottom-left-radius: ${(p) => p.theme.radius}px;
  border-bottom-right-radius: ${(p) => p.theme.radius}px;
  cursor: pointer;
  transition: ${transition};
  :hover {
    background: ${(p) => p.theme.neutral[450]};
    color: ${(p) => p.theme.text.active};
  }
`;

interface NodeProps {
  numberNode: NumberNode;
  isLibrary?: boolean;
}

export const Node: React.FC<NodeProps> = (props) => {
  const { numberNode, isLibrary } = props;
  const { parserField: field } = numberNode;
  const { setSelectedNodeId, focusNode, focusMode, exitFocus } =
    useTreesState();
  const { setEditMode } = useRelationsState();
  const { isClick, mouseDown } = useClickDetector();
  const nodeRef = useRef<HTMLDivElement>(null);

  const isFieldFocused = (focusField: ParserField) => {
    return focusMode === focusField.id;
  };

  const RelationFields = useMemo(() => {
    return (
      <NodeRelationFields className={`${DOMClassNames.nodeFields}`}>
        {field.args.slice(0, RELATION_NODE_MAX_FIELDS).map((a) => (
          <Field key={a.name} node={a} />
        ))}
        {field.args.length > RELATION_NODE_MAX_FIELDS && (
          <EditToSeeWhole
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNodeId({
                value: {
                  id: field.id,
                  name: field.name,
                },
                source: "relation",
              });
              setEditMode(field.id);
            }}
            align="center"
            justify="center"
          >
            <span>
              Open to see {field.args.length - RELATION_NODE_MAX_FIELDS} more
              fields
            </span>
            <ChevronRightDouble />
          </EditToSeeWhole>
        )}
      </NodeRelationFields>
    );
  }, [JSON.stringify(field)]);

  const NodeContent = useMemo(
    () => (
      <NodeTitle className={`${DOMClassNames.nodeTitle}`}>
        <NameInRelation>{field.name}</NameInRelation>
        <ActiveType type={field.type} />
        <EditNodeContainer className="editNode">
          <FocusNodeClickableButton
            onClick={(e) => {
              e.stopPropagation();
              if (isFieldFocused(field)) {
                exitFocus();
              } else {
                focusNode(field);
              }
            }}
          >
            <span>{isFieldFocused(field) ? "Unfocus" : "Focus"}</span>
            <EagleEye width={16} height={16} />
          </FocusNodeClickableButton>
          <EditNodeClickableButton
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(field.id);
            }}
          >
            <span>Edit</span>
            <PenLine width={16} height={16} />
          </EditNodeClickableButton>
        </EditNodeContainer>
      </NodeTitle>
    ),
    [field]
  );

  return (
    <Content
      width={numberNode.width}
      className={`${DOMClassNames.node} inViewport`}
      id={`node-${field.id}`}
      ref={nodeRef}
      isLibrary={isLibrary}
      nodeType={getTypeName(field.type.fieldType) as NodeTypes}
      onMouseDown={mouseDown}
      onClick={(e) => {
        if (!isClick(e)) {
          return;
        }
        e.stopPropagation();
        if (nodeRef.current?.classList.contains("active")) return;
        setSelectedNodeId({
          value: {
            id: field.id,
            name: field.name,
          },
          source: "relation",
        });
      }}
    >
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
