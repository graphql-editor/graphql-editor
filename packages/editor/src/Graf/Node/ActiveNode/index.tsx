import React, { useEffect, useState, DragEvent } from "react";
import {
  ParserField,
  TypeSystemDefinition,
  TypeDefinition,
  getTypeName,
  TypeExtension,
} from "graphql-js-tree";
import { ActiveField } from "@/Graf/Node/Field";
import {
  ActiveDescription,
  CreateNodeInterface,
  NodeInterface,
} from "@/Graf/Node/components";
import { useTreesState } from "@/state/containers/trees";
import { TopNodeMenu } from "@/Graf/Node/ActiveNode/TopNodeMenu";
import { isExtensionNode } from "@/GraphQL/Resolve";

import {
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
} from "@/shared/dnd";
import styled from "@emotion/styled";
import { EditableText } from "@/Graf/Node/Field/EditableText";
import { ActiveGrafType } from "@/Graf/Node/Field/ActiveGrafType";
import {
  CreateNodeDirective,
  DirectivePlacement,
} from "@/Graf/Node/components/DirectivePlacement";
import { DraggableProvider, useDraggable } from "@/Graf/state/draggable";
import { useRelationsState } from "@/state/containers";
import { Tooltip } from "@aexol-studio/styling-system";
import { dataIt } from "@/Models";

interface NodeProps {
  node: ParserField;
  onDuplicate?: (node: ParserField) => void;
  onInputCreate?: (node: ParserField) => void;
  readonly?: boolean;
  parentNode?: {
    node: ParserField;
    indexInParent: number;
  };
}

const OpenedNode = styled.div`
  position: absolute;
  z-index: 4;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  pointer-events: none;
`;

const MainNodeArea = styled.div`
  position: relative;
  transition: border-color 0.25s ease-in-out;
  border-color: ${({ theme }) => `${theme.divider.main}`};
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  animation-name: fadeIn;
  animation-duration: 0.25s;
  overflow-y: hidden;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const NodeContainer = styled.div`
  /* position: relative; */
  break-inside: avoid;
  min-width: 24rem;
  max-height: 100%;
  background-color: ${({ theme }) => theme.neutrals.L5};
  display: flex;
  flex-flow: column nowrap;
  border-radius: ${(p) => p.theme.border.primary.radius};
  pointer-events: all;
  border: 1px solid ${({ theme }) => `${theme.divider.main}`};
`;

const NodeFieldsContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const NodeFields = styled.div``;

const DirectivePlacements = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-x: scroll;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider.main};
`;
const NodeInterfaces = styled.div<{ isHidden?: boolean }>`
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
  max-width: 100%;
  flex-flow: row wrap;
  overflow-x: auto;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider.main};
`;

const DndContainer = styled.div`
  &.drag-over {
    padding-top: 30px;
  }
`;

const GapBar = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: all;
  background-color: ${({ theme }) => theme.neutrals.L6}99;
  transition: 0.25s background-color ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.neutrals.L6}11;
  }
`;

const NodeArea = styled.div`
  min-width: 80%;
  left: 30%;
  position: absolute;
  padding: 3.5rem 2rem;
  height: 100%;
`;
export const NodeName = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.text.active};
  user-select: none;
`;

export const NodeType = styled.div`
  margin-right: auto;
`;

const EditableTitle: React.CSSProperties = {
  fontWeight: 500,
};

