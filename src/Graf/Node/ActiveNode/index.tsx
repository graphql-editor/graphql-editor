import React, { useState } from 'react';
import { ParserField, TypeSystemDefinition, Instances, TypeDefinition, TypeExtension } from 'graphql-zeus';
import { ActiveField } from '@/Graf/Node/Field';
import { ActiveDirective } from '@/Graf/Node/Directive';
import { ActiveInputValue } from '@/Graf/Node/InputValue';
import { style, keyframes } from 'typestyle';
import { Colors, mix } from '@/Colors';
import { FIELD_HEIGHT } from '@/Graf/constants';
import { GraphQLBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@/Graf/DOM';
import { ActiveType } from '@/Graf/Node/Type';
import { NodeFields, NodeTitle } from '@/Graf/Node/SharedNode';
import { ActiveDescription, NodeInterface, EditableText } from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers/trees';
import { TopNodeMenu } from '@/Graf/Node/ActiveNode/TopNodeMenu';
import { ChangeAllRelatedNodes } from '@/GraphQL/Resolve';
import { ActiveArgument } from '@/Graf/Node/Argument';

interface NodeProps {
  node: ParserField;
  onDelete: () => void;
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
  position: 'absolute',
  left: -300,
  width: 300,
  zIndex: 4,
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
};
const LeftNodeAreaNode: NestedCSSProperties = { position: 'relative' };
const RightNodeArea: NestedCSSProperties = { position: 'absolute', right: -300, width: 300, zIndex: 4 };
const RightNodeAreaNode: NestedCSSProperties = { position: 'absolute' };

const LibraryNodeArea: NestedCSSProperties = {
  borderStyle: 'dashed',
};
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  maxWidth: 600,
  transition: `border-color .25s ease-in-out`,
  borderColor: Colors.green[0],
  $nest: {
    '.NodeTitle': NodeTitle,
    '.NodeFields': NodeFields,
    '&.LibraryNodeArea': LibraryNodeArea,
  },
};
const DescriptionPosition: NestedCSSProperties = {
  position: 'absolute',
  transformOrigin: 'center bottom',
  transform: 'translate(0px, calc(-100% - 10px))',
  width: '100%',
  outline: 'none',
  $nest: {
    '&:focus': {
      border: `1px solid ${Colors.grey[3]}`,
    },
  },
};
const NodeContainer = style({
  position: 'relative',
  breakInside: 'avoid',
  maxWidth: '100%',
  margin: 10,
  $nest: {
    '.DescriptionPosition': DescriptionPosition,
    '.LeftNodeArea': LeftNodeArea,
    '.RightNodeArea': RightNodeArea,
    '.MainNodeArea': {
      ...MainNodeArea,
      animationName: fadeIn,
      animationDuration: '0.25s',
    },
    '.RightNodeAreaNode': RightNodeAreaNode,
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

export const ActiveNode: React.FC<NodeProps> = ({ node, ...sharedProps }) => {
  const [openedInputs, setOpenedInputs] = useState<number[]>([]);
  const [openedOutputs, setOpenedOutputs] = useState<number[]>([]);

  const [openedDirectiveInputs, setOpenedDirectiveInputs] = useState<number[]>([]);
  const [openedDirectiveOutputs, setOpenedDirectiveOutputs] = useState<number[]>([]);

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

  return (
    <div className={`${NodeContainer} ${DOM.classes.node} ${DOM.classes.nodeSelected}`} ref={selectedNodeRef}>
      <ActiveDescription
        className={'DescriptionPosition'}
        onChange={(d) => {
          node.description = d;
          setTree({ ...tree });
        }}
        isLocked={isLibrary}
        value={node.description || ''}
      />
      {!!node.interfaces?.length && (
        <div className={NodeInterfaces}>
          {node.interfaces.map((i) => (
            <NodeInterface
              key={i}
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
        {openedDirectiveInputs.sort().map((o) => (
          <div key={o} className={`LeftNodeAreaNode`} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <ActiveNode
              {...sharedProps}
              node={node.directives![o]}
              onDelete={() => {
                setOpenedDirectiveInputs([]);
                setOpenedDirectiveOutputs([]);
                node.args!.splice(o, 1);
                DOM.panLock = false;
                setTree({ ...tree });
              }}
            />
          </div>
        ))}
        {openedInputs.sort().map((o) => (
          <div
            key={o}
            className={`LeftNodeAreaNode`}
            style={{ top: FIELD_HEIGHT * (o + (node.directives?.length || 0) + 1) }}
          >
            <ActiveNode
              {...sharedProps}
              node={node.args![o]}
              onDelete={() => {
                setOpenedInputs([]);
                setOpenedOutputs([]);
                node.args!.splice(o, 1);
                DOM.panLock = false;
                setTree({ ...tree });
              }}
            />
          </div>
        ))}
      </div>
      <div className={`RightNodeArea`}>
        {openedDirectiveOutputs.sort().map((o) => (
          <div key={o} className={`RightNodeAreaNode`} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <ActiveNode
              {...sharedProps}
              node={
                (tree.nodes.find((n) => n.name === node.directives![o].type.name) ||
                  libraryTree.nodes.find((n) => n.name === node.directives![o].type.name))!
              }
            />
          </div>
        ))}
        {openedOutputs.sort().map((o) => (
          <div
            key={o}
            className={`RightNodeAreaNode`}
            style={{ top: FIELD_HEIGHT * (o + (node.directives?.length || 0) + 1) }}
          >
            <ActiveNode
              {...sharedProps}
              node={
                (tree.nodes.find((n) => n.name === node.args![o].type.name) ||
                  libraryTree.nodes.find((n) => n.name === node.args![o].type.name))!
              }
            />
          </div>
        ))}
      </div>
      <div
        className={`MainNodeArea${isLibrary ? ' LibraryNodeArea' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`NodeTitle`}>
          <div className={`NodeName`}>
            {isLibrary && <EditableText value={node.name} />}
            {!isLibrary && (
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
                      name: v,
                      dataType: node.data.type!,
                    });
                  }
                }}
              />
            )}
          </div>
          <div className={`NodeType`}>
            <ActiveType type={node.type} />
          </div>
          {!isLibrary && <TopNodeMenu {...sharedProps} node={node} />}
        </div>
        <div className={`NodeFields NodeBackground-${parentNode ? parentNode.type.name : node.type.name}`}>
          {node.directives?.map((d, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === d.type.name) || libraryTree.nodes.find((n) => n.name === d.type.name)
            );
            return (
              <ActiveDirective
                isLocked={isLibrary}
                parentNodeTypeName={node.type.name}
                last={i === node.args!.length - 1}
                key={d.name}
                onInputClick={() => {
                  setOpenedDirectiveInputs((oI) => (oI.includes(i) ? oI.filter((o) => o !== i) : [...oI, i]));
                }}
                onOutputClick={() => {
                  setOpenedDirectiveOutputs((oO) => (oO.includes(i) ? oO.filter((o) => o !== i) : [...oO, i]));
                }}
                node={d}
                inputOpen={openedDirectiveInputs.includes(i)}
                outputDisabled={outputDisabled}
                outputOpen={openedDirectiveOutputs.includes(i)}
              />
            );
          })}
          {node.args?.map((a, i) => {
            const outputDisabled = !(
              tree.nodes.find((n) => n.name === a.type.name) || libraryTree.nodes.find((n) => n.name === a.type.name)
            );
            if (isArgumentNode) {
              return (
                <ActiveArgument
                  parentNode={node}
                  isLocked={isLibrary}
                  parentNodeTypeName={node.type.name}
                  last={i === node.args!.length - 1}
                  key={a.name}
                  onInputClick={() => {
                    setOpenedInputs((oI) => (oI.includes(i) ? oI.filter((o) => o !== i) : [...oI, i]));
                  }}
                  onOutputClick={() => {
                    setOpenedOutputs((oO) => (oO.includes(i) ? oO.filter((o) => o !== i) : [...oO, i]));
                  }}
                  node={a}
                  inputOpen={openedInputs.includes(i)}
                  outputDisabled={outputDisabled}
                  outputOpen={openedOutputs.includes(i)}
                />
              );
            }
            if (isInputNode) {
              return (
                <ActiveInputValue
                  isLocked={isLibrary}
                  parentNodeTypeName={node.type.name}
                  last={i === node.args!.length - 1}
                  key={a.name}
                  onInputClick={() => {
                    setOpenedInputs((oI) => (oI.includes(i) ? oI.filter((o) => o !== i) : [...oI, i]));
                  }}
                  onOutputClick={() => {
                    setOpenedOutputs((oO) => (oO.includes(i) ? oO.filter((o) => o !== i) : [...oO, i]));
                  }}
                  node={a}
                  inputOpen={openedInputs.includes(i)}
                  outputDisabled={outputDisabled}
                  outputOpen={openedOutputs.includes(i)}
                />
              );
            }

            return (
              <ActiveField
                isLocked={isLibrary}
                parentNodeTypeName={node.type.name}
                last={i === node.args!.length - 1}
                key={a.name}
                onInputClick={() => {
                  setOpenedInputs((oI) => (oI.includes(i) ? oI.filter((o) => o !== i) : [...oI, i]));
                }}
                onOutputClick={() => {
                  setOpenedOutputs((oO) => (oO.includes(i) ? oO.filter((o) => o !== i) : [...oO, i]));
                }}
                node={a}
                inputOpen={openedInputs.includes(i)}
                outputDisabled={outputDisabled}
                outputOpen={openedOutputs.includes(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
