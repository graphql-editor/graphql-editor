import React, { useState } from 'react';
import {
  TypeDefinition,
  ValueDefinition,
  ParserField,
  TypeSystemDefinition,
  Instances,
} from 'graphql-js-tree';
import {
  MenuScrollingArea,
  DetailMenuItem,
  Menu,
} from '@/Graf/Node/components';
import { More, Interface, Monkey, Plus, Tick } from '@/Graf/icons';
import {
  NodeAddDirectiveMenu,
  NodeDirectiveOptionsMenu,
  NodeImplementInterfacesMenu,
  NodeAddFieldMenu,
  NodeOperationsMenu,
} from '@/Graf/Node/ContextMenu';
import { style } from 'typestyle';
import { useTreesState } from '@/state/containers/trees';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTheme } from '@/state/containers';

type PossibleMenus =
  | 'field'
  | 'interface'
  | 'directive'
  | 'options'
  | 'operations';

const NodeMenuContainer = style({
  position: 'absolute',
  top: 35,
  zIndex: 2,
  right: 5,
});
const ICON_SIZE = 14;
const cyMenu =
  GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu;
export const TopNodeMenu: React.FC<{
  node: ParserField;
  onDelete: () => void;
  onDuplicate?: () => void;
}> = ({ node, onDelete, onDuplicate }) => {
  const { tree, setTree, setSelectedNode } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<PossibleMenus>();
  const { theme } = useTheme();

  const hideMenu = () => {
    setMenuOpen(undefined);
  };
  return (
    <>
      {node.data.type !== TypeDefinition.ScalarTypeDefinition &&
        node.data.type !== TypeDefinition.EnumTypeDefinition &&
        node.data.type !== ValueDefinition.EnumValueDefinition && (
          <div
            className={'NodeIconArea'}
            data-cy={cyMenu.CreateField}
            onClick={() => {
              setMenuOpen('field');
            }}
            title="Click to add field"
          >
            <Plus
              fill={menuOpen === 'field' ? theme.success : theme.text}
              height={ICON_SIZE}
              width={ICON_SIZE}
            />
            {menuOpen === 'field' && (
              <div className={NodeMenuContainer}>
                <NodeAddFieldMenu node={node} hideMenu={hideMenu} />
              </div>
            )}
          </div>
        )}
      {node.data.type === TypeDefinition.EnumTypeDefinition && (
        <div
          className={'NodeIconArea'}
          data-cy={cyMenu.CreateField}
          onClick={() => {
            node.args = [
              ...(node.args || []),
              {
                data: {
                  type: ValueDefinition.EnumValueDefinition,
                },
                name: 'enumValue' + ((node.args?.length || 0) + 1),
                type: {
                  name: ValueDefinition.EnumValueDefinition,
                },
              },
            ];
            setTree({ ...tree });
          }}
          title="Click to add field"
        >
          <Plus height={ICON_SIZE} width={ICON_SIZE} />
        </div>
      )}

      {(node.data.type === TypeDefinition.ObjectTypeDefinition ||
        node.data.type === TypeDefinition.InterfaceTypeDefinition) && (
        <>
          {/* TODO: Implement operations menu */}
          <div
            className={'NodeIconArea'}
            onClick={() => {
              setMenuOpen('interface');
            }}
            data-cy={cyMenu.Implement}
            title="Click to implement interface"
          >
            <Interface
              fill={menuOpen === 'interface' ? theme.success : theme.text}
              height={ICON_SIZE}
              width={ICON_SIZE}
            />
            {menuOpen === 'interface' && (
              <div className={NodeMenuContainer}>
                <NodeImplementInterfacesMenu node={node} hideMenu={hideMenu} />
              </div>
            )}
          </div>
        </>
      )}
      {node.data.type !== Instances.Directive && (
        <div
          className={'NodeIconArea'}
          onClick={() => {
            setMenuOpen('directive');
          }}
          data-cy={cyMenu.Directive}
          title="Click to add directive"
        >
          <Monkey
            fill={menuOpen === 'directive' ? theme.success : theme.text}
            height={ICON_SIZE}
            width={ICON_SIZE}
          />
          {menuOpen === 'directive' &&
            node.data.type !== TypeSystemDefinition.DirectiveDefinition && (
              <div className={NodeMenuContainer}>
                <NodeAddDirectiveMenu node={node} hideMenu={hideMenu} />
              </div>
            )}
          {menuOpen === 'directive' &&
            node.data.type === TypeSystemDefinition.DirectiveDefinition && (
              <div className={NodeMenuContainer}>
                <NodeDirectiveOptionsMenu node={node} hideMenu={hideMenu} />
              </div>
            )}
        </div>
      )}
      {node.data.type === TypeDefinition.ObjectTypeDefinition && (
        <>
          {/* TODO: Implement operations menu */}
          <div
            className={'NodeIconArea'}
            onClick={() => {
              setMenuOpen('operations');
            }}
            data-cy={cyMenu.Operations}
            title="Click set schema query, mutation, subscription"
          >
            <Tick
              height={ICON_SIZE}
              width={ICON_SIZE}
              fill={menuOpen === 'operations' ? theme.success : theme.text}
            />
            {menuOpen === 'operations' && (
              <div className={NodeMenuContainer}>
                <NodeOperationsMenu node={node} hideMenu={hideMenu} />
              </div>
            )}
          </div>
        </>
      )}
      <div
        className={'NodeIconArea'}
        onClick={() => {
          setMenuOpen('options');
        }}
        data-cy={cyMenu.Options}
        title="Click to see node actions"
      >
        <More
          fill={menuOpen === 'options' ? theme.success : theme.text}
          height={ICON_SIZE}
          width={ICON_SIZE}
        />
        {menuOpen === 'options' && (
          <div className={NodeMenuContainer}>
            <Menu menuName={'Node options'} hideMenu={hideMenu}>
              <MenuScrollingArea>
                <DetailMenuItem onClick={onDelete}>Delete node</DetailMenuItem>
                {onDuplicate && (
                  <DetailMenuItem onClick={onDuplicate}>
                    Duplicate node
                  </DetailMenuItem>
                )}
                <DetailMenuItem
                  onClick={() => {
                    setSelectedNode(undefined);
                  }}
                >
                  Deselect node
                </DetailMenuItem>
              </MenuScrollingArea>
            </Menu>
          </div>
        )}
      </div>
    </>
  );
};
