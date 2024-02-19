import React, { useEffect, useState } from "react";
import {
  TypeDefinition,
  ValueDefinition,
  ParserField,
  TypeSystemDefinition,
  Instances,
  Options,
  compileType,
  createParserField,
  TypeDefinitionDisplayMap,
} from "graphql-js-tree";
import {
  MenuScrollingArea,
  DetailMenuItem,
  Menu,
} from "@/Graf/Node/components";
import {
  NodeAddDirectiveMenu,
  NodeDirectiveOptionsMenu,
  NodeAddFieldMenu,
  ContextMenu,
} from "@/shared/components/ContextMenu";
import { useTreesState } from "@/state/containers/trees";
import { getScalarFields } from "@/Graf/utils/getScalarFields";
import styled from "@emotion/styled";
import { ResolveExtension, isExtensionNode } from "@/GraphQL/Resolve";
import { transition } from "@/vars";
import {
  AtSign,
  DotsHorizontal,
  PlusLarge,
  Stack,
  Tooltip,
} from "@aexol-studio/styling-system";
import { dataIt } from "@/Models";

type PossibleMenus =
  | "field"
  | "interface"
  | "directive"
  | "options"
  | "operations";
const NodeIconArea = styled.div<{ opened?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: ${transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L2};
  }
  color: ${({ opened, theme }) =>
    opened ? theme.accent.L2 : theme.text.default};
