import { Entry, EntryText, EntryInput } from "@/editor/files/Entry";
import { ForFileTree } from "@/editor/files/types";
import { useOutsideClick } from "@aexol-studio/hooks";
import { DropdownMenu, File, Folder } from "@aexol-studio/styling-system";
import React, { useMemo, useRef, useState } from "react";

export interface FTree {
  dir: string;
}

interface Dir {
  name: string;
  children?: Dir[];
  fromDir: string;
}
export interface SingleFileProps extends ForFileTree {
  d: Dir;
  level?: number;
}

export const SingleFile: React.FC<SingleFileProps> = ({
  d,
  level = 0,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
        name: "Copy",
        onClick: () => rest.onCopy(d),
      },
      {
        name: "Rename",
        onClick: () =>
          setIsRenaming({
            newName: d.name,
            renaming: true,
          }),
      },
    ];
    if (d.children) {
      baseItems.push({
        name: "Add new schema in folder",
        onClick: () => {
          const schemaName = "untitled-" + d.children?.length + ".graphql";
          rest.onAdd({
            fromDir: d.fromDir + "/" + schemaName,
            name: schemaName,
          });
        },
      });
    }
    return baseItems;
  }, [rest.onCopy, rest.onDelete, d]);

  return (
    <DropdownMenu
      open={isOpen}
      onChange={(e) => (e ? undefined : setIsOpen(e))}
      menuItems={menuItems}
      actionType="icon"
    >
      <Entry
        isActive={isActive}
        onClick={(e) => {
          if (e.button === 0 && !d.children?.length) {
            rest.onClick(d);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        leftLevel={level}
      >
        {!d.children?.length && <File />}
        {!!d.children?.length && <Folder />}
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
          />
        )}
      </Entry>
    </DropdownMenu>
  );
};
