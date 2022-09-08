import React, { useState } from 'react';
import * as Icons from '../icons';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTreesState } from '@/state/containers';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';
import { CollapseArrow } from '@/editor/menu/CollapseArrow';

const Sidebar = styled.div<{ isCollapsed: boolean }>`
  background: ${({ theme }) => theme.background.mainFurthest};
  color: ${({ theme }) => theme.disabled};
  font-size: 12px;
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.contra};
  border-right-width: 2px;
  position: relative;
  transition: width 0.5s ease-in-out;
  width: ${({ isCollapsed }) => (isCollapsed ? '64px' : '210px')};
  padding-top: 10px;
`;

const MenuItem = styled.div<{ isCollapsed: boolean; isDisabled?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.disabled : theme.text};
  padding: 15px;
  margin: 0 5px;
  border-radius: 4px;
  font-family: ${fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.25s ease;
  overflow: hidden;
  user-select: none;

  &:hover {
    background-color: ${({ theme, isDisabled }) => !isDisabled && theme.contra};
    color: ${({ isDisabled, theme }) =>
      isDisabled ? theme.disabled : '#e3f6fc'};
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

  p::after {
    display: ${({ isDisabled }) => (isDisabled ? 'none' : 'inline')};
    position: relative;
    bottom: 1px;
  }

  & > div {
    position: relative;
    display: flex;
    align-items: center;
  }

  & > div::after {
    display: ${({ isDisabled }) => (isDisabled ? 'none' : 'block')};
    position: absolute;
    right: -10px;
    top: -10px;
  }

  svg {
    flex-shrink: 0;
    height: 22px;
  }

  p {
    margin: 0 0 0 15px;
    font-size: 14px;
    width: max-content;
    white-space: nowrap;
    transition: opacity 0.25s ease-in-out;
    transform: translateY(2px);
    opacity: ${({ isCollapsed }) => (isCollapsed ? '0' : '1')};
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

  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      left: 67px;
      width: max-content;
      color: ${({ theme }) => theme.text};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.dimmed};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: ${({ isCollapsed }) => (isCollapsed ? 1 : 0)};
        color: #e3f6fc;
      }
    }
  }
`;

const BorderSpacer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.contra};
  margin: 10px 0;
  height: 0;
  width: 100%;
`;

export type ActiveSource = 'diagram' | 'relation' | 'docs' | 'code';
export type ActivePane = 'diagram' | 'diff' | 'relation' | 'docs';
export interface MenuProps {
  setToggleCode: (v: boolean) => void;
  toggleCode: boolean;
  sidebarExpanded?: boolean;
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane: ActivePane) => void;
}

const MenuChildren = GraphQLEditorDomStructure.tree.sidebar.menu.children;

export const Menu = ({
  toggleCode,
  setToggleCode,
  setActivePane,
  activePane,
  excludePanes = [],
  sidebarExpanded,
}: MenuProps) => {
  const { libraryTree, switchSchema, schemaType } = useTreesState();
  const [isCollapsed, setIsCollapsed] = useState(
    sidebarExpanded === true ? false : true,
  );

  return (
    <Sidebar isCollapsed={isCollapsed}>
      <MenuItem
        data-cy={MenuChildren.code}
        className={toggleCode ? 'toggle-active' : ''}
        onClick={() => {
          if (activePane === 'diff') return;
          setToggleCode(!toggleCode);
        }}
        isCollapsed={isCollapsed}
        isDisabled={activePane === 'diff'}
        data-tooltip="Toggle Code"
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
            switchSchema();
          }}
          isCollapsed={isCollapsed}
          data-tooltip="Library Schema"
        >
          <div>
            <Icons.Library size={22} />
          </div>
          <p>Library Schema</p>
        </MenuItem>
      )}
      <BorderSpacer />
      {!excludePanes.includes('diagram') && (
        <MenuItem
          data-cy={MenuChildren.diagram}
          className={activePane === 'diagram' ? 'active' : ''}
          onClick={() => setActivePane('diagram')}
          data-tooltip="Diagram View"
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
          data-tooltip="Relation View"
          isCollapsed={isCollapsed}
        >
          <Icons.RelationView size={22} />
          <p>Relation View</p>
        </MenuItem>
      )}
      {!excludePanes.includes('docs') && (
        <MenuItem
          data-cy={MenuChildren.docs}
          className={activePane === 'docs' ? 'active' : ''}
          onClick={() => setActivePane('docs')}
          data-tooltip="Documentation View"
          isCollapsed={isCollapsed}
        >
          <Icons.DocsView size={22} />
          <p>Documentation View</p>
        </MenuItem>
      )}
      <BorderSpacer />
      {!excludePanes.includes('diff') && (
        <MenuItem
          data-cy={MenuChildren.diff}
          className={activePane === 'diff' ? 'active' : ''}
          onClick={() => setActivePane('diff')}
          data-tooltip="Diff View"
          isCollapsed={isCollapsed}
        >
          <Icons.DiffView size={22} />
          <p>Diff View</p>
        </MenuItem>
      )}
      <CollapseArrow
        isCollapsed={isCollapsed}
        toggle={() => setIsCollapsed((prev) => !prev)}
      >
        <Icons.ArrowLeft size={11} />
      </CollapseArrow>
    </Sidebar>
  );
};
