import { SingleFile } from "@/editor/files/SingleFile";
import { Dir, ForFileTree } from "@/editor/files/types";
import { Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useMemo, useCallback, useState } from "react";

export interface FTree {
  dir: string;
  isFolder?: boolean;
}

interface DirComponentProps extends ForFileTree {
  dirs: Dir[];
  level?: number;
  expanded?: boolean;
  onDrop: (source: string, target: string) => void;
}

const DirComponent: React.FC<DirComponentProps> = ({
  dirs,
  level = 0,
  onDrop,
  expanded,
  ...rest
}) => {
  const [childrenExpanded, setChildrenExpanded] = useState<string[]>([]);
  const handleDrop = useCallback(
    (source: string, target: string) => {
      // prevent root from being moved
      if (source === target || source.split("/").length === 1) {
        return;
      }

      onDrop(source, target);
    },
    [onDrop]
  );

  return (
    <>
      {expanded &&
        dirs.map((d) => {
          if (d.isFolder) {
            return (
              <React.Fragment key={d.name}>
                <SingleFile
                  {...rest}
                  d={d}
                  level={level}
                  onDrop={handleDrop}
                  onClick={() => {
                    setChildrenExpanded((c) =>
                      c.includes(d.fromDir)
                        ? c.filter((cc) => cc !== d.fromDir)
                        : [...c, d.fromDir]
                    );
                  }}
                />
                <DirComponent
                  {...rest}
                  expanded={childrenExpanded.includes(d.fromDir)}
                  level={level + 1}
                  dirs={d.children || []}
                  onDrop={handleDrop}
                />
              </React.Fragment>
            );
          } else {
            return (
              <SingleFile
                key={d.fromDir}
                {...rest}
                d={d}
                level={level}
                onDrop={handleDrop}
              />
            );
          }
        })}
    </>
  );
};

export const FileTree: React.FC<{
  schemas: FTree[];
  onClick: (t: FTree) => void;
  onCopy: (t: FTree) => void;
  onPaste: (t: FTree) => void;
  onDelete: (t: FTree) => void;
  onAdd: (t: FTree) => void;
  onRename: (oldTree: FTree, newTree: FTree) => void;
  onMove: (source: FTree, target: FTree) => void;
  current: string;
  copiedFile: string;
}> = ({
  schemas,
  onClick,
  current,
  onDelete,
  onRename,
  onCopy,
  onPaste,
  onAdd,
  onMove,
  copiedFile,
}) => {
  const trees = useMemo(() => {
    const result: Dir[] = [];
    const level: Record<string, any> = { result };
    schemas.forEach(({ dir, isFolder }) => {
      dir.split("/").reduce(
        ([r, acc], name, i, a) => {
          const accumlatedPath = `${acc ? acc + "/" : ""}${name}`;
          if (!r[name]) {
            r[name] = { result: [] };
            r.result.push({
              name,
              children: r[name].result,
              isFolder,
              fromDir: accumlatedPath,
            });
          }
          return [r[name], accumlatedPath] as [Record<string, any>, string];
        },
        [level, ""] as [Record<string, any>, string]
      );
    });
    return result;
  }, [schemas]);

  const handleDrop = useCallback(
    (source: string, target: string) => {
      onMove({ dir: source }, { dir: target });
    },
    [onMove]
  );

  return (
    <Main direction="column">
      <SchemasLabel color="accentL1" variant="Body 3 SB">
        Schemas
      </SchemasLabel>
      <DirComponent
        onRename={(d, n) => onRename({ dir: d.fromDir }, { dir: n })}
        onCopy={(d) => onCopy({ dir: d.fromDir })}
        onPaste={(d) => onPaste({ dir: d.fromDir })}
        onDelete={(d) => onDelete({ dir: d.fromDir })}
        current={current}
        onAdd={(d) => onAdd({ dir: d.fromDir })}
        onClick={(d) => onClick({ dir: d.fromDir })}
        expanded
        dirs={trees}
        onDrop={handleDrop}
        copiedFile={copiedFile}
      />
    </Main>
  );
};

const SchemasLabel = styled(Typography)`
  background: ${(p) => p.theme.neutrals.L7};
  position: sticky;
  top: 0;
  padding-block: 0.5rem;
  z-index: 2;
`;

const Main = styled(Stack)`
  background: ${(p) => p.theme.neutrals.L7};
  width: 20rem;
  padding: 0 0.5rem;
  border-right: 1px solid ${(p) => p.theme.divider.main};
  overflow-y: auto;
`;
