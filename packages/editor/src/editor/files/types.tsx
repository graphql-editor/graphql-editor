export interface ForFileTree {
  current?: string;
  onClick: (d: Dir) => void;
  onDelete: (d: Dir) => void;
  onRename: (d: Dir, newName: string) => void;
  onCopy: (d: Dir) => void;
  onAdd: (d: Dir) => void;
}

export interface Dir {
  name: string;
  children?: Dir[];
  fromDir: string;
}
