import React, { useState } from 'react';
import * as Icons from './icons';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTreesState } from '@/state/containers';
import { PassedSchema } from '@/Models';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Sidebar = styled.div<{ isCollapsed: boolean }>`
  background: ${({ theme }) => theme.background.mainFurthest};
  color: ${({ theme }) => theme.disabled};
  font-size: 12px;
  padding: 15px 0;
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.contra};
  border-right-width: 2px;
  position: relative;
  transition: width 0.5s ease-in-out;
  width: ${({ isCollapsed }) => (isCollapsed ? '64px' : '210px')};
`;

const CollapseArrow = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 29px;
  width: 29px;
  border-radius: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.background.mainMiddle};
  position: absolute;
  z-index: 5;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  color: ${({ theme }) => theme.disabled};
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.active};
  }

  svg {
    width: 6px;
    height: 11px;
    transform: ${({ isCollapsed }) =>
      isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const MenuItem = styled.div<{ isCollapsed: boolean; borderBottom?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
  padding: 5px 20px;
  border-bottom: ${({ borderBottom, theme }) =>
    borderBottom ? `2px solid ${theme.contra}` : ''};
  padding-bottom: ${({ borderBottom }) => (borderBottom ? `15px` : '')};
  font-family: ${fontFamilySans};
  cursor: pointer;
  transition: color 0.25s ease;
  overflow: hidden;

  & > div {
    display: flex;
    position: relative;
  }

  & > div::after,
  p::after {
    margin-left: 10px;
    color: ${({ theme }) => theme.active};
    content: '✔';
    font-size: 16px;
    line-height: 1;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
  }

  & > div::after {
    position: absolute;
    right: -15px;
    top: -10px;
  }

  svg {
    flex-shrink: 0;
  }

  p {
    margin: 0 0 0 15px;
    font-size: 14px;
    width: max-content;
    white-space: nowrap;
    transition: opacity 0.25s ease-in-out;
    opacity: ${({ isCollapsed }) => (isCollapsed ? '0' : '1')};
  }

  &:hover,
  &.active {
    color: ${({ theme }) => theme.active};
  }

  &.active {
    color: ${({ theme }) => theme.active};
    font-weight: 600;
  }

  &.toggle-active {
    p::after {
      opacity: 1;
    }

    & > div::after {
      opacity: ${({ isCollapsed }) => (isCollapsed ? 1 : 0)};
    }
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
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Sidebar isCollapsed={isCollapsed}>
      <MenuItem
        data-cy={MenuChildren.code}
        className={toggleCode ? 'toggle-active' : ''}
        onClick={() => setToggleCode(!toggleCode)}
        title="Toggle Code"
        borderBottom
        isCollapsed={isCollapsed}
      >
        <div>
          <Icons.ToggleCode size={20} />
        </div>
        <p>Toggle Code</p>
      </MenuItem>
      {libraryTree.nodes.length > 0 && (
        <MenuItem
          data-cy={MenuChildren.diff}
          className={schemaType === 'library' ? 'toggle-active' : ''}
          onClick={() => {
            switchSchema(schema);
          }}
          title="Library Schema"
          borderBottom
          isCollapsed={isCollapsed}
        >
          <div>
            <Icons.Library size={22} />
          </div>
          <p>Library Schema</p>
        </MenuItem>
      )}
      {!excludePanes.includes('diagram') && (
        <MenuItem
          data-cy={MenuChildren.diagram}
          className={activePane === 'diagram' ? 'active' : ''}
          onClick={() => setActivePane('diagram')}
          title="Diagram View"
          isCollapsed={isCollapsed}
        >
          <Icons.DiagramView size={22} />
          <p>Diagram View</p>
        </MenuItem>
      )}

      {!excludePanes.includes('relation') && (
        <MenuItem
          data-cy={MenuChildren.relation}
          className={activePane === 'relation' ? 'active' : ''}
          onClick={() => setActivePane('relation')}
          title="Relation View"
          isCollapsed={isCollapsed}
        >
          <Icons.RelationView size={22} />
          <p>Relation View</p>
        </MenuItem>
      )}
      {!excludePanes.includes('hierarchy') && (
        <MenuItem
          data-cy={MenuChildren.hierarchy}
          className={activePane === 'hierarchy' ? 'active' : ''}
          onClick={() => setActivePane('hierarchy')}
          title="Hierarchy View"
          isCollapsed={isCollapsed}
        >
          <Icons.HierarchyView size={22} />
          <p>Hierarchy View</p>
        </MenuItem>
      )}
      {!excludePanes.includes('docs') && (
        <MenuItem
          data-cy={MenuChildren.hierarchy}
          className={activePane === 'docs' ? 'active' : ''}
          onClick={() => setActivePane('docs')}
          title="Documentation View"
          isCollapsed={isCollapsed}
          borderBottom
        >
          <Icons.DocsView size={22} />
          <p>Documentation View</p>
        </MenuItem>
      )}
      {!excludePanes.includes('diff') && (
        <MenuItem
          data-cy={MenuChildren.diff}
          className={activePane === 'diff' ? 'active' : ''}
          onClick={() => setActivePane('diff')}
          title="Diff View"
          isCollapsed={isCollapsed}
        >
          <Icons.DiffView size={22} />
          <p>Diff View</p>
        </MenuItem>
      )}
      <CollapseArrow
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <Icons.ArrowLeft size={11} />
      </CollapseArrow>
    </Sidebar>
  );
};
