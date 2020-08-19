import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { GraphQLBackgrounds } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@Graf/DOM';
import { NodeTitle } from './SharedNode';
import { fontFamily } from '@vars';
export interface NodeProps {
  node: ParserField;
  onClick: (position: { offsetLeft: number; offsetTop: number; width: number }) => void;
  position: { x: number; y: number };
}
const NodeCreate: NestedCSSProperties = {
  color: Colors.grey[0],
  background: 'transparent',
  fontSize: 12,
  padding: `5px 0 5px 10px`,
  border: 0,
  outline: 0,
  fontFamily,
  width: 200,
  $nest: {
    '&::placeholder': {
      fontFamily,
    },
  },
};
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  $nest: {
    '.NodeTitle': {
      ...NodeTitle,
      width: 200,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      background: 'transparent',
      $nest: {
        ...NodeTitle.$nest,
        '.NodeCreate': NodeCreate,
      },
    },
    '&:hover': {
      borderColor: Colors.green[0],
    },
  },
};
const NodeContainer = style({
  margin: 15,
  $nest: {
    '.MainNodeArea': MainNodeArea,
    [`&.${DOM.classes.nodeSelected}`]: {
      $nest: {
        '.MainNodeArea': {
          borderColor: Colors.green[0],
        },
      },
    },
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        borderColor: GraphQLBackgrounds[b],
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});
export const NewNode: React.FC<NodeProps> = ({ node, onClick, position }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className={`${NodeContainer}`} ref={thisNode} style={{}}>
      <div
        className={`MainNodeArea NodeType-${node.name}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsCreating(true);
        }}
      >
        <div className={`NodeTitle`}>
          {!isCreating && <div className={`NodeName`}>{`New ${node.name} +`}</div>}
          {isCreating && (
            <input
              className={'NodeCreate'}
              value={newName}
              autoFocus
              placeholder={`New ${node.name} +`}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => {
                if (newName) {
                  //create
                }
                setNewName('');
                setIsCreating(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
