import React from 'react';
import * as Icons from './icons';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTreesState } from '@/state/containers';
import { PassedSchema } from '@/Models';
import styled from '@emotion/styled';

const Sidebar = styled.div`
  background: ${({ theme }) => theme.background.mainFurthest};
  color: ${({ theme }) => theme.disabled};
  font-size: 12px;
  z-index: 3;
`;

const IconBox = styled.div`
  &:hover,
  &.active {
    color: ${({ theme }) => theme.active};
  }
`;

export type ActiveSource =
  | 'diagram'
  | 'hierarchy'
  | 'relation'
  | 'docs'
  | 'code';
export type ActivePane = 'diagram' | 'hierarchy' | 'diff' | 'relation' | 'docs';
export interface MenuProps {
  setToggleCode: (v: boolean) => void;
  toggleCode: boolean;
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane: ActivePane) => void;
  schema: PassedSchema;
}

const MenuChildren = GraphQLEditorDomStructure.tree.sidebar.menu.children;

export const Menu = ({
  toggleCode,
  setToggleCode,
  setActivePane,
  activePane,
  excludePanes = [],
  schema,
}: MenuProps) => {
  const { libraryTree, switchSchema, schemaType } = useTreesState();
  return (
    <Sidebar>
      <IconBox
        data-cy={MenuChildren.code}
        className={toggleCode ? 'active' : ''}
        onClick={() => setToggleCode(!toggleCode)}
        title="Toggle Code"
      >
        <Icons.Code size={18} />
      </IconBox>
      {!excludePanes.includes('relation') && (
        <IconBox
          data-cy={MenuChildren.relation}
          className={activePane === 'relation' ? 'active' : ''}
          onClick={() => setActivePane('relation')}
          title="Relation View"
        >
          <Icons.CPU size={18} />
        </IconBox>
      )}
      {!excludePanes.includes('diagram') && (
        <IconBox
          data-cy={MenuChildren.diagram}
          className={activePane === 'diagram' ? 'active' : ''}
          onClick={() => setActivePane('diagram')}
          title="Diagram View"
        >
          <Icons.Grid size={18} />
        </IconBox>
      )}
      {!excludePanes.includes('hierarchy') && (
        <IconBox
          data-cy={MenuChildren.hierarchy}
          className={activePane === 'hierarchy' ? 'active' : ''}
          onClick={() => setActivePane('hierarchy')}
          title="Hierarchy View"
        >
          <Icons.Layers size={18} />
        </IconBox>
      )}
      {!excludePanes.includes('docs') && (
        <IconBox
          data-cy={MenuChildren.hierarchy}
          className={activePane === 'docs' ? 'active' : ''}
          onClick={() => setActivePane('docs')}
          title="Documentation View"
        >
          <Icons.Docs size={18} />
        </IconBox>
      )}
      {!excludePanes.includes('diff') && (
        <IconBox
          data-cy={MenuChildren.diff}
          className={activePane === 'diff' ? 'active' : ''}
          onClick={() => setActivePane('diff')}
          title="Diff View"
        >
          <Icons.Filter size={18} />
        </IconBox>
      )}
      {libraryTree.nodes.length > 0 && (
        <IconBox
          data-cy={MenuChildren.diff}
          className={schemaType === 'library' ? 'active' : ''}
          onClick={() => {
            switchSchema(schema);
          }}
          title="library schema"
        >
          <Icons.Library size={18} />
        </IconBox>
      )}
    </Sidebar>
  );
};
