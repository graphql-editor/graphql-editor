import React, { useState } from 'react';
import {
  Instances,
  TypeSystemDefinition,
  ValueDefinition,
} from 'graphql-js-tree';
import {
  ContextMenu,
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from '@/shared/components/ContextMenu';
import { useTreesState } from '@/state/containers/trees';
import {
  DetailMenuItem,
  EditableDefaultValue,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
} from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { ActiveGrafFieldName } from '@/Graf/Node/Field/ActiveGrafFieldName';
import { ActiveGrafType } from '@/Graf/Node/Field/ActiveGrafType';
import { ArrowLeft } from '@/editor/icons';
import { transition } from '@/vars';
import {
  ConvertArgumentNodeToString,
  ConvertValueNodeToString,
  ConvertValueToEditableString,
  placeStringInNode,
} from '@/GraphQL/Convert';
import { ActiveDirectiveName } from '@/Graf/Node/Field/ActiveDirectiveName';
import { InterfaceBall } from '@/shared/components';

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
  isLocked: _isLocked,
  onDelete,
}) => {
  const { parentTypes, readonly, updateNode, allNodes, setSelectedNode } =
    useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  const isInputValue =
    node.data.type === ValueDefinition.InputValueDefinition ||
    node.data.type === Instances.Argument;
  const isArgumentNode = node.data.type === Instances.Argument;
  const isDirectiveNode = node.data.type === Instances.Directive;
  const isFromInterface = !!node.fromInterface;
  const isLocked = _isLocked || isFromInterface;

  return (
    <NodeFieldContainer active={!!(inputOpen || menuOpen || outputOpen)}>
      {isDirectiveNode && (
        <ActiveDirectiveName name={ConvertValueToEditableString(node)} />
      )}
      {node.data.type !== TypeSystemDefinition.UnionMemberDefinition &&
        !isDirectiveNode && (
          <ActiveGrafFieldName
            afterChange={
              isLocked || isArgumentNode
                ? undefined
                : (newName) => {
                    node.name = newName;
                    updateNode(node, parentNode);
                  }
            }
            name={node.name}
            args={isArgumentNode ? [] : node.args}
            parentTypes={parentTypes}
          />
        )}
      {!isEnumValue && !isArgumentNode && !isDirectiveNode && (
        <ContextMenu
          isOpen={menuOpen === 'type'}
          close={() => setMenuOpen(undefined)}
          Trigger={({ triggerProps }) => (
            <ActiveGrafType
              {...triggerProps}
              onClick={
                !readonly && !isLocked
                  ? () => setMenuOpen(menuOpen === 'type' ? undefined : 'type')
                  : undefined
              }
              type={node.type}
              parentTypes={parentTypes}
            ></ActiveGrafType>
          )}
        >
          {({ layerProps }) => (
            <NodeChangeFieldTypeMenu
              {...layerProps}
              node={parentNode}
              fieldIndex={indexInParentNode}
              hideMenu={() => {
                setMenuOpen(undefined);
              }}
            />
          )}
        </ContextMenu>
      )}
      {node.fromInterface && (
        <InterfaceBall
          name={`Field from interface: ${node.fromInterface}`}
          onClick={() => {
            const foundInterface = allNodes.nodes.find((el) =>
              node.fromInterface?.includes(el.name),
            );
            if (!foundInterface) return;
            setSelectedNode({
              source: 'diagram',
              field: { ...foundInterface },
            });
          }}
        >
          .
        </InterfaceBall>
      )}
      {!isLocked &&
        !isEnumValue &&
        !isArgumentNode &&
        !isDirectiveNode &&
        node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
          <Actions>
            <ContextMenu
              isOpen={menuOpen === 'options'}
              close={() => setMenuOpen(undefined)}
              Trigger={({ triggerProps }) => {
                return (
                  <FieldPort
                    {...triggerProps}
                    icons={{ closed: 'Arrq', open: 'Arrq' }}
                    onClick={() => setMenuOpen('options')}
                  />
                );
              }}
            >
              {({ layerProps }) => (
                <NodeTypeOptionsMenu
                  {...layerProps}
                  hideMenu={() => {
                    setMenuOpen(undefined);
                  }}
                  node={node}
                  parentNode={parentNode}
                />
              )}
            </ContextMenu>
          </Actions>
        )}
      {isInputValue && (
        <EditableDefaultValue
          value={
            isArgumentNode
              ? ConvertArgumentNodeToString(node)
              : ConvertValueNodeToString(node)
          }
          style={{ fontSize: 10, marginLeft: 5 }}
          onChange={
            isLocked
              ? undefined
              : (v) => {
                  if (isArgumentNode) {
                    node.args =
                      placeStringInNode({
                        v,
                        node,
                      }) || [];
                    updateNode(node, parentNode);
                  }
                  node.args = [...(placeStringInNode({ v, node }) || [])];
                  updateNode(node, parentNode);
                }
          }
        />
      )}
      <Actions toRight>
        {!inputDisabled &&
          !isArgumentNode &&
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
          <ContextMenu
            isOpen={menuOpen === 'details'}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => {
              return (
                <FieldPort
                  {...triggerProps}
                  icons={{ closed: 'More', open: 'More' }}
                  onClick={() => setMenuOpen('details')}
                />
              );
            }}
          >
            {({ layerProps }) => (
              <Menu
                menuName={'Node options'}
                hideMenu={() => setMenuOpen(undefined)}
                {...layerProps}
              >
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            )}
          </ContextMenu>
        )}
        {!outputDisabled && (
          <OutputArrow
            className="node-field-port"
            onClick={onOutputClick}
            // info={{
            //   message: `Expand ${getTypeName(node.type.fieldType)} details`,
            //   placement: 'right',
            // }}
            opened={outputOpen}
          >
            <ArrowLeft size={12} />
          </OutputArrow>
        )}
      </Actions>
    </NodeFieldContainer>
  );
};

const Actions = styled.div<{ toRight?: boolean }>`
  display: flex;
  margin-left: ${({ toRight }) => (toRight ? 'auto' : 'unset')};
  padding-left: 0.5rem;
  z-index: 2;
`;
const OutputArrow = styled.div<{ opened?: boolean }>`
  pointer-events: all;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin: -0.5rem 0;
  svg {
    fill: ${({ theme }) => theme.text};
    rotate: ${({ opened }) => (opened ? '270deg' : '180deg')};
    transition: ${transition};
  }
`;

// //TODO Wogle to naprawic bo przypal od dawna
// const resolveValueFromNode = (node: ParserField, parentNode: ParserField) => {
//   const inside =
//     node.args
//       ?.map((a) => {
//         if (a.data.type === Value.NullValue) {
//           return 'null';
//         }
//         return ConvertValueToEditableString(a);
//       })
//       .join(',') || '';
//   if (node.args && node.args.length > 0) {
//     return `[ ${inside} ]`;
//   }
//   return inside;
// };
