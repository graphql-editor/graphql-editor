import { useRelationsState, useTreesState } from "@/state/containers";
import { getTypeName } from "graphql-js-tree";
import React, { useMemo, useRef } from "react";
import { fontFamilySans, transition } from "@/vars";
import styled from "@emotion/styled";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import { EagleEye, PenLine } from "@aexol-studio/styling-system";
import { ActiveType } from "@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType";
import { Field } from "@/Relation/PanZoom/LinesDiagram/Node/Field";
import { NumberNode } from "graphql-editor-worker";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { useClickDetector } from "@/shared/hooks/useClickDetector";

type NodeTypes = keyof EditorTheme["colors"];

interface ContentProps {
  nodeType: NodeTypes;
  isLibrary?: boolean;
  readOnly?: boolean;
  width: number;
}

const Content = styled.div<ContentProps>`
  width: ${(p) => p.width}px;
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
      opacity: 1;
    }
  }
  .editNode {
    display: none;
  }
  &.far {
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
    }
  }
`;

const NodeRelationFields = styled.div`
  transition: ${transition};
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
  gap: 1px;
  top: 0;
`;
const SmallClickableButton = styled.div`
  background-color: ${(p) => p.theme.neutral[400]};
  color: ${(p) => p.theme.button.standalone.active};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transition};
  pointer-events: all;
  cursor: pointer;
  z-index: 1;
  :hover {
    background-color: ${(p) => p.theme.neutral[200]};
  }
`;
const EditNodeClickableButton = styled(SmallClickableButton)`
  border-top-right-radius: ${(p) => p.theme.radius}px;
`;
const FocusNodeClickableButton = styled(SmallClickableButton)`
  border-bottom-left-radius: ${(p) => p.theme.radius}px;
`;

const NameInRelation = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.text.active};
  padding: 0;
  font-family: ${fontFamilySans};
`;

interface NodeProps {
  numberNode: NumberNode;
  isLibrary?: boolean;
}

export const Node: React.FC<NodeProps> = (props) => {
  const { numberNode, isLibrary } = props;
  const { parserField: field } = numberNode;
  const { setSelectedNodeId, focusNode } = useTreesState();
  const { setEditMode } = useRelationsState();
  const { isClick, mouseDown } = useClickDetector();
  const nodeRef = useRef<HTMLDivElement>(null);

  const RelationFields = useMemo(() => {
    return (
      <NodeRelationFields className={`${DOMClassNames.nodeFields}`}>
        {field.args.map((a) => (
          <Field key={a.name} node={a} />
        ))}
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
              focusNode(field);
            }}
          >
            <EagleEye width={16} height={16} />
          </FocusNodeClickableButton>
          <EditNodeClickableButton
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(field.id);
            }}
          >
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
      className={`${DOMClassNames.node}`}
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
