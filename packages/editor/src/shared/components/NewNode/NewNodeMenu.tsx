import React, { useState } from 'react';
import {
  createParserField,
  TypeDefinition,
  Options,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  TypeSystemDefinitionDisplayMap,
  Directive,
} from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
import { Menu } from '@/Graf/Node/components';
import styled from '@emotion/styled';
import { transition } from '@/vars';
import { Plus } from '@/icons/Plus';

interface NodeChangeFieldTypeMenuProps {
  hideMenu: () => void;
}

export const NewNodeMenu = React.forwardRef<
  HTMLDivElement,
  NodeChangeFieldTypeMenuProps
>(({ hideMenu, ...props }, ref) => {
  const { setTree, tree, setSelectedNodeId } = useTreesState();
  const [nodeName, setNodeName] = useState('');
  const [creating, setCreating] = useState<
    TypeDefinition | TypeSystemDefinition
  >();

  const nodeTypes = [
    TypeDefinition.ObjectTypeDefinition,
    TypeDefinition.InterfaceTypeDefinition,
    TypeDefinition.UnionTypeDefinition,
    TypeDefinition.InputObjectTypeDefinition,
    TypeDefinition.EnumTypeDefinition,
    TypeDefinition.ScalarTypeDefinition,
  ];

  const allTypes = [
    ...nodeTypes.map((nt) => ({
      data: nt,
      type: TypeDefinitionDisplayMap[nt],
    })),
    {
      data: TypeSystemDefinition.DirectiveDefinition,
      type: TypeSystemDefinitionDisplayMap[
        TypeSystemDefinition.DirectiveDefinition
      ],
    },
  ];

  const createNode = (
    data: TypeDefinition | TypeSystemDefinition,
    type: string,
  ) => {
    const node = createParserField({
      data: {
        type: data,
      },
      name: nodeName,
      type: {
        fieldType: {
          name: type,
          type: Options.name,
        },
        ...(data === TypeSystemDefinition.DirectiveDefinition
          ? {
              directiveOptions: [Directive.OBJECT],
            }
          : {}),
      },
    });
    tree.nodes.push(node);
    setTree({ ...tree });
    setSelectedNodeId({
      source: 'relation',
      value: {
        id: node.id,
        name: node.name,
      },
      justCreated: true,
    });
  };

  return (
    <NodeMenuContainer>
      <Menu
        {...props}
        ref={ref}
        menuName={'New Node'}
        onScroll={(e) => e.stopPropagation()}
        hideMenu={hideMenu}
      >
        {allTypes.map((nt) => (
          <React.Fragment>
            {creating === nt.data && (
              <CreationInput
                autoFocus
                value={nodeName}
                placeholder={`Create ${nt.type}`}
                type={nt.type}
                onChange={(e) => {
                  setNodeName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createNode(nt.data, nt.type);
                    hideMenu();
                  }
                  if (e.key === 'Escape') {
                    setCreating(undefined);
                    setNodeName('');
                  }
                }}
                onBlur={() => {
                  setCreating(undefined);
                  setNodeName('');
                }}
              />
            )}
            {creating !== nt.data && (
              <CreateNodeItem
                type={nt.type}
                key={nt.type}
                onClick={() => {
                  setCreating(nt.data);
                }}
              >
                <CreateNodeName>{nt.type}</CreateNodeName>
                <Plus />
              </CreateNodeItem>
            )}
          </React.Fragment>
        ))}
      </Menu>
    </NodeMenuContainer>
  );
});
const CreateNodeItem = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.text};
  }

  background-color: ${({ theme }) => theme.background.mainFar};
  border-bottom: ${({ type, theme }) =>
      theme.colors[type as keyof typeof theme.colors]}
    2px solid;
  transition: ${transition};
  :hover {
    background-color: ${({ theme }) => theme.background.mainMiddle};
  }
`;
const CreateNodeName = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;
const NodeMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
`;

const CreationInput = styled.input<{ type: string }>`
  border: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.background.mainFar};
  border-bottom: ${({ type, theme }) =>
      theme.colors[type as keyof typeof theme.colors]}
    2px solid;
  color: ${({ type, theme }) =>
    theme.colors[type as keyof typeof theme.colors]};
  font-size: 16px;
  outline: 0;
  padding: 1rem;
`;
