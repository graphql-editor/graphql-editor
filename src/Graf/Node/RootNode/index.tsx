import React, { useRef, useState } from 'react';
import {
  ParserField,
  TypeDefinitionDisplayMap,
  TypeSystemDefinition,
  Directive,
} from 'graphql-js-tree';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { NewNode } from '@/Graf/Node/NewNode';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { useTreesState } from '@/state/containers/trees';
import { MenuSearch } from '@/Graf/Node/components';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
export interface RootNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
  readonly?: boolean;
}
const NodeCaption = themed(({ colors }) =>
  style({
    flexBasis: '100%',
    margin: `15px 15px`,
    display: 'flex',
    borderBottom: `1px solid`,
    paddingBottom: 15,
    alignItems: 'center',
    userSelect: 'none',
    '-moz-user-select': '-moz-none',
    $nest: {
      ...Object.keys(colors).reduce((a, b) => {
        a[`&.CaptionType-${b}`] = {
          color: `${(colors as any)[b]}`,
          borderColor: `${(colors as any)[b]}22`,
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
    },
  }),
);
const CaptionTitle = style({
  marginRight: 10,
});
const NodeContainer = style({
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  width: '100%',
});

export const RootNode: React.FC<RootNodeProps> = ({
  node,
  libraryNode,
  readonly,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { tree, setTree } = useTreesState();

  const [filterNodes, setFilterNodes] = useState('');

  return (
    <div className={NodeContainer} ref={thisNode}>
      <div className={`${NodeCaption(theme)} CaptionType-${node.name}`}>
        <span
          data-cy={GraphQLEditorDomStructure.tree.elements.Graf.categoryName}
          className={CaptionTitle}
        >
          {node.name}
        </span>
        <MenuSearch
          cypressName={GraphQLEditorDomStructure.tree.elements.Graf.searchInput}
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          onSubmit={() => {}}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </div>
      {!readonly && (
        <NewNode
          node={node}
          onCreate={(name) => {
            const createdNode =
              node.data.type === TypeSystemDefinition.DirectiveDefinition
                ? {
                    ...node,
                    name,
                    args: [],
                    type: {
                      name: TypeDefinitionDisplayMap[node.data.type],
                      directiveOptions: [Directive.OBJECT],
                    },
                  }
                : {
                    ...node,
                    name,
                    args: [],
                    type: {
                      name: (TypeDefinitionDisplayMap as any)[
                        node.data.type as any
                      ],
                    },
                  };
            tree.nodes.push(createdNode);
            setTree({ ...tree });
            return createdNode;
          }}
        />
      )}
      {node.args?.map((a, i) => {
        return (
          <PaintNode
            key={a.name}
            node={a}
            isMatchedToSearch={a.name
              .toLowerCase()
              .includes(filterNodes.toLowerCase())}
          />
        );
      })}
      {libraryNode?.args?.map((a, i) => {
        return (
          <PaintNode
            isLibrary={true}
            key={a.name}
            node={a}
            isMatchedToSearch={a.name
              .toLowerCase()
              .includes(filterNodes.toLowerCase())}
          />
        );
      })}
    </div>
  );
};
