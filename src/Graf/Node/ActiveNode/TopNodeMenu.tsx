import React, { useEffect, useState } from 'react';
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
import { More, Interface, Monkey, Plus, Tick, Arrq } from '@/Graf/icons';
import {
  NodeAddDirectiveMenu,
  NodeDirectiveOptionsMenu,
  NodeImplementInterfacesMenu,
  NodeAddFieldMenu,
  NodeOperationsMenu,
  NodeFieldsRequiredMenu,
} from '@/Graf/Node/ContextMenu';
import { style } from 'typestyle';
import { useTreesState } from '@/state/containers/trees';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTheme } from '@/state/containers';
import { getScalarFields } from '@/Graf/utils/getScalarFields';

type PossibleMenus =
  | 'field'
  | 'interface'
  | 'directive'
  | 'options'
  | 'operations'
  | 'required';

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
  onInputCreate?: () => void;
}> = ({ node, onDelete, onDuplicate, onInputCreate }) => {
  const { setSelectedNode, scalars } = useTreesState();
  const { theme } = useTheme();

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

  const hideMenu = () => {
    setMenuOpen(undefined);
  };

  return (
    <>
      {node.data.type !== TypeDefinition.ScalarTypeDefinition &&
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
      {isRequiredMenuValid() && (
        <div
          className={'NodeIconArea'}
          onClick={() => {
            setMenuOpen('required');
          }}
          data-cy={cyMenu.Required}
          title="Click to mark all fields as required/non-required"
        >
          <Arrq
            fill={menuOpen === 'required' ? theme.success : theme.text}
            height={ICON_SIZE}
            width={ICON_SIZE}
          />
          {menuOpen === 'required' && (
            <div className={NodeMenuContainer}>
              <NodeFieldsRequiredMenu hideMenu={hideMenu} node={node} />
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
                    Create node input
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
