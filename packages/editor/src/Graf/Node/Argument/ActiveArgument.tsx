import React, { useState } from 'react';
import {
  ParserField,
  Value,
  TypeDefinition,
  getTypeName,
} from 'graphql-js-tree';
import { NodeTypeOptionsMenu } from '@/Graf/Node/ContextMenu';
import { ActiveArgumentName } from './ActiveArgumentName';
import {
  DetailMenuItem,
  EditableDefaultValue,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
  Title,
} from '@/Graf/Node/components';
import {
  ConvertValueToEditableString,
  placeStringInNode,
} from '@/GraphQL/Convert';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { NodeFieldPortPlaceholder } from '@/Graf/Node';

const Name = styled.div`
  font-size: 10px;
  margin-right: 4px;
  overflow: hidden;
`;

const OptionsMenuContainer = styled.div`
  position: absolute;
  top: 20px;
  z-index: 2;
  right: 5px;
`;

//TODO Wogle to naprawic bo przypal od dawna
const resolveValueFromNode = (node: ParserField, parentNode: ParserField) => {
  const inside =
    node.args
      ?.map((a) => {
        if (a.data.type === Value.NullValue) {
          return 'null';
        }
        return ConvertValueToEditableString(a);
      })
      .join(',') || '';
  if (node.args && node.args.length > 0) {
    return `[ ${inside} ]`;
  }
  return inside;
};

export const ActiveArgument: React.FC<FieldProps> = ({
  node,
  parentNode,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  parentNodeTypeName,
  isLocked,
  onDelete,
}) => {
  const { updateNode } = useTreesState();
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [detailsMenuOpen, setDetailsMenuOpen] = useState(false);

  return (
    <NodeFieldContainer
      className={`${
        inputOpen || outputOpen || optionsMenuOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && !isLocked ? (
        <FieldPort
          onClick={onInputClick}
          open={inputOpen}
          info={{
            message: 'Edit field arguments',
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
            <ActiveArgumentName
              afterChange={(newName) => {
                node.name = newName;
                updateNode(node);
              }}
              node={node}
            />
          )}
        </Name>
        <EditableDefaultValue
          value={resolveValueFromNode(node, parentNode)}
          style={{ marginLeft: 5 }}
          onChange={(v) => {
            node.args =
              placeStringInNode({
                v,
                node,
              }) || [];
            updateNode(node);
          }}
        />
      </Title>
      {!isLocked && node.data.type === TypeDefinition.InterfaceTypeDefinition && (
        <FieldPort
          icons={{ closed: 'More', open: 'More' }}
          onClick={() => {
            setDetailsMenuOpen(!detailsMenuOpen);
          }}
        >
          {detailsMenuOpen && (
            <OptionsMenuContainer>
              <Menu
                menuName={'Node options'}
                hideMenu={() => setDetailsMenuOpen(false)}
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
            setOptionsMenuOpen(!optionsMenuOpen);
          }}
        >
          {optionsMenuOpen && (
            <OptionsMenuContainer>
              <NodeTypeOptionsMenu
                hideMenu={() => setOptionsMenuOpen(false)}
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
