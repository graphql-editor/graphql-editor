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
import { transition } from '@/vars';
import { ActiveDirectiveName } from '@/Graf/Node/Field/ActiveDirectiveName';
import { changeTypeName } from '@/utils';
import { Lock } from '@/icons/Lock';
import { Menu as MoreIcon } from '@/icons/Menu';
import { ChevronLeft } from '@/icons/ChevronLeft';
import { Arrq } from '@/shared/icons';
import { Plus } from '@/icons/Plus';
import { Minus } from '@/icons/Minus';

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
  const { parentTypes, readonly, updateFieldOnNode, setValue } =
    useTreesState();
  const [menuOpen, setMenuOpen] = useState<'options' | 'details' | 'type'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  const isInputValue =
    node.data.type === ValueDefinition.InputValueDefinition ||
    node.data.type === Instances.Argument;
  const isArgumentNode = node.data.type === Instances.Argument;
  const isDirectiveNode = node.data.type === Instances.Directive;
  const isFromInterface = !!node.fromInterface?.length;
  return (
    <NodeFieldContainer
      fromInterface={!!node.fromInterface?.length}
      active={!!(inputOpen || menuOpen || outputOpen)}
    >
      {isDirectiveNode && <ActiveDirectiveName name={node.name} />}
      {node.data.type !== TypeSystemDefinition.UnionMemberDefinition &&
        !isDirectiveNode && (
          <ActiveGrafFieldName
            afterChange={
              isLocked || isArgumentNode || isFromInterface
                ? undefined
                : (newName) => {
                    updateFieldOnNode(parentNode, indexInParentNode, {
                      ...node,
                      name: newName,
                    });
                  }
            }
            name={node.name}
            args={node.args}
            parentTypes={parentTypes}
          />
        )}
      {isFromInterface && (
        <>
          <ActiveGrafType
            type={node.type}
            parentTypes={parentTypes}
          ></ActiveGrafType>
          <LockContainer
            title={`This node comes from ${node.fromInterface?.join(
              ', ',
            )} and is editable in parent node only`}
          >
            <Lock />
          </LockContainer>
        </>
      )}
      {!isEnumValue &&
        !isArgumentNode &&
        !isDirectiveNode &&
        !isFromInterface && (
          <ContextMenu
            isOpen={menuOpen === 'type'}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => (
              <ActiveGrafType
                {...triggerProps}
                onClick={
                  !readonly && !isLocked
                    ? () =>
                        setMenuOpen(menuOpen === 'type' ? undefined : 'type')
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
                onSelectType={(f) => {
                  updateFieldOnNode(parentNode, indexInParentNode, {
                    ...node,
                    data: {
                      type: f.data.type,
                    },
                    type: {
                      ...node.type,
                      fieldType: changeTypeName(
                        parentNode.args[indexInParentNode].type.fieldType,
                        f.name,
                      ),
                    },
                  });
                }}
                fieldIndex={indexInParentNode}
                hideMenu={() => {
                  setMenuOpen(undefined);
                }}
              />
            )}
          </ContextMenu>
        )}
      {!isLocked &&
        !isEnumValue &&
        !isArgumentNode &&
        !isDirectiveNode &&
        !isFromInterface &&
        node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
          <Actions>
            <ContextMenu
              isOpen={menuOpen === 'options'}
              close={() => setMenuOpen(undefined)}
              Trigger={({ triggerProps }) => {
                return (
                  <FieldPort
                    {...triggerProps}
                    icons={{ closed: <Arrq />, open: <Arrq /> }}
                    onClick={() => setMenuOpen('options')}
                  />
                );
              }}
            >
              {({ layerProps }) => (
                <NodeTypeOptionsMenu
                  {...layerProps}
                  onCheck={(fieldType) => {
                    updateFieldOnNode(parentNode, indexInParentNode, {
                      ...node,
                      type: {
                        ...node.type,
                        fieldType,
                      },
                    });
                  }}
                  hideMenu={() => {
                    setMenuOpen(undefined);
                  }}
                  node={node}
                />
              )}
            </ContextMenu>
          </Actions>
        )}
      {isInputValue && (
        <EditableDefaultValue
          value={node.value?.value || ''}
          onChange={
            isLocked
              ? undefined
              : (v) => {
                  setValue(node, v);
                }
          }
        />
      )}
      <Actions toRight>
        {!inputDisabled &&
          !isArgumentNode &&
          !isFromInterface &&
          node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
            <FieldPort
              onClick={onInputClick}
              open={inputOpen}
              icons={{
                closed: <Plus />,
                open: <Minus />,
              }}
              info={{
                message: 'Field arguments and directives',
                placement: 'left',
              }}
            />
          )}
        {!isLocked && !isFromInterface && (
          <ContextMenu
            isOpen={menuOpen === 'details'}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => {
              return (
                <FieldPort
                  {...triggerProps}
                  icons={{
                    closed: <MoreIcon />,
                    open: <MoreIcon />,
                  }}
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
            <ChevronLeft />
          </OutputArrow>
        )}
      </Actions>
    </NodeFieldContainer>
  );
};

const Actions = styled.div<{ toRight?: boolean }>`
  display: flex;
  margin-left: ${({ toRight }) => (toRight ? 'auto' : 'unset')};
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
    stroke: ${({ theme }) => theme.text};
    rotate: ${({ opened }) => (opened ? '270deg' : '180deg')};
    transition: ${transition};
  }
`;

const LockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.disabled};
`;
