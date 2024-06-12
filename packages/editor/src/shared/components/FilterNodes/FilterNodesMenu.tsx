import React from "react";
import { TypeDefinition, TypeSystemDefinition } from "graphql-js-tree";
import { Menu } from "@/Graf/Node/components";
import styled from "@emotion/styled";
import { transition } from "@/vars";
import { Check, Stack } from "@aexol-studio/styling-system";
import { useRelationsState } from "@/state/containers";

interface NodeChangeFieldTypeMenuProps {
  hideMenu: () => void;
}

export const FilterNodesMenu = React.forwardRef<
  HTMLDivElement,
  NodeChangeFieldTypeMenuProps
>(({ hideMenu, ...props }, ref) => {
  const { omitNodes, setOmitNodes, setBaseTypesOn, baseTypesOn } =
    useRelationsState();

  const selectableFilters: Array<
    [string, keyof NonNullable<typeof omitNodes>]
  > = [
    ["interface", TypeDefinition.InterfaceTypeDefinition],
    ["scalar", TypeDefinition.ScalarTypeDefinition],
    ["union", TypeDefinition.UnionTypeDefinition],
    ["enum", TypeDefinition.EnumTypeDefinition],
    ["type", TypeDefinition.ObjectTypeDefinition],
    ["input", TypeDefinition.InputObjectTypeDefinition],
    ["directive", TypeSystemDefinition.DirectiveDefinition],
  ];

  return (
    <Menu
      {...props}
      ref={ref}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <PaddingContainer direction="column" gap="0.25rem">
        <CreateNodeItem
          active={baseTypesOn}
          onClick={() => {
            setBaseTypesOn(!baseTypesOn);
          }}
        >
          <CreateNodeName>built-in fields</CreateNodeName>
          {baseTypesOn && <Check />}
        </CreateNodeItem>
        {selectableFilters.map(([label, value]) => (
          <CreateNodeItem
            type={label}
            key={label}
            active={!omitNodes?.[value]}
            onClick={() => {
              setOmitNodes({
                ...omitNodes,
                [value]: !omitNodes?.[value],
              });
            }}
          >
            <CreateNodeName>{label}</CreateNodeName>
            {!omitNodes?.[value] && <Check />}
          </CreateNodeItem>
        ))}
      </PaddingContainer>
    </Menu>
  );
});

const CreateNodeItem = styled.div<{ type?: string; active?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2rem;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.text.default : theme.text.disabled};
  svg {
    color: ${({ theme }) => theme.text.default};
    height: 1rem;
  }

  background-color: ${({ theme }) => theme.neutrals.L6};
  border-left: 1px solid
    ${({ type, theme }) =>
      type
        ? theme.colors[type as keyof typeof theme.colors]
        : theme.text.default};
  transition: ${transition};
  border-radius: ${(p) => p.theme.border.primary.radius};
  :hover {
    background-color: ${({ theme }) => theme.neutrals.L7};
  }
`;
const CreateNodeName = styled.div`
  font-size: 0.75rem;
`;

const PaddingContainer = styled(Stack)`
  padding: 1rem;
`;
