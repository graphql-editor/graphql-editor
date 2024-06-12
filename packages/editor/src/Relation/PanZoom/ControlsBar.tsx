import React from "react";
import { useTreesState } from "@/state/containers/trees";
import { useRelationsState } from "@/state/containers";
import styled from "@emotion/styled";
import * as vars from "@/vars";
import { TopBar } from "@/shared/components/TopBar";
import { useControls } from "react-zoom-pan-pinch";
import { NewNode } from "@/shared/components/NewNode";
import {
  Checkbox,
  ImageSquareCheck,
  Minus,
  Plus,
  Button,
  Tooltip,
  Xmark,
  CodeFork,
  Stack,
} from "@aexol-studio/styling-system";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
import { FilterNodes } from "@/shared/components/FilterNodes";
import { dataIt } from "@/Models/dataIds";
export const ControlsBar: React.FC<{
  downloadPng: () => void;
  triggerResimulation: () => void;
  title?: React.ReactNode;
}> = ({ downloadPng, title }) => {
  const { readonly, exitFocus, focusMode, focusedNode, libraryTree } =
    useTreesState();

  const { zoomIn, zoomOut } = useControls();
  const { fieldsOn, setFieldsOn, libraryNodesOn, setLibraryNodesOn } =
    useRelationsState();

  const step = 0.2;
  return (
    <TopBar>
      <Menu>
        <Stack align="center" gap={"1rem"}>
          {focusMode && (
            <Button
              {...dataIt("defocus")}
              size="small"
              onClick={() => exitFocus()}
              endAdornment={<Xmark />}
            >
              <SpanFlow>{focusedNode?.name}</SpanFlow>
            </Button>
          )}
          {!readonly && !focusMode && <NewNode />}
          {title}
        </Stack>
        <Stack align="center" gap={"1rem"}>
          {!!libraryTree.nodes.length && (
            <Checkbox
              {...dataIt("libraryNodes")}
              label="library nodes"
              labelPosition="start"
              onChange={() => setLibraryNodesOn(!libraryNodesOn)}
              checked={libraryNodesOn}
              wrapperCss={{ fontWeight: 300 }}
            />
          )}
          <FilterNodes />
          <Tooltip title="Relations only" position="left-bottom">
            <IconWrapper
              {...dataIt("relationsOnly")}
              active={!fieldsOn}
              onClick={() => {
                setFieldsOn(!fieldsOn);
              }}
            >
              <CodeFork />
            </IconWrapper>
          </Tooltip>
          <Tooltip title="Export to png" position="left-bottom">
            <IconWrapper {...dataIt("export")} onClick={() => downloadPng()}>
              <ImageSquareCheck />
            </IconWrapper>
          </Tooltip>
          <ZoomWrapper>
            <IconWrapper
              onClick={() => {
                zoomOut(step);
              }}
            >
              <Minus />
            </IconWrapper>
            <Tooltip
              position="left-bottom"
              title="Click ctrl/cmd + scroll mouse to zoom"
            >
              <TooltippedZoom {...dataIt("zoom")}>
                <span className={`${DOMClassNames.topBarZoom}`}>100%</span>
              </TooltippedZoom>
            </Tooltip>
            <IconWrapper
              onClick={() => {
                zoomIn(step);
              }}
            >
              <Plus />
            </IconWrapper>
          </ZoomWrapper>
        </Stack>
      </Menu>
    </TopBar>
  );
};

const SpanFlow = styled.span`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-transform: none;
`;
const TooltippedZoom = styled.div`
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  width: 4ch;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.default};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconWrapper = styled.div<{ active?: boolean }>`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme, active }) =>
    active ? theme.text.active : theme.text.disabled};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text.active};
  }
`;

const ZoomWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.275rem 0.75rem;
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-color: ${({ theme }) => theme.neutrals.L2};
  border-style: solid;
  border-width: 1px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  gap: 8px;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;

const Menu = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.fontFamilySans};
  gap: 1rem;
  align-items: center;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;
