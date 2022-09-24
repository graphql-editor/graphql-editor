import { ActiveType } from '@/Graf/Node/Type';
import { useTheme, useTreesState } from '@/state/containers';
import {
  ParserField,
  TypeDefinition,
  getTypeName,
  compareParserFields,
} from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { Field } from '../Field';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamily } from '@/vars';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { NodeSearchFields } from '@/Relation/Node/NodeSearchFields';

type NodeTypes = keyof EditorTheme['backgrounds'];

interface ContentProps {
  nodeType: NodeTypes;
  isSelected?: boolean;
  isLibrary?: boolean;
  args: number;
}

const Content = styled.div<ContentProps>`
  background-color: ${({ theme }) => `${theme.background.mainFurther}ee`};
  padding: 12px;
  text-overflow: ellipsis;
  border-radius: 10px;
  overflow: hidden;
  margin: 15px;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  cursor: ${({ isSelected }) => (isSelected ? 'auto' : 'pointer')};
  border-width: 1px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  border-color: ${({ theme, nodeType, isSelected }) =>
    theme.colors[nodeType] && isSelected
      ? theme.colors[nodeType]
      : `${theme.hover}00`};
  &:hover {
    border-color: ${({ theme, nodeType }) =>
      theme.colors[nodeType] ? theme.colors[nodeType] : `${theme.hover}00`};
  }
`;

const NodeRelationFields = styled.div``;

const NodeTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  height: 40px;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NodeName = styled.div`
  margin-right: 5px;
`;

const NameInRelation = styled.span`
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  min-width: auto;
  padding: 0;
  font-family: ${fontFamily};
  font-size: ${FIELD_NAME_SIZE};
`;

interface NodeProps {
  field: ParserField;
  isLibrary?: boolean;
  enums?: boolean;
  setRef: (instance: HTMLDivElement) => void;
  filteredFieldTypes: string;
  setFilteredFieldsTypes: (q: string) => void;
}

export const Node: React.FC<NodeProps> = ({
  field,
  setRef,
  isLibrary,
  enums,
  filteredFieldTypes,
  setFilteredFieldsTypes,
}) => {
  const { setSelectedNode, selectedNode, tree, libraryTree } = useTreesState();
  const isNodeActive =
    !!selectedNode?.field && compareParserFields(field)(selectedNode?.field);
  const { theme } = useTheme();

  const nodeArgs = useMemo(() => {
    return !filteredFieldTypes
      ? field.args
      : field.args?.filter((n) =>
          n.name.toLowerCase().includes(filteredFieldTypes),
        );
  }, [filteredFieldTypes, field.args]);

  const RelationFields = useMemo(() => {
    if (!enums && field.data.type === TypeDefinition.EnumTypeDefinition) {
      return <NodeRelationFields></NodeRelationFields>;
    }

    return (
      <NodeRelationFields>
        {nodeArgs?.map((a) => (
          <Field
            onClick={() => {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              let n = allNodes.find(
                (tn) => tn.name === getTypeName(a.type.fieldType),
              );
              setSelectedNode(
                n && {
                  field: n,
                  source: 'relation',
                },
              );
            }}
            active={
              isNodeActive &&
              field.data.type !== TypeDefinition.EnumTypeDefinition
            }
            key={a.name}
            node={a}
            parentNodeTypeName={getTypeName(field.type.fieldType)}
          />
        ))}
      </NodeRelationFields>
    );
  }, [field, isNodeActive, theme, nodeArgs, enums]);

  const handleSearch = (searchValue?: string) => {
    setFilteredFieldsTypes(searchValue?.toLowerCase() || '');
  };

  const NodeContent = useMemo(
    () => (
      <ContentWrapper>
        <NodeTitle>
          <NodeName>
            <NameInRelation>{field.name}</NameInRelation>
          </NodeName>
          <ActiveType type={field.type} />
          {!(!enums && field.data.type === TypeDefinition.EnumTypeDefinition) &&
            (field?.args?.length || 0) > 10 && (
              <NodeSearchFields
                value={filteredFieldTypes}
                handleSearch={handleSearch}
              />
            )}
        </NodeTitle>
      </ContentWrapper>
    ),
    [field, theme, selectedNode, enums, filteredFieldTypes],
  );

  return (
    <Content
      args={
        selectedNode?.field?.name === field.name ? nodeArgs?.length || 0 : 0
      }
      isSelected={selectedNode?.field?.name === field.name}
      isLibrary={isLibrary}
      nodeType={getTypeName(field.type.fieldType) as NodeTypes}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode({
          field: tree.nodes
            .concat(libraryTree.nodes)
            .find(
              (n) => n.name === field.name && n.data.type === field.data.type,
            ),
          source: 'relation',
        });
      }}
    >
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
