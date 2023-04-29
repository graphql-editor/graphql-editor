import { useRelationsState, useTreesState } from '@/state/containers';
import { ParserField, getTypeName } from 'graphql-js-tree';
import React, { useMemo, useRef } from 'react';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamilySans, transition } from '@/vars';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/MainTheme';
import { PenLine } from '@aexol-studio/styling-system';
import { useClickDetector } from '@/Relation/shared/useClickDetector';
import { ActiveType } from '@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType';
import { Field } from '@/Relation/PanZoom/LinesDiagram/Node/Field';
import { useLazyControls } from '@/Relation/shared/useLazyControls';
import { useDomManagerTs } from '@/Relation/PanZoom/useDomManager';

type NodeTypes = keyof EditorTheme['colors'];

interface ContentProps {
  nodeType: NodeTypes;
  isLibrary?: boolean;
  readOnly?: boolean;
}

const Content = styled.div<ContentProps>`
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
  opacity: 1;
  cursor: pointer;
  border-width: 2px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
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
    }
    &.related {
      opacity: 1;
    }
  }
  .editNode {
    display: none;
  }
`;

const NodeRelationFields = styled.div``;

const NodeTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.active};
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  position: relative;
  padding-right: 1.5rem;
  display: flex;
`;
const EditNodeContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${(p) => p.theme.neutral[400]};
  color: ${(p) => p.theme.button.standalone.active};
  border-top-right-radius: ${(p) => p.theme.radius}px;
  border-bottom-left-radius: ${(p) => p.theme.radius}px;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NameInRelation = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.text.active};
  padding: 0;
  font-family: ${fontFamilySans};
  font-size: ${FIELD_NAME_SIZE};
`;

interface NodeProps {
  field: ParserField;
  className: string;
  isLibrary?: boolean;
}

export const Node: React.FC<NodeProps> = (props) => {
  const { field, isLibrary } = props;
  const { setSelectedNodeId } = useTreesState();
  const { setEditMode } = useRelationsState();
  const { isClick, mouseDown } = useClickDetector();
  const { zoomToElement } = useLazyControls();
  const { deselectNodes, selectNode } = useDomManagerTs(props.className);
  const nodeRef = useRef<HTMLDivElement>(null);

  const RelationFields = useMemo(() => {
    return (
      <NodeRelationFields>
        {field.args.map((a) => (
          <Field key={a.name} node={a} />
        ))}
      </NodeRelationFields>
    );
  }, [JSON.stringify(field)]);

  const NodeContent = useMemo(
    () => (
      <ContentWrapper>
        <NodeTitle>
          <NameInRelation>{field.name}</NameInRelation>
          <ActiveType type={field.type} />
        </NodeTitle>
      </ContentWrapper>
    ),
    [field],
  );

  return (
    <Content
      className={`graph-node ${props.className}`}
      id={`${props.className}-node-${field.id}`}
      ref={nodeRef}
      isLibrary={isLibrary}
      nodeType={getTypeName(field.type.fieldType) as NodeTypes}
      onMouseDown={mouseDown}
      onClick={(e) => {
        if (!isClick(e)) {
          return;
        }
        e.stopPropagation();
        if (nodeRef.current?.classList.contains('active')) return;
        deselectNodes();
        selectNode(field.id);
        zoomToElement(`${props.className}-node-${field.id}`);
        setTimeout(() => {
          setSelectedNodeId({
            value: {
              id: field.id,
              name: field.name,
            },
            source: 'relation',
          });
        }, 200);
      }}
    >
      <EditNodeContainer
        className="editNode"
        onClick={(e) => {
          e.stopPropagation();
          setEditMode(field.id);
        }}
      >
        <PenLine width={16} height={16} />
      </EditNodeContainer>
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
