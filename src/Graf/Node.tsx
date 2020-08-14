import React, { useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { Field } from './Field';
import { style } from 'typestyle';
import { Colors, mix } from '@Colors';
import { FieldType } from './FieldType';
import { FIELD_HEIGHT } from './constants';
import { GraphQLBackgrounds } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
export interface NodeProps {
  node: ParserField;
  nodes: ParserField[];
  isOpen?: boolean;
}
const NodeContainer = style({
  position: 'relative',
  breakInside: 'avoid',
  maxWidth: '100%',
  margin: 10,
  $nest: {
    '.ActionsMenu': {
      marginTop: 4,
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      fontSize: 10,
      gridGap: 4,
      opacity: 0,
      transition: `opacity .25s ease-in-out`,
      pointerEvents: 'none',
    },
    '&:hover': {
      $nest: {
        '> .ActionsMenu': {
          opacity: 1.0,
          pointerEvents: 'auto',
        },
      },
    },
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
const LeftNodeArea = style({
  position: 'absolute',
  left: -300,
  width: 300,
  zIndex: 4,
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
});
const LeftNodeAreaNode = style({ position: 'relative' });
const RightNodeArea = style({ position: 'absolute', right: -300, width: 300, zIndex: 4 });
const RightNodeAreaNode = style({ position: 'absolute' });

const MainNodeArea = style({
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  transition: `border-color .25s ease-in-out`,
  $nest: {
    '&:hover': {
      borderColor: Colors.green[0],
    },
    '&.Open': {
      borderColor: Colors.grey[0],
    },
  },
});
const NodeTitle = style({
  background: Colors.grey[8],
  display: 'flex',
  alignItems: 'baseline',
  padding: `5px 10px`,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
});
const NodeName = style({ marginRight: 5, color: Colors.grey[0], fontSize: 12 });
const NodeType = style({ color: Colors.main[0], fontSize: 10 });
const NodeFields = style({});
const LowerButton = style({
  background: '#11303D',
  borderRadius: 4,
  color: Colors.grey[0],
  padding: `5px 10px`,
  transition: `background .25s ease-in-out`,
  $nest: {
    '&:hover': {
      background: Colors.blue[3],
    },
  },
});
export const Node: React.FC<NodeProps> = ({ node, nodes, isOpen }) => {
  const [openedInputs, setOpenedInputs] = useState<number[]>([]);
  const [openedOutputs, setOpenedOutputs] = useState<number[]>([]);
  return (
    <div className={`${NodeContainer}`}>
      <div className={LeftNodeArea}>
        {openedInputs.sort().map((o) => (
          <div key={o} className={LeftNodeAreaNode} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <Node isOpen={true} nodes={nodes} node={node.args![o]} />
          </div>
        ))}
      </div>
      <div className={RightNodeArea}>
        {openedOutputs.sort().map((o) => (
          <div key={o} className={RightNodeAreaNode} style={{ top: FIELD_HEIGHT * (o + 1) }}>
            <Node isOpen={true} nodes={nodes} node={nodes.find((n) => n.name === node.args![o].type.name)!} />
          </div>
        ))}
      </div>
      <div className={`${MainNodeArea} ${isOpen ? 'Open' : ''}`}>
        <div className={NodeTitle}>
          <div className={NodeName}>{node.name}</div>
          <div className={NodeType}>
            <FieldType type={node.type} />
          </div>
        </div>
        <div className={NodeFields}>
          {node.args?.map((a, i) => (
            <Field
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
              outputDisabled={!nodes.find((n) => n.name === a.type.name)}
              outputOpen={openedOutputs.includes(i)}
            />
          ))}
        </div>
      </div>
      <div className={'ActionsMenu'}>
        <div className={LowerButton}>+ add field</div>
        <div className={LowerButton}>ooo</div>
      </div>
    </div>
  );
};