`;

export const TopNodeMenu: React.FC<{
  node: ParserField;
  parentNode?: ParserField;
  onDelete: () => void;
  onDuplicate?: () => void;
  onInputCreate?: () => void;
  isLibrary?: boolean;
}> = ({
  node,
  parentNode,
  onDelete,
  onDuplicate,
  onInputCreate,
  isLibrary,
}) => {
  const { scalars, tree, setTree, selectedNodeId, setSelectedNodeId } =
    useTreesState();

  const [menuOpen, setMenuOpen] = useState<PossibleMenus>();
  const [closeMenu, setCloseMenu] = useState(false);

  const isCreateInputValid = () =>
    getScalarFields(node, scalars)?.length > 0 &&
    node.data.type === "ObjectTypeDefinition";

  const isRequiredMenuValid = () =>
    node.data.type === TypeDefinition.InterfaceTypeDefinition ||
    node.data.type === TypeDefinition.InputObjectTypeDefinition ||
    (node.data.type === TypeDefinition.ObjectTypeDefinition &&
      (node.interfaces?.length === 0 ||
        (!node.interfaces && !!node.args?.length)));

  useEffect(() => {
    hideMenu();
  }, [closeMenu]);

  useEffect(() => {
    if (node.id === selectedNodeId?.value?.id && selectedNodeId.justCreated) {
      setMenuOpen("field");
    }
  }, [selectedNodeId?.value?.id]);

  const hideMenu = () => {
    setMenuOpen(undefined);
  };

  return (
    <Stack direction="row" gap="0.5rem" align="center">
      {!isLibrary && (
        <>
          {node.data.type !== TypeDefinition.ScalarTypeDefinition &&
            node.data.type !== ValueDefinition.EnumValueDefinition && (
              <ContextMenu
                isOpen={menuOpen === "field"}
                close={() => setMenuOpen(undefined)}
                Trigger={({ triggerProps }) => (
                  <Tooltip title="Add field">
                    <NodeIconArea
                      {...dataIt("addField")}
                      {...triggerProps}
                      onClick={() => {
                        setMenuOpen("field");
                      }}
                      opened={menuOpen === "field"}
                    >
                      <PlusLarge width={18} height={18} />
                    </NodeIconArea>
                  </Tooltip>
                )}
              >
                {({ layerProps }) => (
                  <NodeAddFieldMenu
                    {...layerProps}
                    node={node}
                    hideMenu={hideMenu}
                  />
                )}
              </ContextMenu>
            )}

          {node.data.type !== Instances.Directive && (
            <ContextMenu
              isOpen={menuOpen === "directive"}
              close={() => setMenuOpen(undefined)}
              Trigger={({ triggerProps }) => (
                <Tooltip title="Add directive">
                  <NodeIconArea
                    {...dataIt("addDirective")}
                    {...triggerProps}
                    onClick={() => {
                      setMenuOpen("directive");
                    }}
                    opened={menuOpen === "directive"}
                  >
                    <AtSign width={18} height={18} />
                  </NodeIconArea>{" "}
                </Tooltip>
              )}
            >
              {({ layerProps }) => (
                <>
                  {node.data.type !==
                    TypeSystemDefinition.DirectiveDefinition && (
                    <NodeAddDirectiveMenu
                      {...layerProps}
                      node={node}
                      hideMenu={hideMenu}
                    />
                  )}
                  {node.data.type ===
                    TypeSystemDefinition.DirectiveDefinition && (
                    <NodeDirectiveOptionsMenu
                      {...layerProps}
                      node={node}
                      hideMenu={hideMenu}
                    />
                  )}
                </>
              )}
            </ContextMenu>
          )}
        </>
      )}

      {!parentNode && (
        <ContextMenu
          isOpen={menuOpen === "options"}
          close={() => setMenuOpen(undefined)}
          Trigger={({ triggerProps }) => (
            <Tooltip title="Node actions">
              <NodeIconArea
                {...dataIt("nodeOptions")}
                {...triggerProps}
                onClick={() => {
                  setMenuOpen("options");
                }}
                opened={menuOpen === "options"}
              >
                <DotsHorizontal width={18} height={18} />
              </NodeIconArea>
            </Tooltip>
          )}
        >
          {({ layerProps }) => (
            <Menu {...layerProps} menuName={"Node options"} hideMenu={hideMenu}>
              <MenuScrollingArea>
                {!isLibrary && (
                  <>
                    <DetailMenuItem onClick={onDelete}>
                      Delete node
                    </DetailMenuItem>
                    {isRequiredMenuValid() && (
                      <>
                        <DetailMenuItem
                          onClick={() => {
                            node.args?.forEach((arg) => {
                              if (
                                arg.type.fieldType.type === Options.required
                              ) {
                                arg.type.fieldType = {
                                  ...arg.type.fieldType.nest,
                                };
                              }
                            });
                            const idx = tree.nodes.findIndex(
                              (n) => n.name === node.name
                            );
                            tree.nodes.splice(idx, 1, node);
                            setTree({ nodes: tree.nodes }, false);
                          }}
                        >
                          Make all fields optional
                        </DetailMenuItem>
                        <DetailMenuItem
                          onClick={() => {
                            node.args?.forEach((arg) => {
                              const argType = compileType(arg.type.fieldType);
                              if (!argType.endsWith("!")) {
                                arg.type.fieldType = {
                                  type: Options.required,
                                  nest: arg.type.fieldType,
                                };
                              }
                            });

                            const idx = tree.nodes.findIndex(
                              (n) => n.name === node.name
                            );
                            tree.nodes.splice(idx, 1, node);
                            setTree({ nodes: tree.nodes }, false);
                          }}
                        >
                          Make all fields required
                        </DetailMenuItem>
                      </>
                    )}
                  </>
                )}
                {!isExtensionNode(node.data.type) && (
                  <DetailMenuItem
                    onClick={() => {
                      const extendNode = createParserField({
                        data: {
                          type: ResolveExtension(node.data.type),
                        },
                        description: undefined,
                        type: {
                          fieldType: {
                            name: TypeDefinitionDisplayMap[
                              ResolveExtension(node.data.type)
                            ],
                            type: Options.name,
                          },
                        },
                        name: node.name,
                        args: [],
                        interfaces: [],
                        directives: [],
                      });
                      tree.nodes.push(extendNode);
                      setTree({ ...tree });
                      setSelectedNodeId({
                        value: {
                          id: extendNode.id,
                          name: extendNode.name,
                        },
                        source: "relation",
                      });
                    }}
                  >
                    Extend node
                  </DetailMenuItem>
                )}
                {!isExtensionNode(node.data.type) && onDuplicate && (
                  <DetailMenuItem
                    onClick={() => {
                      setCloseMenu((prevValue) => !prevValue);
                      onDuplicate();
                    }}
                  >
                    Duplicate node
                  </DetailMenuItem>
                )}
                {onInputCreate && isCreateInputValid() && (
                  <DetailMenuItem
                    onClick={() => {
                      setCloseMenu((prevValue) => !prevValue);
                      onInputCreate();
                    }}
                  >
                    Create input from node
                  </DetailMenuItem>
                )}
              </MenuScrollingArea>
            </Menu>
          )}
        </ContextMenu>
      )}
    </Stack>
  );
};