export const ActiveNode: React.FC<NodeProps> = ({
  node,
  parentNode,
  ...sharedProps
}) => {
  const { setEditMode, editMode } = useRelationsState();
  const { setSelectedNodeId } = useTreesState();
  const [openedNode, setOpenedNode] = useState<{
    type:
      | keyof Pick<ParserField, "args" | "directives">
      | "output"
      | "directiveOutput";
    index: number;
  }>();
  const [dragOverName, setDragOverName] = useState("");
  const { draggable } = useDraggable();
  const {
    allNodes,
    selectedNodeId,
    parentTypes,
    readonly,
    updateNode,
    renameNode,
    deImplementInterface,
    isLibrary,
    updateFieldOnNode,
    removeNode,
    removeFieldFromNode,
    idempotentOperationAssign,
  } = useTreesState();

  const libraryNode = isLibrary(node);
  const isLocked = !!sharedProps.readonly || libraryNode || readonly;
  const findNodeByField = (field?: ParserField) => {
    return field
      ? allNodes.nodes.find(
          (n) =>
            n.name === getTypeName(field.type.fieldType) &&
            !isExtensionNode(n.data.type)
        )
      : undefined;
  };

  const dropHandler = (e: DragEvent, endNodeName: string) => {
    e.stopPropagation();
    const startNodeName = e.dataTransfer.getData("startName");
    if (endNodeName === startNodeName) return;
    if (node.args) {
      const startIdx = node.args.findIndex((a) => a.name === startNodeName);
      const endIdx = node.args.findIndex((a) => a.name === endNodeName);
      node.args.splice(endIdx, 0, node.args.splice(startIdx, 1)[0]);
    }
    //TODO: Add replace field order in js-tree
    updateNode(node);
  };

  useEffect(() => {
    setOpenedNode(undefined);
    if (
      selectedNodeId?.value?.id &&
      editMode &&
      selectedNodeId?.value?.id !== editMode
    ) {
      setEditMode(selectedNodeId?.value?.id);
    }
  }, [selectedNodeId?.value?.id]);

  const openedNodeNode = openedNode
    ? openedNode.type === "directives"
      ? node.directives[openedNode.index]
      : openedNode.type === "args"
      ? node.args[openedNode.index]
      : openedNode.type === "directiveOutput"
      ? findNodeByField(node.directives[openedNode.index])
      : findNodeByField(node.args[openedNode.index])
    : undefined;
  return (
    <NodeContainer
      {...dataIt("activeNode")}
      className={`NodeBackground-${getTypeName(node.type.fieldType)}`}
      onWheel={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Extension nodes should not have description following the GraphQL Spec */}
      {!isExtensionNode(node.data.type) && (
        <ActiveDescription
          onChange={(d) => {
            if (d === node.description) return;
            //TODO: Add change description in js-tree
            updateNode(node, () => {
              node.description = d;
            });
          }}
          isLocked={isLocked}
          value={node.description || ""}
        />
      )}
      {node.data.type === TypeSystemDefinition.DirectiveDefinition && (
        <DirectivePlacements>
          {!isLocked && <CreateNodeDirective node={node} isLocked={isLocked} />}
          {node.type.directiveOptions?.map((d) => (
            <Tooltip key={d} title="Detach directive">
              <DirectivePlacement
                isLocked={isLocked}
                onDelete={() => {
                  updateNode(node, () => {
                    node.type.directiveOptions =
                      node.type.directiveOptions?.filter(
                        (oldDirective) => oldDirective !== d
                      );
                  });
                }}
              >
                {d}
              </DirectivePlacement>
            </Tooltip>
          ))}
        </DirectivePlacements>
      )}
      {(node.data.type === TypeDefinition.ObjectTypeDefinition ||
        node.data.type === TypeExtension.ObjectTypeExtension ||
        node.data.type === TypeExtension.InterfaceTypeExtension ||
        node.data.type === TypeDefinition.InterfaceTypeDefinition) && (
        <NodeInterfaces isHidden={libraryNode && !node.interfaces.length}>
          {!isLocked && <CreateNodeInterface node={node} isLocked={isLocked} />}
          {node.interfaces.map((i) => (
            <Tooltip key={i} title="Interface options">
              <NodeInterface
                isLocked={isLocked}
                onDelete={() => deImplementInterface(node, i)}
                onDetach={() => {
                  node.interfaces = node.interfaces?.filter(
                    (oldInterface) => oldInterface !== i
                  );
                  node.args = node.args.map((a) => ({
                    ...a,
                    fromInterface: a.fromInterface?.filter((fi) => fi !== i),
                  }));
                  updateNode(node);
                }}
              >
                {i}
              </NodeInterface>
            </Tooltip>
          ))}
        </NodeInterfaces>
      )}
      {openedNodeNode && openedNode && (
        <OpenedNode>
          <GapBar
            onClick={(e) => {
              e.stopPropagation();
              if (openedNode) {
                setOpenedNode(undefined);
              }
            }}
          />
          <NodeArea>
            <DraggableProvider>
              <ActiveNode
                {...sharedProps}
                readonly={isLocked}
                parentNode={
                  openedNode.type === "args" || openedNode.type === "directives"
                    ? {
                        indexInParent: openedNode.index,
                        node: node,
                      }
                    : undefined
                }
                node={openedNodeNode}
              />
            </DraggableProvider>
          </NodeArea>
        </OpenedNode>
      )}
      <MainNodeArea
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {libraryNode && <FromLibrary>External library</FromLibrary>}
        <NodeTitle>
          <NodeName>
            {parentNode && (
              <EditableText
                style={EditableTitle}
                value={`${parentNode.node.name}.`}
              />
            )}
            {isLocked && (
              <EditableText style={EditableTitle} value={node.name} />
            )}
            {!isLocked && (
              <EditableText
                style={EditableTitle}
                value={node.name}
                exclude={Object.keys(parentTypes).filter(
                  (pt) => pt !== node.name
                )}
                onChange={(newName) => {
                  if (parentNode) {
                    updateFieldOnNode(
                      parentNode.node,
                      parentNode.indexInParent,
                      {
                        ...node,
                        name: newName,
                      },
                      editMode
                    );
                    return;
                  }
                  idempotentOperationAssign({
                    ...node,
                    name: newName,
                  });
                  renameNode(node, newName);
                }}
              />
            )}
          </NodeName>
          <NodeType>
            <ActiveGrafType type={node.type} />
          </NodeType>
          {!(!!sharedProps.readonly || readonly) && (
            <TopNodeMenu
              {...sharedProps}
              parentNode={parentNode?.node}
              isLibrary={libraryNode}
              onDelete={() => {
                removeNode(node);
                if (!parentNode?.node) {
                  setEditMode("");
                  setSelectedNodeId({
                    value: undefined,
                    source: "relation",
                  });
                }
              }}
              onDuplicate={() => sharedProps.onDuplicate?.(node)}
              onInputCreate={() => sharedProps.onInputCreate?.(node)}
              node={node}
            />
          )}
        </NodeTitle>
        <NodeFieldsContainer>
          <NodeFields>
            {node.directives?.map((d, i) => {
              const outputDisabled = !allNodes.nodes.find(
                (n) => n.name === getTypeName(d.type.fieldType)
              );
              return (
                <ActiveField
                  isLocked={isLocked}
                  parentNode={node}
                  key={d.name + i}
                  onInputClick={() => {
                    setOpenedNode((oN) =>
                      oN?.index === i && oN.type === "directives"
                        ? undefined
                        : { type: "directives", index: i }
                    );
                  }}
                  onOutputClick={() => {
                    setOpenedNode((oN) =>
                      oN?.index === i && oN.type === "directiveOutput"
                        ? undefined
                        : { type: "directiveOutput", index: i }
                    );
                  }}
                  node={d}
                  inputOpen={
                    openedNode?.type === "directives" && openedNode?.index === i
                  }
                  outputDisabled={outputDisabled}
                  outputOpen={
                    openedNode?.type === "directiveOutput" &&
                    openedNode?.index === i
                  }
                  onUpdate={(updatedNode) => {
                    updateNode(node, () => {
                      node.directives[i] = updatedNode;
                    });
                  }}
                  onDelete={() => {
                    setOpenedNode(undefined);
                    //TODO: Add remove directives and add directives to js-tree
                    updateNode(node, () => node.directives.splice(i, 1));
                  }}
                />
              );
            })}
            {node.args?.map((a, i) => {
              const outputDisabled = !allNodes.nodes.find(
                (n) => n.name === getTypeName(a.type.fieldType)
              );
              return (
                <DndContainer
                  key={a.name}
                  id={a.name}
                  onDrop={(e) => {
                    setDragOverName("");
                    dropHandler(e, a.name);
                  }}
                  onDragEnd={() => setDragOverName("")}
                  onDragLeave={(e) => {
                    dragLeaveHandler(e);
                  }}
                  onDragOver={(e) => {
                    setDragOverName(a.name);
                    dragOverHandler(e);
                  }}
                  className={a.name === dragOverName ? `drag-over` : ""}
                >
                  <div
                    draggable={!isLocked && draggable}
                    onDragStart={(e) => {
                      dragStartHandler(e, a.name);
                    }}
                  >
                    <ActiveField
                      parentNode={node}
                      isLocked={isLocked || a.fromLibrary}
                      key={a.name}
                      onInputClick={() => {
                        setOpenedNode((oN) =>
                          oN?.index === i && oN.type === "args"
                            ? undefined
                            : { type: "args", index: i }
                        );
                      }}
                      onOutputClick={() => {
                        setOpenedNode((oN) =>
                          oN?.index === i && oN.type === "output"
                            ? undefined
                            : { type: "output", index: i }
                        );
                      }}
                      node={a}
                      inputOpen={
                        openedNode?.type === "args" && openedNode?.index === i
                      }
                      outputDisabled={outputDisabled}
                      outputOpen={
                        openedNode?.type === "output" && openedNode?.index === i
                      }
                      onDelete={() => removeFieldFromNode(node, a, editMode)}
                      onUpdate={(updatedNode) => {
                        updateFieldOnNode(node, i, updatedNode, editMode);
                      }}
                    />
                  </div>
                </DndContainer>
              );
            })}
          </NodeFields>
        </NodeFieldsContainer>
      </MainNodeArea>
      <div style={{ marginBottom: "1rem" }} />
    </NodeContainer>
  );
};

const NodeTitle = styled.div`
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text.default};
  padding: 1rem;
  user-select: none;
`;

const FromLibrary = styled(NodeTitle)`
  padding: 1rem 1rem 0;
`;
