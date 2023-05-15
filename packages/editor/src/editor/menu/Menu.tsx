import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans, transition } from '@/vars';
import {
  Tool,
  Code,
  File,
  Filter,
  ArrowNarrowUpMove,
  ArrowNarrowBottomAlignment,
  DropdownMenu,
  MenuItem,
} from '@aexol-studio/styling-system';
import { PassedSchema } from '@/Models';
import { ImportSchema } from '@/shared/dialogs/ImportSchema';
import { useFileOperations } from '@/editor/menu/Tools/FileOperations';

const Sidebar = styled.div`
  background: ${({ theme }) => theme.neutral[600]};
  color: ${({ theme }) => theme.text.disabled};
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.black};
  border-right-width: 1px;
  border-left-width: 1px;
  position: relative;
  transition: width 0.5s ease-in-out;
  width: calc(2rem + 20px);
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
const Filler = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.neutral[600]};
`;

const MenuItem = styled.div<{
  isDisabled?: boolean;
  rotateItem?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.text.disabled : theme.text.active};
  padding: 1rem;
  font-family: ${fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.25s ease;
  overflow: visible;
  user-select: none;
  background-color: ${({ theme }) => theme.neutral[500]};
  border-bottom: ${(p) => p.theme.black} 1px solid;

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
    !isDisabled && theme.neutral[500]};
    color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.text.disabled : '#e3f6fc'};
  }

  svg {
    flex-shrink: 0;
    height: 20px;
    transition: ${transition};
  }

  &.active {
    color: ${({ theme }) => theme.accents[200]};
    font-weight: 600;
  }
  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      left: 67px;
      width: max-content;
      color: ${({ theme }) => theme.text.default};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.text.disabled};
      border-radius: ${(p) => p.theme.radius}px;
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: ${transition};
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
  }
`;

export type ActiveSource =
  | 'relation'
  | 'docs'
  | 'code'
  | 'navigation'
  | 'routing'
  | 'deFocus';
export type ActivePane = 'diff' | 'relation' | 'docs';
export interface MenuProps {
  setToggleCode: (v: boolean) => void;
  toggleCode: boolean;
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane?: ActivePane) => void;
  schema: string;
  libraries?: string;
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  path: string;
}

export const Menu = ({
  toggleCode,
  setToggleCode,
  setActivePane,
  activePane,
  setSchema,
  path,
  schema,
  libraries,
  excludePanes = [],
}: MenuProps) => {
  const [importOpen, setImportOpen] = useState(false);
  const { saveToFile } = useFileOperations();
  const exportActions: MenuItem[] = [
    {
      name: 'Export schema',
      onClick: () => {
        saveToFile(path, schema);
      },
    },
  ];
  if (libraries) {
    exportActions.push({
      name: 'Export schema with libraries',
      onClick: () => {
        saveToFile(path, [libraries, schema].join('\n'));
      },
    });
  }
  return (
    <>
      <Sidebar>
        <MenuItem
          className={toggleCode ? 'toggle-active' : ''}
          onClick={() => {
            if (!activePane || activePane === 'diff') return;
            setToggleCode(!toggleCode);
          }}
          isDisabled={activePane === 'diff'}
          data-tooltip="Toggle Code"
          data-tour="toggle-code"
        >
          <div>
            <Code />
          </div>
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
          >
            <Tool />
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
          >
            <File />
          </MenuItem>
        )}
        {!excludePanes.includes('diff') && (
          <MenuItem
            className={activePane === 'diff' ? 'active' : ''}
            onClick={() => setActivePane('diff')}
            data-tooltip="Diff"
            data-tour="diff"
          >
            <Filter />
          </MenuItem>
        )}

        <DropdownMenu
          actionType="icon"
          dropdownPosition="right"
          menuItems={exportActions}
        >
          <MenuItem data-tooltip="Export schema" data-tour="export">
            <ArrowNarrowUpMove />
          </MenuItem>
        </DropdownMenu>
        <MenuItem
          onClick={() => setImportOpen(true)}
          data-tooltip="Import schema"
          data-tour="import"
        >
          <ArrowNarrowBottomAlignment />
        </MenuItem>
        <Filler />
      </Sidebar>
      <ImportSchema
        onClose={() => {
          setImportOpen(false);
        }}
        open={importOpen}
        onImport={(s) => {
          setSchema({
            code: s,
          });
        }}
      />
    </>
  );
};
