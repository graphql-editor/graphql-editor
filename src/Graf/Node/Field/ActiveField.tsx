import React, { useState } from 'react';
import { TypeSystemDefinition, ValueDefinition } from 'graphql-js-tree';
import { style } from 'typestyle';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from './FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import {
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from '@/Graf/Node/ContextMenu';
import { useTreesState } from '@/state/containers/trees';
import {
  DetailMenuItem,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
  Title,
} from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';

const Name = style({
  fontSize: FIELD_NAME_SIZE,
  marginRight: 4,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  minWidth: 30,
});
const Type = style({ fontSize: FIELD_TYPE_SIZE });
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 32,
  right: 5,
  zIndex: 2,
});
const TypeMenuContainer = style({
  position: 'absolute',
  top: 32,
  zIndex: 2,
});

export const ActiveField: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  indexInParentNode,
  parentNode,
  parentNodeTypeName,
  isLocked,
  onDelete,
}) => {
  const { tree, setTree, parentTypes, readonly } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;

  return (
    <NodeFieldContainer
      className={`NodeType-${parentNodeTypeName} ${
        inputOpen || menuOpen || outputOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled &&
        node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
          <FieldPort
            onClick={onInputClick}
            open={inputOpen}
            info={{
              message: 'Edit field arguments',
              placement: 'left',
            }}
          />
        )}
      <Title>
        <div className={Name}>
          <ActiveFieldName
            afterChange={
              isLocked
                ? undefined
                : (newName) => {
                    node.name = newName;
                    setTree({ ...tree });
                  }
            }
            data={node.data}
            name={
              node.data.type !== TypeSystemDefinition.UnionMemberDefinition
                ? node.name
                : ''
            }
            args={node.args}
            parentTypes={parentTypes}
          />
        </div>
        <div className={Type}>
          {!isEnumValue && (
            <ActiveType
              onClick={
                !readonly
                  ? () => setMenuOpen(menuOpen === 'type' ? undefined : 'type')
                  : undefined
              }
              type={node.type}
              parentTypes={parentTypes}
            />
          )}
          {menuOpen === 'type' && (
            <div className={TypeMenuContainer}>
              <NodeChangeFieldTypeMenu
                node={parentNode}
                fieldIndex={indexInParentNode}
                hideMenu={() => {
                  setMenuOpen(undefined);
                }}
              />
            </div>
          )}
        </div>
      </Title>
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'More', open: 'More' }}
          onClick={() => {
            setMenuOpen(menuOpen === 'details' ? undefined : 'details');
          }}
        >
          {menuOpen === 'details' && (
            <div className={OptionsMenuContainer}>
              <Menu
                menuName={'Node options'}
                hideMenu={() => setMenuOpen(undefined)}
              >
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            </div>
          )}
        </FieldPort>
      )}
      {!isLocked &&
        !isEnumValue &&
        node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
          <FieldPort
            icons={{ closed: 'Arrq', open: 'Arrq' }}
            onClick={() => {
              setMenuOpen(menuOpen === 'options' ? undefined : 'options');
            }}
          >
            {menuOpen === 'options' && (
              <div className={OptionsMenuContainer}>
                <NodeTypeOptionsMenu
                  hideMenu={() => {
                    setMenuOpen(undefined);
                  }}
                  node={node}
                />
              </div>
            )}
          </FieldPort>
        )}
      {!outputDisabled && (
        <FieldPort
          onClick={onOutputClick}
          open={outputOpen}
          info={{
            message: `Expand ${node.type.name} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
    </NodeFieldContainer>
  );
};
