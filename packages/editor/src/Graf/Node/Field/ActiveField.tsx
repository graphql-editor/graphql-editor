import React, { useState } from 'react';
import {
  getTypeName,
  TypeSystemDefinition,
  ValueDefinition,
} from 'graphql-js-tree';
import {
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from '@/shared/components/ContextMenu';
import { useTreesState } from '@/state/containers/trees';
import {
  DetailMenuItem,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
} from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { ActiveGrafFieldName } from '@/Graf/Node/Field/ActiveGrafFieldName';
import { ActiveGrafType } from '@/Graf/Node/Field/ActiveGrafType';

const OptionsMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
  transform: translate(calc(50%), calc(50% + 21px));
`;

const TypeMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
`;

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
  isLocked,
  onDelete,
}) => {
  const { parentTypes, readonly, updateNode } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;

  return (
    <NodeFieldContainer
      className={`${inputOpen || menuOpen || outputOpen ? 'Active' : ''}`}
    >
      {node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
        <ActiveGrafFieldName
          afterChange={
            isLocked
              ? undefined
              : (newName) => {
                  node.name = newName;
                  updateNode(node);
                }
          }
          data={node.data}
          name={node.name}
          args={node.args}
          parentTypes={parentTypes}
        />
      )}
      {!isEnumValue && (
        <ActiveGrafType
          onClick={
            !readonly
              ? () => setMenuOpen(menuOpen === 'type' ? undefined : 'type')
              : undefined
          }
          type={node.type}
          parentTypes={parentTypes}
        >
          {menuOpen === 'type' && (
            <TypeMenuContainer>
              <NodeChangeFieldTypeMenu
                node={parentNode}
                fieldIndex={indexInParentNode}
                hideMenu={() => {
                  setMenuOpen(undefined);
                }}
              />
            </TypeMenuContainer>
          )}
        </ActiveGrafType>
      )}
      <Actions>
        {!inputDisabled &&
          node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
            <FieldPort
              onClick={onInputClick}
              open={inputOpen}
              info={{
                message: 'Field arguments and directives',
                placement: 'left',
              }}
            />
          )}
        {!isLocked && (
          <FieldPort
            icons={{ closed: 'More', open: 'More' }}
            onClick={() => {
              setMenuOpen(menuOpen === 'details' ? undefined : 'details');
            }}
          >
            {menuOpen === 'details' && (
              <OptionsMenuContainer>
                <Menu
                  menuName={'Node options'}
                  hideMenu={() => setMenuOpen(undefined)}
                >
                  <MenuScrollingArea>
                    <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                  </MenuScrollingArea>
                </Menu>
              </OptionsMenuContainer>
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
                <OptionsMenuContainer>
                  <NodeTypeOptionsMenu
                    hideMenu={() => {
                      setMenuOpen(undefined);
                    }}
                    node={node}
                  />
                </OptionsMenuContainer>
              )}
            </FieldPort>
          )}
        {!outputDisabled && (
          <FieldPort
            onClick={onOutputClick}
            open={outputOpen}
            info={{
              message: `Expand ${getTypeName(node.type.fieldType)} details`,
              placement: 'right',
            }}
          />
        )}
      </Actions>
    </NodeFieldContainer>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  pointer-events: none;
  z-index: 2;
`;
