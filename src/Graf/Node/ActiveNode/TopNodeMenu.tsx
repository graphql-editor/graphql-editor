import React, { useState } from 'react';
import { TypeDefinition, ValueDefinition, ParserField, TypeSystemDefinition } from 'graphql-zeus';
import { MenuScrollingArea, DetailMenuItem, Menu } from '@/Graf/Node/components';
import { More, Interface, Monkey, Plus } from '@/Graf/icons';
import {
  NodeAddDirectiveMenu,
  NodeDirectiveOptionsMenu,
  NodeImplementInterfacesMenu,
  NodeAddFieldMenu,
} from '@/Graf/Node/ContextMenu';
import { style } from 'typestyle';
import { useTreesState } from '@/state/containers/trees';

type PossibleMenus = 'field' | 'interface' | 'directive' | 'options';

const NodeMenuContainer = style({
  position: 'absolute',
  top: 35,
  zIndex: 2,
});

export const TopNodeMenu: React.FC<{
  node: ParserField;
  onDelete: () => void;
  onDuplicate: () => void;
}> = ({ node, onDelete, onDuplicate }) => {
  const { tree, setTree } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<PossibleMenus>();

  const hideMenu = () => {
    setMenuOpen(undefined);
  };
  return (
    <>
      {node.data.type !== TypeDefinition.ScalarTypeDefinition && node.data.type !== TypeDefinition.EnumTypeDefinition && (
        <div
          className={'NodeIconArea'}
          onClick={() => {
            setMenuOpen('field');
          }}
          title="Click to add field"
        >
          <Plus height={10} width={10} />
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
          <Plus height={10} width={10} />
        </div>
      )}

      {node.data.type === TypeDefinition.ObjectTypeDefinition && (
        <div
          className={'NodeIconArea'}
          onClick={() => {
            setMenuOpen('interface');
          }}
          title="Click to implement interface"
        >
          <Interface height={10} width={10} />
          {menuOpen === 'interface' && (
            <div className={NodeMenuContainer}>
              <NodeImplementInterfacesMenu node={node} hideMenu={hideMenu} />
            </div>
          )}
        </div>
      )}
      <div
        className={'NodeIconArea'}
        onClick={() => {
          setMenuOpen('directive');
        }}
        title="Click to add directive"
      >
        <Monkey height={10} width={10} />
        {menuOpen === 'directive' && node.data.type !== TypeSystemDefinition.DirectiveDefinition && (
          <div className={NodeMenuContainer}>
            <NodeAddDirectiveMenu node={node} hideMenu={hideMenu} />
          </div>
        )}
        {menuOpen === 'directive' && node.data.type === TypeSystemDefinition.DirectiveDefinition && (
          <div className={NodeMenuContainer}>
            <NodeDirectiveOptionsMenu node={node} hideMenu={hideMenu} />
          </div>
        )}
      </div>
      <div
        className={'NodeIconArea'}
        onClick={() => {
          setMenuOpen('options');
        }}
        title="Click to see node actions"
      >
        <More height={10} width={10} />
        {menuOpen === 'options' && (
          <div className={NodeMenuContainer}>
            <Menu hideMenu={hideMenu}>
              <MenuScrollingArea>
                <DetailMenuItem onClick={onDelete}>Delete node</DetailMenuItem>
                <DetailMenuItem onClick={onDuplicate}>Duplicate node</DetailMenuItem>
              </MenuScrollingArea>
            </Menu>
          </div>
        )}
      </div>
    </>
  );
};
