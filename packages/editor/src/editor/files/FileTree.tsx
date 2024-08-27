import { SingleFile } from "@/editor/files/SingleFile";
import { Dir, ForFileTree } from "@/editor/files/types";
import { Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useMemo, useCallback } from "react";

export interface FTree {
  dir: string;
  isFolder?: boolean;
}

interface DirComponentProps extends ForFileTree {
  dirs: Dir[];
  level?: number;
  onDrop: (source: string, target: string) => void;
}

const DirComponent: React.FC<DirComponentProps> = ({
  dirs,
  level = 0,
  onDrop,
  ...rest
}) => {
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
      {dirs.map((d) => {
        if (d.isFolder) {
          return (
            <React.Fragment key={d.name}>
              <SingleFile {...rest} d={d} level={level} onDrop={handleDrop} />
              <DirComponent
                {...rest}
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

  console.log({ trees });

  return (
    <Main direction="column">
      <Typography
        color="accentL1"
        variant="Body 3 SB"
        css={{ paddingBottom: "0.5rem" }}
      >
        Schemas
      </Typography>
      <DirComponent
        onRename={(d, n) => onRename({ dir: d.fromDir }, { dir: n })}
        onCopy={(d) => onCopy({ dir: d.fromDir })}
        onPaste={(d) => onPaste({ dir: d.fromDir })}
        onDelete={(d) => onDelete({ dir: d.fromDir })}
        current={current}
        onAdd={(d) => onAdd({ dir: d.fromDir })}
        onClick={(d) => onClick({ dir: d.fromDir })}
        dirs={trees}
        onDrop={handleDrop}
        copiedFile={copiedFile}
      />
    </Main>
  );
};

const Main = styled(Stack)`
  background: ${(p) => p.theme.neutrals.L7};
  width: 20rem;
  padding: 0.5rem;
  border-right: 1px solid ${(p) => p.theme.divider.main};
`;
