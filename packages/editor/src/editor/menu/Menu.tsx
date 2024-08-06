import React, { useState } from "react";
import styled from "@emotion/styled";
import { transition } from "@/vars";
import {
  Tool,
  Code,
  File,
  Files,
  Filter,
  ArrowNarrowUpMove,
  ArrowNarrowBottomAlignment,
  DropdownMenu,
  MenuItem as MI,
  Tooltip,
} from "@aexol-studio/styling-system";
import { PassedSchema } from "@/Models";
import { ImportSchema } from "@/shared/dialogs/ImportSchema";
import { useFileOperations } from "@/editor/menu/Tools/FileOperations";
import { dataIt } from "@/Models/dataIds";

const Sidebar = styled.div`
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.disabled};
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.neutrals.L8};
  border-right-width: 2px;
  border-left-width: 2px;
  position: relative;
  transition: width 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const Filler = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.neutrals.L6};
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
    isDisabled ? theme.text.disabled : theme.text.default};
  width: 2rem;
  height: 2rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.25s ease;
  overflow: visible;
  user-select: none;
  background-color: ${({ theme }) => theme.neutrals.L5};
  border-bottom: ${(p) => p.theme.neutrals.L7} 1px solid;

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      !isDisabled && theme.neutrals.L5};
    color: ${({ isDisabled, theme }) =>
      isDisabled ? theme.text.disabled : theme.accent.L2};
  }

  svg {
    flex-shrink: 0;
    height: 1.25rem;
    transition: ${transition};
  }

  &.active {
    color: ${({ theme }) => theme.accent.L2};
    font-weight: 600;
  }
  &.toggle-active {
    color: ${({ theme }) => theme.accent.L1};
    font-weight: 600;
  }
`;

export type ActiveSource =
  | "relation"
  | "docs"
  | "code"
  | "navigation"
  | "routing"
  | "deFocus";
export type ActivePane = "diff" | "relation" | "docs";
export interface MenuProps {
  setToggleCode: (v: boolean) => void;
  toggleCode: boolean;
  setToggleFiles?: (v: boolean) => void;
  toggleFiles?: boolean;
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane?: ActivePane) => void;
  schema: string;
  libraries?: string;
  readOnly?: boolean;
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  path: string;
  disableImport?: boolean;
  disableExport?: boolean;
}

export const Menu = ({
  toggleCode,
  setToggleCode,
  toggleFiles,
  setToggleFiles,
  setActivePane,
  activePane,
  setSchema,
  path,
  schema,
  libraries,
  readOnly,
  excludePanes = [],
  disableImport,
  disableExport,
}: MenuProps) => {
  const [importOpen, setImportOpen] = useState(false);
  const { saveToFile } = useFileOperations();
  const exportActions: MI[] = [
    {
      name: "Export schema",
      onClick: () => {
        saveToFile(path, schema);
      },
    },
    {
      name: "Export libraries",
      onClick: () => {
        if (!libraries) return;
        saveToFile(path, libraries);
      },
      disabled: !libraries,
    },
    {
      name: "Export schema with libraries",
      onClick: () => {
        if (!libraries) return;
        saveToFile(path, [libraries, schema].join("\n"));
      },
      disabled: !libraries,
    },
  ];
  return (
    <>
      <Sidebar {...dataIt("sidebar")}>
        <Tooltip title="Toggle Code" position="right-bottom">
          <MenuItem
            className={toggleCode ? "toggle-active" : ""}
            onClick={() => {
              if (!activePane || activePane === "diff") return;
              setToggleCode(!toggleCode);
            }}
            isDisabled={activePane === "diff"}
            {...dataIt("menuCode")}
          >
            <Code />
          </MenuItem>
        </Tooltip>
        {!!setToggleFiles && (
          <Tooltip title="Toggle files" position="right-bottom">
            <MenuItem
              className={toggleFiles ? "toggle-active" : ""}
              onClick={() => {
                setToggleFiles(!toggleFiles);
              }}
              {...dataIt("menuCode")}
            >
              <Files />
            </MenuItem>
          </Tooltip>
        )}
        {!excludePanes.includes("relation") && (
          <Tooltip title="Relations" position="right-center">
            <MenuItem
              className={activePane === "relation" ? "active" : ""}
              onClick={() => {
                if (activePane === "relation" && toggleCode) {
                  setActivePane(undefined);
                  return;
                }
                setActivePane("relation");
              }}
              {...dataIt("menuRelations")}
            >
              <Tool />
            </MenuItem>
          </Tooltip>
        )}
        {!excludePanes.includes("docs") && (
          <Tooltip title="Documentation" position="right-center">
            <MenuItem
              className={activePane === "docs" ? "active" : ""}
              onClick={() => {
                if (activePane === "docs" && toggleCode) {
                  setActivePane(undefined);
                  return;
                }
                setActivePane("docs");
              }}
              {...dataIt("menuDocs")}
            >
              <File />
            </MenuItem>
          </Tooltip>
        )}
        {!excludePanes.includes("diff") && (
          <Tooltip title="Compare versions" position="right-center">
            <MenuItem
              className={activePane === "diff" ? "active" : ""}
              onClick={() => setActivePane("diff")}
              {...dataIt("menuDiff")}
            >
              <Filter />
            </MenuItem>
          </Tooltip>
        )}

        {!disableExport && (
          <DropdownMenu
            actionType="icon"
            dropdownPosition="right-bottom"
            menuItems={exportActions}
            distanceX="10px"
          >
            <Tooltip title="Export schema" position="right-center">
              <MenuItem {...dataIt("menuExport")} data-tour="export">
                <ArrowNarrowUpMove />
              </MenuItem>
            </Tooltip>
          </DropdownMenu>
        )}
        {!readOnly && !disableImport && (
          <Tooltip title="Import schema" position="right-center">
            <MenuItem
              {...dataIt("menuImport")}
              onClick={() => setImportOpen(true)}
              data-tour="import"
            >
              <ArrowNarrowBottomAlignment />
            </MenuItem>
          </Tooltip>
        )}
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
            source: "outside",
          });
        }}
      />
    </>
  );
};
