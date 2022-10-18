import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { fontFamilySans, transition } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { GraphQLEditorDomStructure } from '@/domStructure';
import styled from '@emotion/styled';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
export interface NewNodeProps {
  node: ParserField;
  onCreate: (name: string) => ParserField;
}

type NodeTypes = keyof EditorTheme['backgrounds'];

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  font-family: ${fontFamilySans};
  color: ${({ theme }) => theme.disabled};
  cursor: pointer;
  position: relative;
  font-size: 12px;
`;

const Plus = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
`;

const NameErrorMessage = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.error};
  font-size: 10px;
  left: 100%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  width: max-content;
`;

const NewNodeButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  height: 100%;
  transition: ${transition};
  &:hover {
    background-color: ${({ theme }) => theme.background.mainFurthest};
    color: ${({ theme }) => theme.text};
  }
`;

const NodeCreateBox = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  &:after {
    position: absolute;
    content: '+';
    font-size: 18px;
    font-weight: 600;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NodeCreate = styled.input<{
  nodeType: NodeTypes;
}>`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background.mainFurthest};
  border: 1px solid ${({ theme, nodeType }) => theme.backgrounds[nodeType]};
  display: flex;
  align-items: center;
  padding: 0 23px 0 15px;
  outline: 0;
  border-radius: 4px;
  font-family: ${fontFamilySans};
  animation: init 0.25s ease-in-out;

  @keyframes init {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.name-error {
    color: ${({ theme }) => theme.error};
  }
`;

export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree, setTree, setSelectedNode, setCreatedNode } =
    useTreesState();
  const isError =
    tree.nodes.map((n) => n.name).includes(newName) ||
    libraryTree.nodes.map((n) => n.name).includes(newName);
  const submit = () => {
    if (newName && !isError) {
      const n = onCreate(newName);
      setCreatedNode(n);
      tree.nodes.push(n);
      setTree({ ...tree });
      setSelectedNode({ field: n, source: 'diagram' });
    }
    setNewName('');
    setIsCreating(false);
  };
  return (
    <Container
      ref={thisNode}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.newNode}
      onClick={(e) => {
        e.stopPropagation();
        setIsCreating(true);
        setSelectedNode(undefined);
      }}
    >
      {isError && (
        <NameErrorMessage>{`Cannot create ${node.name} with name:${newName} type with that name already exists. Try different name.`}</NameErrorMessage>
      )}
      {!isCreating && (
        <NewNodeButton>
          <Plus>+</Plus>
          {`New ${node.name}`}
        </NewNodeButton>
      )}
      {isCreating && (
        <NodeCreateBox>
          <NodeCreate
            className={`${isError ? 'name-error' : ''}`}
            nodeType={node.name as NodeTypes}
            value={newName}
            autoFocus
            onChange={(e) => setNewName(e.target.value)}
            onBlur={submit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
          />
        </NodeCreateBox>
      )}
    </Container>
  );
};
