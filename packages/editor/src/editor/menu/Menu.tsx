import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import { ChevronSelectorHorizontal } from '@/icons/ChevronSelectorHorizontal';
import { Tool } from '@/icons/Tool';
import { File } from '@/icons/File';
import { FilterFunnel02 } from '@/icons/FilterFunnel02';
import { ChevronRightDouble } from '@/icons/ChevronRightDouble';

const Sidebar = styled.div<{ isCollapsed: boolean }>`
  background: ${({ theme }) => theme.background.mainBlack};
  color: ${({ theme }) => theme.disabled};
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.moduleSeparator};
  border-right-width: 2px;
  position: relative;
  transition: width 0.5s ease-in-out;
  width: ${({ isCollapsed }) => (isCollapsed ? 'calc(2rem + 20px)' : '210px')};
  padding-top: 2px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
const Filler = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.background.mainFar};
`;

const MenuItem = styled.div<{
  isCollapsed: boolean;
  isDisabled?: boolean;
  rotate?: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.disabled : theme.text};
  padding: 1rem;
  border-radius: 2px;
  font-family: ${fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.25s ease;
  overflow: hidden;
  user-select: none;
  background-color: ${({ theme }) => theme.background.mainFar};

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      !isDisabled && theme.background.mainCloser};
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
    height: 20px;
    rotate: ${({ rotate }) => (rotate ? '0deg' : '180deg')};
    transition: ${transition};
  }

  p {
    font-size: 14px;
    margin: 0;
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
          <ChevronSelectorHorizontal />
        </div>
        <p>Toggle Code</p>
      </MenuItem>
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
          <Tool />
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
          <File />
          <p>Documentation</p>
        </MenuItem>
      )}
      {!excludePanes.includes('diff') && (
        <MenuItem
          className={activePane === 'diff' ? 'active' : ''}
          onClick={() => setActivePane('diff')}
          data-tooltip="Diff"
          data-tour="diff"
          isCollapsed={isCollapsed}
        >
          <FilterFunnel02 />
          <p>Diff</p>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => setIsCollapsed((prev) => !prev)}
        isCollapsed={isCollapsed}
        data-tooltip={'show'}
        rotate={isCollapsed}
      >
        <ChevronRightDouble />
        <p>Hide</p>
      </MenuItem>
      <Filler />
    </Sidebar>
  );
};
