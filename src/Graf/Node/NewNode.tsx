import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { GraphQLBackgrounds } from '@editor/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { DOM } from '@Graf/DOM';
import { NodeTitle } from './SharedNode';
import { fontFamily } from '@vars';
import { useTreesState } from '@state/containers/trees';
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
        '.NameErrorMessage': NameErrorMessage,
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
export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree } = useTreesState();
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
        }}
      >
        <div className={`NodeTitle`}>
          {isError && (
            <div
              className={'NameErrorMessage'}
            >{`Cannot create ${node.name} with name:${newName} type with that name already exists. Try different name`}</div>
          )}
          {!isCreating && <div className={`NodeName`}>{`New ${node.name} +`}</div>}
          {isCreating && (
            <input
              className={`NodeCreate ${isError ? 'NameError' : ''}`}
              value={newName}
              autoFocus
              placeholder={`New ${node.name} +`}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
