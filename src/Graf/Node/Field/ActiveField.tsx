import React, { useState } from 'react';
import { TypeSystemDefinition, ValueDefinition } from 'graphql-js-tree';
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
import { NodeFieldPortPlaceholder } from '@/Graf/Node';
import styled from '@emotion/styled';

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE};
  margin-right: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 30px;
`;

const Type = styled.div`
  font-size: ${FIELD_TYPE_SIZE};
`;

const OptionsMenuContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 5px;
  z-index: 2;
`;

const TypeMenuContainer = styled.div`
  position: absolute;
  top: 32px;
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
  const { tree, setTree, parentTypes, readonly } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;

  return (
    <NodeFieldContainer
      className={`${inputOpen || menuOpen || outputOpen ? 'Active' : ''}`}
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
        <Name>
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
        </Name>
        <Type>
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
        </Type>
      </Title>
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
            message: `Expand ${node.type.name} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && <NodeFieldPortPlaceholder />}
    </NodeFieldContainer>
  );
};
