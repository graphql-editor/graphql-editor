import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { NodeTitle } from './SharedNode';
import { fontFamily } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { Plus } from '@/Graf/icons';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
export interface NewNodeProps {
  node: ParserField;
  onCreate: (name: string) => void;
}
const NameError = themed<NestedCSSProperties>(({ error }) => ({
  color: error,
}));
const NameErrorMessage = themed<NestedCSSProperties>(({ error }) => ({
  position: 'absolute',
  height: 30,
  top: -30,
  color: error,
  width: 600,
  fontSize: 10,
  marginLeft: -10,
  display: 'flex',
  alignItems: 'center',
}));
const NodeCreate = themed<NestedCSSProperties>((theme) => ({
  color: theme.text,
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
    '&.NameError': NameError(theme),
  },
}));
const MainNodeArea = themed<NestedCSSProperties>((theme) => ({
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  $nest: {
    '.NodeTitle': {
      ...NodeTitle(theme),
      width: 200,
      background: 'transparent',
      $nest: {
        ...NodeTitle(theme).$nest,
        '.NodeCreate': NodeCreate(theme),
        '.NameErrorMessage': NameErrorMessage(theme),
      },
    },
    '&:hover': {
      borderColor: theme.hover,
    },
  },
}));
const NodeContainer = themed((theme) =>
  style({
    margin: 10,
    $nest: {
      '.MainNodeArea': MainNodeArea(theme),
      ...Object.keys(theme.backgrounds).reduce((a, b) => {
        a[`.NodeType-${b}`] = {
          borderColor: (theme.backgrounds as any)[b],
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
    },
  }),
);

const PlusButton = themed(({ text }) =>
  style({
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: text,
    width: 20,
    height: 20,
    marginRight: 5,
  }),
);

export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree, setSelectedNode } = useTreesState();
  const { theme } = useTheme();
  const isError =
    tree.nodes.map((n) => n.name).includes(newName) ||
    libraryTree.nodes.map((n) => n.name).includes(newName);
  const submit = () => {
    if (newName && !isError) {
      onCreate(newName);
    }
    setNewName('');
    setIsCreating(false);
  };
  return (
    <div
      className={NodeContainer(theme)}
      ref={thisNode}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.newNode}
    >
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
          {!isCreating && (
            <div className={`NodeName`}>{`New ${node.name}`}</div>
          )}
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
            <span className={`${PlusButton(theme)}`}>
              <Plus width={10} height={10} fill={theme.text} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
