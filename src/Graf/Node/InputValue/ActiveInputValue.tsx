import React, { useState } from 'react';
import { ParserField, Options, ValueDefinition, Value } from 'graphql-js-tree';
import { ActiveType } from '@/Graf/Node/Type';
import {
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from '@/Graf/Node/ContextMenu';
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
import { isScalarArgument } from '@/GraphQL/Resolve';
import {
  ConvertStringToObject,
  ConvertValueNodeToString,
} from '@/GraphQL/Convert';
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

interface PlaceFunctionArgs {
  v: string;
  node: ParserField;
}

const placeStringInNode = ({ node, v }: PlaceFunctionArgs) => {
  if (!v) {
    return;
  }
  if (v.length === 2 && v[0] === '[' && v[1] === ']') {
    return [];
  }
  const valueType = isScalarArgument(node);
  const isObjectArg =
    (node.data.type === ValueDefinition.InputValueDefinition && !valueType) ||
    node.data.type === Value.ObjectValue;
  if (node.type.options?.includes(Options.array)) {
    return ConvertStringToObject(v);
  }
  if (isObjectArg) {
    return ConvertStringToObject(v);
  }
  if (valueType) {
    let value = v;
    if (valueType === Value.StringValue) {
      if (!(v.startsWith(`\"`) && v.endsWith(`\"`))) {
        value = `"${value}"`;
      }
      value = value.slice(1, -1);
    }
    const n: ParserField = {
      data: {
        type: valueType,
      },
      type: {
        name: valueType,
      },
      name: value,
    };
    return [n];
  }
};

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
  const { tree, setTree, parentTypes } = useTreesState();
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
                setTree({ ...tree });
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
                  node.args = placeStringInNode({ v, node });
                  setTree({ ...tree });
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
            message: `Expand ${node.type.name} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && <NodeFieldPortPlaceholder />}
    </NodeFieldContainer>
  );
};
