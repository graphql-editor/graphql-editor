import { ActiveType } from '@/Graf/Node/Type';
import { useTheme, useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { Field } from '../Field';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamily } from '@/vars';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { SearchInput } from '@/shared/components/SearchInput';

type NodeTypes = keyof EditorTheme['backgrounds'];

interface ContentProps {
  nodeType: NodeTypes;
  isSelected?: boolean;
  isLibrary?: boolean;
}

const Content = styled.div<ContentProps>`
  background-color: ${({ theme }) => `${theme.background.mainFurther}ee`};
  padding: 12px;
  margin: 12px;
  text-overflow: ellipsis;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  cursor: ${({ isSelected }) => (isSelected ? 'auto' : 'pointer')};
  max-width: 400px;
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
const NodeType = styled.div``;

const NodeTitle = styled.div`
  align-items: stretch;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  padding: 10px 5px;
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
  const isNodeActive = compareNodesWithData(field, selectedNode?.field);
  const { theme } = useTheme();

  const RelationFields = useMemo(() => {
    if (!enums && field.data.type === TypeDefinition.EnumTypeDefinition) {
      return <NodeRelationFields></NodeRelationFields>;
    }
    return (
      <NodeRelationFields>
        {(!filteredFieldTypes
          ? field.args
          : field.args?.filter((n) =>
              n.name.toLowerCase().includes(filteredFieldTypes),
            )
        )?.map((a) => (
          <Field
            onClick={() => {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              let n = allNodes.find((tn) => tn.name === a.type.name);
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
            parentNodeTypeName={field.type.name}
          />
        ))}
      </NodeRelationFields>
    );
  }, [field, isNodeActive, theme, filteredFieldTypes, enums]);

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
          <NodeType>
            <ActiveType type={field.type} />
          </NodeType>
        </NodeTitle>
        {!(!enums && field.data.type === TypeDefinition.EnumTypeDefinition) &&
          (field?.args?.length || 0) > 10 && (
            <SearchInput handleSearch={handleSearch} />
          )}
      </ContentWrapper>
    ),
    [field, theme, selectedNode, enums],
  );

  return (
    <Content
      isSelected={selectedNode?.field?.name === field.name}
      isLibrary={isLibrary}
      nodeType={field.type.name as NodeTypes}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode({
          field,
          source: 'relation',
        });
      }}
    >
      {NodeContent}
      {RelationFields}
    </Content>
  );
};
