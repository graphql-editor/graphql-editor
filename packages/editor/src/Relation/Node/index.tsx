import { useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition, getTypeName } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { Field } from '../Field';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { ActiveType } from '@/Relation/Field/ActiveType';

type NodeTypes = keyof EditorTheme['colors'];

interface ContentProps {
  nodeType: NodeTypes;
  isSelected?: boolean;
  isRelated?: boolean;
  isLibrary?: boolean;
  readOnly?: boolean;
}

const Content = styled.div<ContentProps>`
  background-color: ${({ theme }) => `${theme.background.mainFurther}`};
  padding: 12px;
  position: relative;
  text-rendering: optimizeSpeed;
  border-radius: 0.75rem;
  margin: 15px;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  font-family: ${fontFamilySans};
  font-size: 14px;
  max-width: 66vw;
  opacity: ${({ isRelated }) => (isRelated ? 1.0 : 0.5)};
  cursor: ${({ isSelected }) => (isSelected ? 'auto' : 'pointer')};
  border-width: 1px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  border-color: ${({ theme, nodeType, isSelected }) =>
    theme.colors[nodeType] && isSelected
      ? theme.colors[nodeType]
      : `${theme.background.mainMiddle}`};
  &:hover {
    border-color: ${({ theme, nodeType }) =>
      theme.colors[nodeType] ? theme.colors[nodeType] : `${theme.hover}00`};
  }
`;

const NodeRelationFields = styled.div``;

const NodeTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NameInRelation = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.text};
  padding: 0;
  font-family: ${fontFamilySans};
  font-size: ${FIELD_NAME_SIZE};
`;

interface NodeProps {
  field: ParserField;
  isLibrary?: boolean;
  setRef: (instance: HTMLDivElement) => void;
  canSelect?: boolean;
}

export const Node: React.FC<NodeProps> = ({
  field,
  setRef,
  isLibrary,
  canSelect,
}) => {
  const { setSelectedNodeId, selectedNodeId, relatedToSelected } =
    useTreesState();
  const isSelected =
    !!selectedNodeId?.value && field.id === selectedNodeId.value.id;
  const RelationFields = useMemo(() => {
    return (
      <NodeRelationFields>
        {field.args.map((a, i) => (
          <Field
            active={
              isSelected &&
              field.data.type !== TypeDefinition.EnumTypeDefinition
            }
            key={a.name}
            node={a}
          />
        ))}
      </NodeRelationFields>
    );
  }, [JSON.stringify(field), isSelected]);

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
      isRelated={
        selectedNodeId?.value
          ? relatedToSelected?.includes(field.name) || isSelected
          : true
      }
      isSelected={isSelected}
      isLibrary={isLibrary}
      nodeType={getTypeName(field.type.fieldType) as NodeTypes}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        if (!canSelect) return;
        e.stopPropagation();
        setSelectedNodeId({
          value: {
            id: field.id,
            name: field.name,
          },
          source: 'relation',
        });
      }}
    >
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
