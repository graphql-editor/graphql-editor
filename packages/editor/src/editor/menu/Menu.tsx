import React, { useState } from "react";
import styled from "@emotion/styled";
import { fontFamilySans, transition } from "@/vars";
import {
  Tool,
  Code,
  File,
  Filter,
  ArrowNarrowUpMove,
  ArrowNarrowBottomAlignment,
  DropdownMenu,
  MenuItem,
  Tooltip,
} from "@aexol-studio/styling-system";
import { PassedSchema } from "@/Models";
import { ImportSchema } from "@/shared/dialogs/ImportSchema";
import { useFileOperations } from "@/editor/menu/Tools/FileOperations";

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
    isDisabled ? theme.text.disabled : theme.text.default};
  padding: 1rem;
  font-family: ${fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.25s ease;
  overflow: visible;
  user-select: none;
  background-color: ${({ theme }) => theme.neutral[500]};
  border-bottom: ${(p) => p.theme.black} 1px solid;

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      !isDisabled && theme.neutral[500]};
    color: ${({ isDisabled, theme }) =>
      isDisabled ? theme.text.disabled : theme.accents[200]};
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
  &.toggle-active {
    color: ${({ theme }) => theme.accents[100]};
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
  activePane?: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane?: ActivePane) => void;
  schema: string;
  libraries?: string;
  readOnly?: boolean;
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
  readOnly,
  excludePanes = [],
}: MenuProps) => {
  const [importOpen, setImportOpen] = useState(false);
  const { saveToFile } = useFileOperations();
  const exportActions: MenuItem[] = [
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
      <Sidebar>
        <Tooltip title="Toggle Code" position="right-bottom">
          <MenuItem
            className={toggleCode ? "toggle-active" : ""}
            onClick={() => {
              if (!activePane || activePane === "diff") return;
              setToggleCode(!toggleCode);
            }}
            isDisabled={activePane === "diff"}
            data-tour="toggle-code"
          >
            <Code />
          </MenuItem>
        </Tooltip>
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
              data-tour="relation"
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
              data-tour="documentation"
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
              data-tour="diff"
            >
              <Filter />
            </MenuItem>
          </Tooltip>
        )}

        <DropdownMenu
          actionType="icon"
          dropdownPosition="right-bottom"
          menuItems={exportActions}
          distanceX="10px"
        >
          <Tooltip title="Export schema" position="right-center">
            <MenuItem data-tour="export">
              <ArrowNarrowUpMove />
            </MenuItem>
          </Tooltip>
        </DropdownMenu>
        {!readOnly && (
          <Tooltip title="Import schema" position="right-center">
            <MenuItem onClick={() => setImportOpen(true)} data-tour="import">
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
