import React, { useState } from "react";
import {
  createParserField,
  TypeDefinition,
  Options,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  TypeSystemDefinitionDisplayMap,
  Directive,
} from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
import { Menu } from "@/Graf/Node/components";
import styled from "@emotion/styled";
import { transition } from "@/vars";
import { Plus, Stack } from "@aexol-studio/styling-system";
import { useRelationsState } from "@/state/containers";

interface NodeChangeFieldTypeMenuProps {
  hideMenu: () => void;
}

export const NewNodeMenu = React.forwardRef<
  HTMLDivElement,
  NodeChangeFieldTypeMenuProps
>(({ hideMenu, ...props }, ref) => {
  const { setTree, tree, setSelectedNodeId } = useTreesState();
  const { setEditMode } = useRelationsState();
  const [nodeName, setNodeName] = useState("");
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
    type: string
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
      source: "relation",
      value: {
        id: node.id,
        name: node.name,
      },
      justCreated: true,
    });
    setEditMode(node.id);
  };

  return (
    <Menu
      {...props}
      ref={ref}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <PaddingContainer direction="column" gap="0.25rem">
        {allTypes.map((nt) => (
          <React.Fragment key={nt.type}>
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
                  if (e.key === "Enter") {
                    createNode(nt.data, nt.type);
                    hideMenu();
                  }
                  if (e.key === "Escape") {
                    setCreating(undefined);
                    setNodeName("");
                  }
                }}
                onBlur={() => {
                  setCreating(undefined);
                  setNodeName("");
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
      </PaddingContainer>
    </Menu>
  );
});
NewNodeMenu.displayName = "NewNodeMenu";
const CreateNodeItem = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3rem;
  font-size: 16px;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.text.default};
  }

  background-color: ${({ theme }) => theme.neutral[500]};
  border-left: 1px solid
    ${({ type, theme }) => theme.colors[type as keyof typeof theme.colors]};
  transition: ${transition};
  border-radius: ${(p) => p.theme.radius}px;
  :hover {
    background-color: ${({ theme }) => theme.neutral[500]};
  }
`;
const CreateNodeName = styled.div`
  color: ${({ theme }) => theme.text.default};
  font-size: 16px;
`;

const CreationInput = styled.input<{ type: string }>`
  border: 0;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.neutral[500]};
  color: ${({ theme }) => theme.text.active};
  border-left: 1px solid
    ${({ type, theme }) => theme.colors[type as keyof typeof theme.colors]};
  font-size: 16px;
  outline: 0;
  background-color: ${(p) => p.theme.neutral[600]};
  border-radius: ${(p) => p.theme.radius}px;
  padding: 1rem;
`;

const PaddingContainer = styled(Stack)`
  padding: 1rem;
`;
