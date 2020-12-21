import React, { useLayoutEffect, useState } from 'react';
import { ParserField, TypeSystemDefinition, Instances, TypeDefinition, TypeExtension } from 'graphql-zeus';
import { ActiveField } from '@/Graf/Node/Field';
import { ActiveDirective } from '@/Graf/Node/Directive';
import { ActiveInputValue } from '@/Graf/Node/InputValue';
import { style, keyframes } from 'typestyle';
import { Colors, mix } from '@/Colors';
import { GraphQLBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@/Graf/DOM';
import { ActiveType } from '@/Graf/Node/Type';
import { NodeFields, NodeTitle } from '@/Graf/Node/SharedNode';
import { ActiveDescription, NodeInterface, EditableText } from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers/trees';
import { TopNodeMenu } from '@/Graf/Node/ActiveNode/TopNodeMenu';
import { ChangeAllRelatedNodes, isExtensionNode } from '@/GraphQL/Resolve';
import { ActiveArgument } from '@/Graf/Node/Argument';

interface NodeProps {
  node: ParserField;
  onDelete: () => void;
  onDuplicate?: () => void;
  readonly?: boolean;
}

const fadeIn = keyframes({
  ['0%']: {
    opacity: 0.0,
  },
  ['100%']: {
    opacity: 1.0,
  },
});
const LeftNodeArea: NestedCSSProperties = {
  width: 300,
  zIndex: 4,
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
};
const LeftNodeAreaNode: NestedCSSProperties = { position: 'relative' };
const RightNodeArea: NestedCSSProperties = {
  position: 'absolute',
  zIndex: 4,
  left: 0,
  top: 0,
  bottom: 0,
  height: '100%',
  width: `100%`,
  display: 'flex',
};

const LibraryNodeArea: NestedCSSProperties = {
  borderStyle: 'dashed',
};
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  transition: `border-color .25s ease-in-out`,
  borderColor: Colors.green[0],
  flex: 1,
  $nest: {
    '.NodeTitle': NodeTitle,
    '.NodeFields': NodeFields,
    '&.LibraryNodeArea': LibraryNodeArea,
  },
};
const DescriptionPosition: NestedCSSProperties = {
  outline: 'none',
  border: `1px solid ${Colors.grey[3]}00`,
  $nest: {
    '&:focus': {
      border: `1px solid ${Colors.grey[3]}`,
    },
  },
};
const NodeContainer = style({
  position: 'relative',
  breakInside: 'avoid',
  height: '100%',
  $nest: {
    '.DescriptionPosition': DescriptionPosition,
    '.LeftNodeArea': LeftNodeArea,
    '.RightNodeArea': RightNodeArea,
    '.MainNodeArea': {
      ...MainNodeArea,
      animationName: fadeIn,
      animationDuration: '0.25s',
    },
    '.LeftNodeAreaNode': LeftNodeAreaNode,
    '&:hover': {
      $nest: {
        '> .ActionsMenu': {
          opacity: 1.0,
          pointerEvents: 'auto',
        },
      },
    },
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeBackground-${b}`] = {
        background: GraphQLBackgrounds[b],
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        background: GraphQLBackgrounds[b],
        $nest: {
          '&:hover, &.Active': {
            background: mix(GraphQLBackgrounds[b], Colors.grey[0], 80),
          },
        },
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});

const NodeInterfaces = style({
  maxWidth: 600,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'flex-start',
  marginBottom: 5,
});

const GapBar = style({
  width: 40,
  height: '100%',
  background: `${Colors.grey[10]}99`,
});

const NodeArea = style({
  flex: 1,
  background: Colors.grey[9],
});

export const ActiveNode: React.FC<NodeProps> = ({ node, ...sharedProps }) => {
  const [openedInput, setOpenedInput] = useState<number>();
  const [openedOutput, setOpenedOutput] = useState<number>();

  const [openedDirectiveInput, setOpenedDirectiveInput] = useState<number>();
  const [openedDirectiveOutput, setOpenedDirectiveOutput] = useState<number>();

  const { libraryTree, tree, setTree, setSelectedNode, selectedNode, selectedNodeRef } = useTreesState();

  const isLibrary = !!libraryTree.nodes.find((lN) => lN.name === node.name && lN.data.type === node.data.type);
  const isInputNode = [
    TypeSystemDefinition.FieldDefinition,
    TypeSystemDefinition.DirectiveDefinition,
    TypeDefinition.InputObjectTypeDefinition,
    TypeExtension.InputObjectTypeExtension,
    Instances.Directive,
  ].includes(node.data.type as any);

  const isArgumentNode = [Instances.Directive].includes(node.data.type as any);
  const parentNode = tree.nodes.find((n) => n.name === node.type.name);
  const isLocked = !!sharedProps.readonly || isLibrary;

  const findNodeByField = (field: ParserField) => {
    return (tree.nodes.find((n) => n.name === field.type.name && !isExtensionNode(n.data.type!)) ||
      libraryTree.nodes.find((n) => n.name === field.type.name && !isExtensionNode(n.data.type!)))!;
  };

  const inactiveClick = () => {
    if (openedOutput) {
      setOpenedOutput(undefined);
    }
  };
  useLayoutEffect(() => {
    console.log('NODECHANGED');
    setOpenedInput(undefined);
    setOpenedOutput(undefined);
  }, [node]);

  return (
    <div className={`${NodeContainer} ${DOM.classes.node} ${DOM.classes.nodeSelected}`} ref={selectedNodeRef}>
      <ActiveDescription
        onChange={(d) => {
          node.description = d;
          setTree({ ...tree });
        }}
        isLocked={isLocked}
        value={node.description || ''}
      />
      {!!node.interfaces?.length && (
        <div className={NodeInterfaces}>
          {node.interfaces.map((i) => (
            <NodeInterface
              key={i}
              isLocked={isLocked}
              onDelete={() => {
                node.interfaces = node.interfaces?.filter((oldInterface) => oldInterface !== i);
                setTree({ ...tree });
              }}
            >
              {i}
            </NodeInterface>
          ))}
        </div>
      )}
      <div className={`LeftNodeArea`}>
        {openedDirectiveInput && (
          <div className={`LeftNodeAreaNode`}>
            <ActiveNode
              {...sharedProps}
              readonly={isLocked}
              node={node.directives![openedDirectiveInput]}
              onDelete={() => {
                setOpenedDirectiveInput(undefined);
                setOpenedDirectiveOutput(undefined);
                node.directives!.splice(openedDirectiveInput, 1);
                DOM.panLock = false;
                setTree({ ...tree });
              }}
            />
          </div>
        )}
        {openedInput && (
          <div className={`LeftNodeAreaNode`}>
            <ActiveNode
              {...sharedProps}
              readonly={isLocked}
              node={node.args![openedInput]}
              onDelete={() => {
                setOpenedInput(undefined);
                setOpenedOutput(undefined);
                node.args!.splice(openedInput, 1);
                DOM.panLock = false;
                setTree({ ...tree });
              }}
            />
          </div>
        )}
      </div>
      {openedDirectiveOutput && (
        <div className={`RightNodeArea`}>
          <div className={GapBar} onClick={inactiveClick} />
          <div className={NodeArea}>
            <ActiveNode
              {...sharedProps}
              readonly={isLocked}
              node={findNodeByField(node.directives![openedDirectiveOutput])}
            />
          </div>
        </div>
      )}
      {openedOutput && (
        <div className={`RightNodeArea`}>
          <div className={GapBar} onClick={inactiveClick} />
          <div className={NodeArea}>
            <ActiveNode {...sharedProps} readonly={isLocked} node={findNodeByField(node.args![openedOutput])} />
          </div>
        </div>
      )}
      <div
        className={`MainNodeArea${isLibrary ? ' LibraryNodeArea' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`NodeTitle`}>
          <div className={`NodeName`}>
            {isLocked && <EditableText value={node.name} />}
            {!isLocked && (
              <EditableText
                fontSize={12}
                value={node.name}
                onChange={(v) => {
                  //TODO: Change the node name
                  ChangeAllRelatedNodes({
                    newName: v,
                    nodes: tree.nodes,
                    oldName: node.name,
                  });
                  const reselect = node.name === selectedNode?.name;
                  node.name = v;
                  setTree({ ...tree });
                  if (reselect && selectedNode) {
                    setSelectedNode({
                      ...node,
                      name: v,
                    });
                  }
                }}
              />
            )}
          </div>
          <div className={`NodeType`}>
            <ActiveType type={node.type} />
          </div>
          {!isLocked && <TopNodeMenu {...sharedProps} node={node} />}
        </div>
        <div className={`NodeFields NodeBackground-${parentNode ? parentNode.type.name : node.type.name}`}>
          {node.directives?.map((d, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === d.type.name) || libraryTree.nodes.find((n) => n.name === d.type.name)
            );
            return (
              <ActiveDirective
                isLocked={isLocked}
                parentNode={node}
                parentNodeTypeName={node.type.name}
                key={d.name}
                onInputClick={() => {
                  setOpenedDirectiveInput((oI) => (oI === i ? undefined : i));
                }}
                onOutputClick={() => {
                  setOpenedDirectiveOutput((oO) => (oO === i ? undefined : i));
                }}
                node={d}
                inputOpen={openedDirectiveInput === i}
                outputDisabled={outputDisabled}
                outputOpen={openedDirectiveOutput === i}
                onDelete={() => {
                  setOpenedDirectiveInput(undefined);
                  setOpenedDirectiveOutput(undefined);
                  node.directives!.splice(i, 1);
                  DOM.panLock = false;
                  setTree({ ...tree });
                }}
              />
            );
          })}
          {node.args?.map((a, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === a.type.name) || libraryTree.nodes.find((n) => n.name === a.type.name)
            );
            const Component = isArgumentNode ? ActiveArgument : isInputNode ? ActiveInputValue : ActiveField;
            return (
              <>
                <Component
                  parentNode={node}
                  isLocked={isLocked}
                  parentNodeTypeName={node.type.name}
                  key={a.name}
                  onInputClick={() => {
                    setOpenedInput((oI) => (oI === i ? undefined : i));
                  }}
                  onOutputClick={() => {
                    setOpenedOutput((oO) => (oO === i ? undefined : i));
                  }}
                  node={a}
                  inputOpen={openedInput === i}
                  outputDisabled={outputDisabled}
                  outputOpen={openedOutput === i}
                  onDelete={() => {
                    node.args!.splice(i, 1);
                    DOM.panLock = false;
                    setTree({ ...tree });
                  }}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
