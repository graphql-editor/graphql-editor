import React, { useState } from 'react';
import * as Icons from '../icons';

import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';
import { CollapseArrow } from '@/editor/menu/CollapseArrow';

const Sidebar = styled.div<{ isCollapsed: boolean }>`
  background: ${({ theme }) => theme.background.mainFurther};
  color: ${({ theme }) => theme.disabled};
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.moduleSeparator};
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
    background-color: ${({ theme, isDisabled }) =>
      !isDisabled && theme.moduleSeparator};
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
  border-bottom: 2px solid ${({ theme }) => theme.moduleSeparator};
  margin: 10px 0;
  height: 0;
  width: 100%;
`;

export type ActiveSource = 'diagram' | 'relation' | 'docs' | 'code' | 'routing';
export type ActivePane = 'diff' | 'relation' | 'docs';
export interface MenuProps {
  setToggleCode: (v: boolean) => void;
  toggleCode: boolean;
  sidebarExpanded?: boolean;
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane?: ActivePane) => void;
}

export const Menu = ({
  toggleCode,
  setToggleCode,
  setActivePane,
  activePane,
  excludePanes = [],
  sidebarExpanded,
}: MenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState(
    sidebarExpanded === true ? false : true,
  );

  return (
    <Sidebar isCollapsed={isCollapsed}>
      <MenuItem
        className={toggleCode ? 'toggle-active' : ''}
        onClick={() => {
          if (!activePane || activePane === 'diff') return;
          setToggleCode(!toggleCode);
        }}
        isCollapsed={isCollapsed}
        isDisabled={activePane === 'diff'}
        data-tooltip="Toggle Code"
        data-tour="toggle-code"
      >
        <div>
          <Icons.ToggleCode size={20} />
        </div>
        <p>Toggle Code</p>
      </MenuItem>
      <BorderSpacer />
      {!excludePanes.includes('relation') && (
        <MenuItem
          className={activePane === 'relation' ? 'active' : ''}
          onClick={() => {
            if (activePane === 'relation' && toggleCode) {
              setActivePane(undefined);
              return;
            }
            setActivePane('relation');
          }}
          data-tooltip="Relation"
          data-tour="relation"
          isCollapsed={isCollapsed}
        >
          <Icons.RelationView size={22} />
          <p>Relation</p>
        </MenuItem>
      )}
      {!excludePanes.includes('docs') && (
        <MenuItem
          className={activePane === 'docs' ? 'active' : ''}
          onClick={() => {
            if (activePane === 'docs' && toggleCode) {
              setActivePane(undefined);
              return;
            }
            setActivePane('docs');
          }}
          data-tooltip="Documentation"
          data-tour="documentation"
          isCollapsed={isCollapsed}
        >
          <Icons.DocsView size={22} />
          <p>Documentation</p>
        </MenuItem>
      )}
      <BorderSpacer />
      {!excludePanes.includes('diff') && (
        <MenuItem
          className={activePane === 'diff' ? 'active' : ''}
          onClick={() => setActivePane('diff')}
          data-tooltip="Diff"
          data-tour="diff"
          isCollapsed={isCollapsed}
        >
          <Icons.DiffView size={22} />
          <p>Diff</p>
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
