import { SingleFile } from "@/editor/files/SingleFile";
import { Dir, ForFileTree } from "@/editor/files/types";
import { Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useMemo } from "react";

export interface FTree {
  dir: string;
}
interface DirComponentProps extends ForFileTree {
  dirs: Dir[];
  level?: number;
}

const DirComponent: React.FC<DirComponentProps> = ({
  dirs,
  level = 0,
  ...rest
}) => {
  return (
    <>
      {dirs.map((d) => {
        if (d.children?.length) {
          return (
            <React.Fragment key={d.name}>
              <SingleFile {...rest} d={d} level={level} />
              <DirComponent {...rest} level={level + 1} dirs={d.children} />
            </React.Fragment>
          );
        } else {
          return <SingleFile key={d.fromDir} {...rest} d={d} level={level} />;
        }
      })}
    </>
  );
};

export const FileTree: React.FC<{
  schemas: FTree[];
  onClick: (t: FTree) => void;
  onCopy: (t: FTree) => void;
  onDelete: (t: FTree) => void;
  onAdd: (t: FTree) => void;
  onRename: (oldTree: FTree, newTree: FTree) => void;
  current: string;
}> = ({ schemas, onClick, current, onDelete, onRename, onCopy, onAdd }) => {
  const trees = useMemo(() => {
    const result: Dir[] = [];
    const level: Record<string, any> = { result };
    schemas.forEach(({ dir }) => {
      dir.split("/").reduce(
        ([r, acc], name, i, a) => {
          const accumlatedPath = `${acc ? acc + "/" : ""}${name}`;
          if (!r[name]) {
            r[name] = { result: [] };
            r.result.push({
              name,
              children: r[name].result,
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
        onDelete={(d) => onDelete({ dir: d.fromDir })}
        current={current}
        onAdd={(d) => onAdd({ dir: d.fromDir })}
        onClick={(d) => onClick({ dir: d.fromDir })}
        dirs={trees}
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
