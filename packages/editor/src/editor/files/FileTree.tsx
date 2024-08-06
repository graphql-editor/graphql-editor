import { File, Folder, Stack, Typography } from "@aexol-studio/styling-system";
import styled from "@emotion/styled";
import React, { useMemo } from "react";

export interface FTree {
  dir: string;
}

interface Dir {
  name: string;
  children?: Dir[];
  fromDir: string;
}

const DirComponent: React.FC<{
  dirs: Dir[];
  level?: number;
  current?: string;
  onClick: (d: Dir) => void;
}> = ({ dirs, onClick, current, level = 0 }) => {
  return (
    <>
      {dirs.map((d) => {
        if (d.children?.length) {
          return (
            <React.Fragment key={d.name}>
              <Entry leftLevel={level}>
                <Folder />
                <EntryText>{d.name}</EntryText>
              </Entry>
              <DirComponent
                current={current}
                onClick={onClick}
                level={level + 1}
                dirs={d.children}
              />
            </React.Fragment>
          );
        } else {
          return (
            <Entry
              isActive={current === d.fromDir}
              onClick={() => {
                onClick(d);
              }}
              leftLevel={level}
              key={d.name}
            >
              <File />
              <EntryText>{d.name}</EntryText>
            </Entry>
          );
        }
      })}
    </>
  );
};

export const FileTree: React.FC<{
  schemas: FTree[];
  onClick: (t: FTree) => void;
  current: string;
}> = ({ schemas, onClick, current }) => {
  const trees = useMemo(() => {
    const result: Dir[] = [];
    const level: Record<string, any> = { result };
    schemas.forEach(({ dir }) => {
      dir.split("/").reduce((r, name, i, a) => {
        if (!r[name]) {
          r[name] = { result: [] };
          r.result.push({
            name,
            children: r[name].result,
            fromDir: dir,
          });
        }
        return r[name];
      }, level);
    });
    console.log({ level });
    return result;
  }, [schemas]);
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
        current={current}
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

const Entry = styled(Stack)<{ isActive?: boolean; leftLevel?: number }>`
  padding: 0.25rem 0.25rem;
  color: ${(p) => p.theme.accent.L1};
  cursor: pointer;
  padding-left: ${(p) => (p.leftLevel || 0) * 0.5}rem;
  svg {
    height: 0.75rem;
  }
  background-color: transparent;
  color: ${(p) => (p.isActive ? p.theme.text.active : p.theme.text.default)};
  :hover {
    background-color: ${(p) => p.theme.accent.L3}22;
    span {
      color: ${(p) => p.theme.accent.L2};
    }
  }
`;

const EntryText = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  color: currentColor;
`;
