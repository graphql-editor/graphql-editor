import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { NodeName, NodeTitle } from './SharedNode';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { Plus } from '@/Graf/icons';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
export interface NewNodeProps {
  node: ParserField;
  onCreate: (name: string) => ParserField;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

const NameErrorMessage = styled.div`
  position: absolute;
  height: 30px;
  top: -30px;
  color: ${({ theme }) => theme.error};
  width: 600px;
  font-size: 10px;
  margin-left: -10px;
  display: flex;
  align-items: center;
`;

const NodeCreate = styled.input`
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  font-size: 12px;
  padding: 5px 0 5px 10px;
  border: 0;
  outline: 0;
  font-family: ${fontFamily};
  width: 200px;

  &::placeholder {
    font-family: ${fontFamily};
  }

  &.name-error {
    color: ${({ theme }) => theme.error};
  }
`;

const MainNodeArea = styled.div<{
  nodeType: NodeTypes;
}>`
  position: relative;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, nodeType }) =>
      theme.backgrounds[nodeType]
        ? theme.backgrounds[nodeType]
        : 'transparent'};
  cursor: pointer;
  transition: border-color 0.25s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.hover};
  }
`;

const ChangedNodeTitle = styled(NodeTitle)`
  width: 200px;
  background-color: transparent;
`;

const NodeContainer = styled.div`
  margin: 10px;
`;

const PlusButton = styled.span`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  color: ${({ theme }) => theme.text};
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree, setSelectedNode } = useTreesState();
  const { theme } = useTheme();
  const isError =
    tree.nodes.map((n) => n.name).includes(newName) ||
    libraryTree.nodes.map((n) => n.name).includes(newName);
  const submit = () => {
    if (newName && !isError) {
      setSelectedNode({ field: onCreate(newName), source: 'diagram' });
    }
    setNewName('');
    setIsCreating(false);
  };
  return (
    <NodeContainer
      ref={thisNode}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.newNode}
    >
      <MainNodeArea
        nodeType={node.name as NodeTypes}
        onClick={(e) => {
          e.stopPropagation();
          setIsCreating(true);
          setSelectedNode(undefined);
        }}
      >
        <ChangedNodeTitle>
          {isError && (
            <NameErrorMessage>{`Cannot create ${node.name} with name:${newName} type with that name already exists. Try different name`}</NameErrorMessage>
          )}
          {!isCreating && <NodeName>{`New ${node.name}`}</NodeName>}
          {isCreating && (
            <NodeCreate
              className={`${isError ? 'name-error' : ''}`}
              value={newName}
              autoFocus
              placeholder={`New ${node.name} name...`}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
          )}
          {!isCreating && (
            <PlusButton>
              <Plus width={10} height={10} fill={theme.text} />
            </PlusButton>
          )}
        </ChangedNodeTitle>
      </MainNodeArea>
    </NodeContainer>
  );
};
