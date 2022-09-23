import React, { useState } from 'react';
import { getTypeName } from 'graphql-js-tree';
import { ActiveType } from '@/Graf/Node/Type';
import {
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from '@/shared/components/ContextMenu';
import { ActiveInputValueName } from './ActiveInputValueName';
import {
  DetailMenuItem,
  EditableDefaultValue,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
  Title,
} from '@/Graf/Node/components';
import { ConvertValueNodeToString, placeStringInNode } from '@/GraphQL/Convert';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps } from '@/Graf/Node/models';
import { FIELD_TYPE_SIZE } from '@/Graf/constants';
import { NodeFieldPortPlaceholder } from '@/Graf/Node';
import styled from '@emotion/styled';

const Name = styled.div`
  margin-right: 4px;
  overflow: hidden;
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

export const ActiveInputValue: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  parentNode,
  indexInParentNode,
  parentNodeTypeName,
  isLocked,
  onDelete,
}) => {
  const { parentTypes, updateNode } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  return (
    <NodeFieldContainer
      className={`${inputOpen || outputOpen || menuOpen ? 'Active' : ''}`}
    >
      {!inputDisabled && !isLocked ? (
        <FieldPort
          onClick={onInputClick}
          open={inputOpen}
          info={{
            message: 'Edit input value directives',
            placement: 'left',
          }}
        />
      ) : (
        <NodeFieldPortPlaceholder />
      )}
      <Title>
        <Name>
          {isLocked && <span>{node.name}</span>}
          {!isLocked && (
            <ActiveInputValueName
              afterChange={(newName) => {
                node.name = newName;
                updateNode(node);
              }}
              node={node}
            />
          )}
        </Name>
        <Type>
          <ActiveType
            onClick={() =>
              setMenuOpen(menuOpen === 'type' ? undefined : 'type')
            }
            type={node.type}
            parentTypes={parentTypes}
          />
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
        <EditableDefaultValue
          value={ConvertValueNodeToString(node)}
          style={{ fontSize: 10, marginLeft: 5 }}
          onChange={
            isLocked
              ? undefined
              : (v) => {
                  node.args = [...(placeStringInNode({ v, node }) || [])];
                  updateNode(node);
                }
          }
        />
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
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'Arrq', open: 'Arrq' }}
          onClick={() => {
            setMenuOpen(menuOpen === 'options' ? undefined : 'options');
          }}
        >
          {menuOpen === 'options' && (
            <OptionsMenuContainer>
              <NodeTypeOptionsMenu
                hideMenu={() => setMenuOpen(undefined)}
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
      {outputDisabled && isLocked && <NodeFieldPortPlaceholder />}
    </NodeFieldContainer>
  );
};
