import React, { useState } from "react";
import {
  Instances,
  TypeSystemDefinition,
  ValueDefinition,
} from "graphql-js-tree";
import {
  ContextMenu,
  NodeChangeFieldTypeMenu,
  NodeTypeOptionsMenu,
} from "@/shared/components/ContextMenu";
import { useTreesState } from "@/state/containers/trees";
import {
  DetailMenuItem,
  EditableDefaultValue,
  FieldPort,
  Menu,
  MenuScrollingArea,
} from "@/Graf/Node/components";
import { FieldProps } from "@/Graf/Node/models";
import styled from "@emotion/styled";
import { ActiveGrafFieldName } from "@/Graf/Node/Field/ActiveGrafFieldName";
import { ActiveGrafType } from "@/Graf/Node/Field/ActiveGrafType";
import { transition } from "@/vars";
import { ActiveDirectiveName } from "@/Graf/Node/Field/ActiveDirectiveName";
import { changeTypeName } from "@/utils";
import {
  BracketsSquare,
  ChevronLeft,
  DotsVertical,
  Lock,
  Minus,
  Plus,
  Tooltip,
} from "@aexol-studio/styling-system";
import { NodeFieldContainer } from "@/Graf/Node/Field/NodeFieldContainer";
import { dataIt } from "@/Models";

export const ActiveField: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  isLocked,
  onDelete,
  onUpdate,
  parentNode,
}) => {
  const { parentTypes, readonly, setValue } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<"options" | "details" | "type">();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  const isInputValue =
    node.data.type === ValueDefinition.InputValueDefinition ||
    node.data.type === Instances.Argument;
  const isArgumentNode = node.data.type === Instances.Argument;
  const isDirectiveNode = node.data.type === Instances.Directive;
  const isFromInterface = !!node.fromInterface?.length;
  return (
    <NodeFieldContainer
      {...dataIt("nodeField")}
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
                    onUpdate({
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
          <ActiveGrafType type={node.type} parentTypes={parentTypes} />
          <Tooltip
            title={`This node comes from ${node.fromInterface?.join(
              ", "
            )} and is editable in parent node only`}
            position="top-left"
          >
            <LockContainer>
              <Lock />
            </LockContainer>
          </Tooltip>
        </>
      )}
      {node.fromLibrary && (
        <>
          <Tooltip
            title={`This field comes from library and is a result of merge`}
            position="top-left"
          >
            <LockContainer>
              <Lock />
            </LockContainer>
          </Tooltip>
        </>
      )}
      {!isEnumValue &&
        !isArgumentNode &&
        !isDirectiveNode &&
        !isFromInterface && (
          <ContextMenu
            isOpen={menuOpen === "type"}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => (
              <Tooltip title="Change field type">
                <ActiveGrafType
                  {...triggerProps}
                  onClick={
                    !readonly && !isLocked
                      ? () =>
                          setMenuOpen(menuOpen === "type" ? undefined : "type")
                      : undefined
                  }
                  type={node.type}
                  parentTypes={parentTypes}
                ></ActiveGrafType>
              </Tooltip>
            )}
          >
            {({ layerProps }) => (
              <NodeChangeFieldTypeMenu
                {...layerProps}
                node={parentNode}
                onSelectType={(f) => {
                  onUpdate({
                    ...node,
                    data: {
                      type: f.data.type,
                    },
                    type: {
                      ...node.type,
                      fieldType: changeTypeName(node.type.fieldType, f.name),
                    },
                  });
                }}
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
              isOpen={menuOpen === "options"}
              close={() => setMenuOpen(undefined)}
              Trigger={({ triggerProps }) => {
                return (
                  <Tooltip title="Set List/Required">
                    <FieldPort
                      {...dataIt("fieldList")}
                      {...triggerProps}
                      icons={{
                        closed: <BracketsSquare width={18} height={18} />,
                        open: <BracketsSquare width={18} height={18} />,
                      }}
                      onClick={() => setMenuOpen("options")}
                    />
                  </Tooltip>
                );
              }}
            >
              {({ layerProps }) => (
                <NodeTypeOptionsMenu
                  {...layerProps}
                  onCheck={(fieldType) => {
                    onUpdate({
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
          value={node.value?.value || ""}
          onChange={
            isLocked
              ? undefined
              : (v) => {
                  setValue(node, v);
                }
          }
        />
      )}
      <AbsoluteActions className="field-actions">
        {!inputDisabled &&
          !isArgumentNode &&
          node.data.type !== TypeSystemDefinition.UnionMemberDefinition && (
            <Tooltip title="Field arguments and directives">
              <FieldPort
                {...dataIt("fieldArgs")}
                onClick={onInputClick}
                open={inputOpen}
                icons={{
                  closed: <Plus width={18} height={18} />,
                  open: <Minus width={18} height={18} />,
                }}
              />
            </Tooltip>
          )}
        {!isLocked && !isFromInterface && (
          <ContextMenu
            isOpen={menuOpen === "details"}
            close={() => setMenuOpen(undefined)}
            Trigger={({ triggerProps }) => {
              return (
                <Tooltip title="Field options">
                  <FieldPort
                    {...dataIt("fieldOptions")}
                    {...triggerProps}
                    icons={{
                      closed: <DotsVertical width={18} height={18} />,
                      open: <DotsVertical width={18} height={18} />,
                    }}
                    onClick={() => setMenuOpen("details")}
                  />
                </Tooltip>
              );
            }}
          >
            {({ layerProps }) => (
              <Menu hideMenu={() => setMenuOpen(undefined)} {...layerProps}>
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            )}
          </ContextMenu>
        )}
        {!outputDisabled && (
          <Tooltip title="Expand type">
            <OutputArrow
              {...dataIt("fieldArgs")}
              className="node-field-port"
              onClick={onOutputClick}
              // info={{
              //   message: `Expand ${getTypeName(node.type.fieldType)} details`,
              //   placement: 'right',
              // }}
              opened={outputOpen}
            >
              <ChevronLeft width={18} height={18} />
            </OutputArrow>
          </Tooltip>
        )}
      </AbsoluteActions>
    </NodeFieldContainer>
  );
};

const Actions = styled.div<{ toRight?: boolean }>`
  display: flex;
  margin-left: ${({ toRight }) => (toRight ? "auto" : "unset")};
  z-index: 2;
`;
const AbsoluteActions = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: -0.5rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;
const OutputArrow = styled.div<{ opened?: boolean }>`
  pointer-events: all;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  svg {
    stroke: ${({ theme }) => theme.text.default};
    rotate: ${({ opened }) => (opened ? "270deg" : "180deg")};
    transition: ${transition};
  }
`;

const LockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.disabled};
`;
