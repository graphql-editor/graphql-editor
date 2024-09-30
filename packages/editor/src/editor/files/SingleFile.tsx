import { Entry, EntryText, EntryInput } from "@/editor/files/Entry";
import { Dir, ForFileTree } from "@/editor/files/types";
import { useOutsideClick } from "@aexol-studio/hooks";
import {
  DiagramProject,
  DropdownMenu,
  File,
  Folder,
} from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useMemo, useRef, useState } from "react";

export interface FTree {
  dir: string;
}

export interface SingleFileProps extends ForFileTree {
  d: Dir;
  level?: number;
  onDrop: (source: string, target: string) => void;
  isOpenDropdownDir?: string;
  setIsOpenDropdownDir: (dir: string) => void;
}

export const SingleFile: React.FC<SingleFileProps> = ({
  d,
  level = 0,
  onDrop,
  isOpenDropdownDir,
  setIsOpenDropdownDir,
  ...rest
}) => {
  const [isRenaming, setIsRenaming] = useState({
    renaming: false,
    newName: "",
  });
  const currentInputRef = useRef<HTMLInputElement>(null);

  useOutsideClick(currentInputRef, () => {
    if (isRenaming) rest.onRename(d, isRenaming.newName);
    setIsRenaming({
      renaming: false,
      newName: "",
    });
  });

  const isActive = useMemo(() => {
    if (rest.current?.startsWith(d.fromDir)) {
      return true;
    }
    return false;
  }, [d, rest.current]);

  const menuItems = useMemo(() => {
    const baseItems = [
      {
        name: "Delete",
        onClick: () => rest.onDelete(d),
      },
      {
        name: "Rename",
        onClick: () =>
          setIsRenaming({
            newName: d.name,
            renaming: true,
          }),
      },
      {
        name: "Copy",
        onClick: () => rest.onCopy(d),
      },
    ];

    if (rest.copiedFile && d.isFolder) {
      baseItems.push({
        name: "Paste",
        onClick: () => rest.onPaste(d),
      });
    }

    if (d.isFolder) {
      baseItems.push({
        name: "Add new schema in folder",
        onClick: () => {
          const schemaName = "untitled-" + d.children?.length + ".graphql";
          rest.onAdd({
            fromDir: d.fromDir + "/" + schemaName,
            name: schemaName,
            modified: true,
          });
        },
      });
    }

    return baseItems;
  }, [rest.onCopy, rest.onDelete, d, rest.copiedFile]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", d.fromDir);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceDir = e.dataTransfer.getData("text/plain");
    onDrop(sourceDir, d.fromDir);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      rest.onRename(d, isRenaming.newName);
      setIsRenaming({
        renaming: false,
        newName: "",
      });
    } else if (e.key === "Escape") {
      setIsRenaming({
        renaming: false,
        newName: "",
      });
    }
  };

  return (
    <DropdownMenu
      open={isOpenDropdownDir === d.fromDir}
      onChange={(e) =>
        e ? undefined : setIsOpenDropdownDir(e ? d.fromDir : "")
      }
      menuItems={menuItems}
      actionType="icon"
      dropdownPosition="right-bottom"
    >
      <Entry
        isActive={isActive}
        onClick={(e) => {
          if (e.button === 0) {
            rest.onClick(d);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpenDropdownDir(d.fromDir);
        }}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        draggable
        leftLevel={level}
      >
        {!d.isFolder && <FileIconComponent fileName={d.fromDir} />}
        {!!d.isFolder && <Folder />}
        {!isRenaming.renaming && <EntryText>{d.name}</EntryText>}
        {isRenaming.renaming && (
          <EntryInput
            autoFocus
            ref={currentInputRef}
            value={isRenaming.newName}
            onChange={(e) =>
              setIsRenaming((isr) => ({
                ...isr,
                newName: e.target.value,
              }))
            }
            onKeyDown={handleKeyDown}
          />
        )}
      </Entry>
    </DropdownMenu>
  );
};

const FileIconComponent = ({ fileName }: { fileName: string }) => {
  if (fileName.endsWith(".graphql") || fileName.endsWith(".gql")) {
    return (
      <ColoredIcon>
        <DiagramProject />
      </ColoredIcon>
    );
  }
  return <File />;
};

const ColoredIcon = styled.div`
  display: contents;
  color: ${(p) => p.theme.additionals.addP[2]};
`;
