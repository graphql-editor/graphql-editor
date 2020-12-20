import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { GraphQLBackgrounds } from '@/editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { NodeTitle } from './SharedNode';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { Plus } from '@/Graf/icons';
export interface NewNodeProps {
  node: ParserField;
  onCreate: (name: string) => void;
}
const NameError: NestedCSSProperties = {
  color: Colors.red[0],
};
const NameErrorMessage: NestedCSSProperties = {
  position: 'absolute',
  height: 30,
  top: -30,
  color: Colors.red[0],
  width: 600,
  fontSize: 10,
  marginLeft: -10,
  display: 'flex',
  alignItems: 'center',
};
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
    '&.NameError': NameError,
  },
};
const MainNodeArea: NestedCSSProperties = {
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  $nest: {
    '.NodeTitle': {
      ...NodeTitle,
      width: 200,
      background: 'transparent',
      $nest: {
        ...NodeTitle.$nest,
        '.NodeCreate': NodeCreate,
        '.NameErrorMessage': NameErrorMessage,
      },
    },
    '&:hover': {
      borderColor: Colors.green[0],
    },
  },
};
const NodeContainer = style({
  margin: 10,
  $nest: {
    '.MainNodeArea': MainNodeArea,
    ...Object.keys(GraphQLBackgrounds).reduce((a, b) => {
      a[`.NodeType-${b}`] = {
        borderColor: GraphQLBackgrounds[b],
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});

const PlusButton = style({
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  color: Colors.grey[0],
  border: `1px solid ${Colors.grey[0]}11`,
  width: 20,
  height: 20,
  borderRadius: 10,
  marginRight: 5,
});

export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree, setSelectedNode } = useTreesState();
  const isError =
    tree.nodes.map((n) => n.name).includes(newName) || libraryTree.nodes.map((n) => n.name).includes(newName);
  const submit = () => {
    if (newName && !isError) {
      onCreate(newName);
    }
    setNewName('');
    setIsCreating(false);
  };
  return (
    <div className={`${NodeContainer}`} ref={thisNode} style={{}}>
      <div
        className={`MainNodeArea NodeType-${node.name}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsCreating(true);
          setSelectedNode(undefined);
        }}
      >
        <div className={`NodeTitle`}>
          {isError && (
            <div
              className={'NameErrorMessage'}
            >{`Cannot create ${node.name} with name:${newName} type with that name already exists. Try different name`}</div>
          )}
          {!isCreating && <div className={`NodeName`}>{`New ${node.name}`}</div>}
          {isCreating && (
            <input
              className={`NodeCreate ${isError ? 'NameError' : ''}`}
              value={newName}
              autoFocus
              placeholder={`New ${node.name} name...`}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
          )}
          {!isCreating && (
            <span className={`${PlusButton}`}>
              <Plus width={10} height={10} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
