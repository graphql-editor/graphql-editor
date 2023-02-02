import React, { useEffect, useState } from 'react';
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
} from 'graphql-js-tree';
import {
  MenuScrollingArea,
  DetailMenuItem,
  Menu,
} from '@/Graf/Node/components';
import {
  NodeAddDirectiveMenu,
  NodeDirectiveOptionsMenu,
  NodeAddFieldMenu,
  NodeOperationsMenu,
  ContextMenu,
} from '@/shared/components/ContextMenu';
import { useTreesState } from '@/state/containers/trees';
import { getScalarFields } from '@/Graf/utils/getScalarFields';
import styled from '@emotion/styled';
import { ResolveExtension } from '@/GraphQL/Resolve';
import { At } from '@/icons/At';
import { Plus } from '@/icons/Plus';
import { CheckSquareEmpty } from '@/icons/CheckSquareEmpty';
import { Menu as MenuIcon } from '@/icons/Menu';
import { transition } from '@/vars';

type PossibleMenus =
  | 'field'
  | 'interface'
  | 'directive'
  | 'options'
  | 'operations';
const NodeIconArea = styled.div<{ opened?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 24px;
  height: 24px;
  transition: background-color 0.25s ease-in-out;
  background-color: transparent;
  cursor: pointer;
  border-radius: 12px;
  transition: ${transition};
  &:hover {
    background-color: ${({ theme }) => theme.background.mainFurthest};
    color: ${({ theme }) => theme.active};
  }
  color: ${({ opened, theme }) => (opened ? theme.active : theme.disabled)};
`;

export const TopNodeMenu: React.FC<{
  node: ParserField;
  parentNode?: ParserField;
  onDelete: () => void;
  onDuplicate?: () => void;
  onInputCreate?: () => void;
}> = ({ node, parentNode, onDelete, onDuplicate, onInputCreate }) => {
  const { scalars, tree, setTree, selectedNode, setSelectedNode } =
    useTreesState();

  const [menuOpen, setMenuOpen] = useState<PossibleMenus>();
  const [closeMenu, setCloseMenu] = useState(false);

  const isCreateInputValid = () =>
    getScalarFields(node, scalars)?.length > 0 &&
    node.data.type === 'ObjectTypeDefinition';

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
    if (node.id === selectedNode?.field?.id && selectedNode.justCreated) {
      setMenuOpen('field');
    }
  }, [selectedNode]);

  const hideMenu = () => {
    setMenuOpen(undefined);
  };

  return (
    <>
      {node.data.type !== TypeDefinition.ScalarTypeDefinition &&
        node.data.type !== ValueDefinition.EnumValueDefinition && (
          <ContextMenu
            isOpen={menuOpen === 'field'}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => (
              <NodeIconArea
                {...triggerProps}
                onClick={() => {
                  setMenuOpen('field');
                }}
                title="Click to add field"
                opened={menuOpen === 'field'}
              >
                <Plus />
              </NodeIconArea>
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
          isOpen={menuOpen === 'directive'}
          close={() => setMenuOpen(undefined)}
          Trigger={({ triggerProps }) => (
            <NodeIconArea
              {...triggerProps}
              onClick={() => {
                setMenuOpen('directive');
              }}
              title="Click to add directive"
              opened={menuOpen === 'directive'}
            >
              <At />
            </NodeIconArea>
          )}
        >
          {({ layerProps }) => (
            <>
              {node.data.type !== TypeSystemDefinition.DirectiveDefinition && (
                <NodeAddDirectiveMenu
                  {...layerProps}
                  node={node}
                  hideMenu={hideMenu}
                />
              )}
              {node.data.type === TypeSystemDefinition.DirectiveDefinition && (
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
      {node.data.type === TypeDefinition.ObjectTypeDefinition && (
        <ContextMenu
          isOpen={menuOpen === 'operations'}
          close={() => setMenuOpen(undefined)}
          Trigger={({ triggerProps }) => (
            <NodeIconArea
              {...triggerProps}
              onClick={() => {
                setMenuOpen('operations');
              }}
              opened={menuOpen === 'operations'}
              title="Click set schema query, mutation, subscription"
            >
              <CheckSquareEmpty />
            </NodeIconArea>
          )}
        >
          {({ layerProps }) => (
            <NodeOperationsMenu
              {...layerProps}
              node={node}
              hideMenu={hideMenu}
            />
          )}
        </ContextMenu>
      )}
      {!parentNode && (
        <ContextMenu
          isOpen={menuOpen === 'options'}
          close={() => setMenuOpen(undefined)}
          Trigger={({ triggerProps }) => (
            <NodeIconArea
              {...triggerProps}
              onClick={() => {
                setMenuOpen('options');
              }}
              title="Click to see node actions"
              opened={menuOpen === 'options'}
            >
              <MenuIcon />
            </NodeIconArea>
          )}
        >
          {({ layerProps }) => (
            <Menu {...layerProps} menuName={'Node options'} hideMenu={hideMenu}>
              <MenuScrollingArea>
                <DetailMenuItem onClick={onDelete}>Delete node</DetailMenuItem>
                <DetailMenuItem
                  onClick={() => {
                    const extendNode = createParserField({
                      data: {
                        type: ResolveExtension(node.data.type)!,
                      },
                      description: undefined,
                      type: {
                        fieldType: {
                          name: TypeDefinitionDisplayMap[
                            ResolveExtension(node.data.type)!
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
                    setSelectedNode({ field: extendNode, source: 'diagram' });
                  }}
                >
                  Extend node
                </DetailMenuItem>
                {onDuplicate && (
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
                {isRequiredMenuValid() && (
                  <>
                    <DetailMenuItem
                      onClick={() => {
                        node.args?.forEach((arg) => {
                          if (arg.type.fieldType.type === Options.required) {
                            arg.type.fieldType = {
                              ...arg.type.fieldType.nest,
                            };
                          }
                        });
                        const idx = tree.nodes.findIndex(
                          (n) => n.name === node.name,
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
                          if (!argType.endsWith('!')) {
                            arg.type.fieldType = {
                              type: Options.required,
                              nest: arg.type.fieldType,
                            };
                          }
                        });

                        const idx = tree.nodes.findIndex(
                          (n) => n.name === node.name,
                        );
                        tree.nodes.splice(idx, 1, node);
                        setTree({ nodes: tree.nodes }, false);
                      }}
                    >
                      Make all fields required
                    </DetailMenuItem>
                  </>
                )}
              </MenuScrollingArea>
            </Menu>
          )}
        </ContextMenu>
      )}
    </>
  );
};
