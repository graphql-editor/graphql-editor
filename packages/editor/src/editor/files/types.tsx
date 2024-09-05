export interface ForFileTree {
  current?: string;
  copiedFile?: string;
  onClick: (d: Dir) => void;
  onDelete: (d: Dir) => void;
  onRename: (d: Dir, newName: string) => void;
  onCopy: (d: Dir) => void;
  onPaste: (d: Dir) => void;
  onAdd: (d: Dir) => void;
}

export interface Dir {
  name: string;
  children?: Dir[];
  fromDir: string;
  isFolder?: boolean;
  modified: boolean;
}
