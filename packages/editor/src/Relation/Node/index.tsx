import { ActiveType } from '@/Graf/Node/Type';
import { useTheme, useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useMemo, useState } from 'react';
import { Field } from '../Field';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamily } from '@/vars';
import { compareNodesWithData } from '@/compare/compareNodes';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { SearchInput } from '@/shared/components/SearchInput';
import { FilteredFieldsTypesProps } from '../LinesDiagram';

type NodeTypes = keyof EditorTheme['backgrounds'];

interface ContentProps {
  nodeType: NodeTypes;
  isMoreThanTen?: boolean;
  isSelected?: boolean;
  isLibrary?: boolean;
  isActive?: boolean;
  fade?: boolean;
}

const Content = styled.div<ContentProps>`
  background-color: ${({ theme }) => theme.background.mainFurther};
  display: ${({ fade }) => fade && 'none'};
  padding: 12px;
  margin: 12px;
  text-overflow: ellipsis;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  cursor: ${({ isSelected }) => (isSelected ? 'auto' : 'pointer')};
  max-width: 50%;
  border-width: 1px;
  border-style: ${({ isLibrary }) => (isLibrary ? 'dashed' : 'solid')};
  border-color: ${({ theme, nodeType, isSelected }) =>
    theme.colors[nodeType] && isSelected
      ? theme.colors[nodeType]
      : `${theme.hover}00`};
  box-shadow: ${({ theme, isActive }) => isActive && theme.shadow};
  &:hover {
    border-color: ${({ theme, nodeType }) =>
      theme.colors[nodeType] ? theme.colors[nodeType] : `${theme.hover}00`};
  }
`;

const OpacityFade = styled.div<{ fade?: boolean }>`
  opacity: ${({ fade }) => (fade ? '0.25' : '1')};
`;

const NodeRelationFields = styled(OpacityFade)``;
const NodeType = styled(OpacityFade)``;

const NodeTitle = styled.div<{ fade?: boolean }>`
  align-items: stretch;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  padding: 10px 5px;
  display: flex;
  opacity: ${({ fade }) => (fade ? '0.5' : '1')};
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
  fade?: boolean;
  setRef: (instance: HTMLDivElement) => void;
  setFilteredFieldsTypes: React.Dispatch<
    React.SetStateAction<FilteredFieldsTypesProps | undefined>
  >;
}

export const Node: React.FC<NodeProps> = ({
  field,
  setRef,
  fade,
  isLibrary,
  setFilteredFieldsTypes,
}) => {
  const { setSelectedNode, selectedNode, tree, libraryTree } = useTreesState();
  const isNodeActive = compareNodesWithData(field, selectedNode?.field);
  const { theme } = useTheme();

  const [filteredFields, setFilteredFields] = useState(field.args);

  const RelationFields = useMemo(() => {
    const showFields = selectedNode ? !fade : false;

    return (
      <NodeRelationFields fade={fade}>
        {showFields &&
          filteredFields?.map((a) => (
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
  }, [field, isNodeActive, theme, fade, filteredFields]);

  const handleSearch = (searchValue?: string) => {
    if (searchValue) {
      const filteredFields = field.args?.filter(
        (a) =>
          a.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          a.type.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      const uniqeFilteredFields = new Set(
        filteredFields?.map((ff) => ff.type.name.toLowerCase()),
      );
      setFilteredFields(filteredFields);
      setFilteredFieldsTypes({
        fieldsTypes: Array.from(uniqeFilteredFields),
        searchValueEmpty: false,
      });
    } else {
      setFilteredFields(field.args);
      setFilteredFieldsTypes({
        fieldsTypes: undefined,
        searchValueEmpty: true,
      });
    }
  };

  const NodeContent = useMemo(
    () => (
      <ContentWrapper>
        <NodeTitle fade={fade}>
          <NodeName>
            <NameInRelation>{field.name}</NameInRelation>
          </NodeName>
          <NodeType fade={fade}>
            <ActiveType type={field.type} />
          </NodeType>
        </NodeTitle>
        {(field?.args?.length || 0) > 10 && (
          <SearchInput handleSearch={handleSearch} />
        )}
      </ContentWrapper>
    ),
    [field, theme, fade, selectedNode],
  );

  return (
    <Content
      isSelected={selectedNode?.field === field}
      isLibrary={isLibrary}
      fade={fade}
      isActive={!fade && typeof fade !== 'undefined'}
      nodeType={field.type.name as NodeTypes}
      isMoreThanTen={filteredFields && filteredFields.length > 10}
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setFilteredFieldsTypes({
          fieldsTypes: undefined,
          searchValueEmpty: true,
        });
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
