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
  RefreshCwAlt3,
  Xmark,
} from "@aexol-studio/styling-system";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";
export const ControlsBar: React.FC<{
  downloadPng: () => void;
  triggerResimulation: () => void;
}> = ({ downloadPng, triggerResimulation }) => {
  const { readonly, exitFocus, focusMode, focusedNode, libraryTree } =
    useTreesState();

  const { zoomIn, zoomOut } = useControls();
  const {
    setBaseTypesOn,
    baseTypesOn,
    fieldsOn,
    setFieldsOn,
    inputsOn,
    setInputsOn,
    ctrlToZoom,
    setCtrlToZoom,
    libraryNodesOn,
    setLibraryNodesOn,
  } = useRelationsState();

  const step = 0.2;
  return (
    <TopBar>
      <Menu>
        {focusMode && (
          <Button
            size="small"
            onClick={() => exitFocus()}
            endAdornment={<Xmark />}
          >
            <SpanFlow>{focusedNode?.name}</SpanFlow>
          </Button>
        )}
        {!readonly && !focusMode && <NewNode />}
        <Checkbox
          label="ctrl/cmd zoom"
          labelPosition="start"
          onChange={() => setCtrlToZoom(!ctrlToZoom)}
          checked={ctrlToZoom}
          wrapperCss={{ fontWeight: 400 }}
        />
        <ZoomWrapper>
          <IconWrapper
            onClick={() => {
              zoomOut(step);
            }}
          >
            <Minus />
          </IconWrapper>
          <TooltippedZoom>
            <span className={`${DOMClassNames.topBarZoom}`}>100%</span>
          </TooltippedZoom>
          <IconWrapper
            onClick={() => {
              zoomIn(step);
            }}
          >
            <Plus />
          </IconWrapper>
        </ZoomWrapper>
        {!!libraryTree.nodes.length && (
          <Checkbox
            label="library nodes"
            labelPosition="start"
            onChange={() => setLibraryNodesOn(!libraryNodesOn)}
            checked={libraryNodesOn}
            wrapperCss={{ fontWeight: 400 }}
          />
        )}
        <Checkbox
          label="fields"
          labelPosition="start"
          onChange={() => setFieldsOn(!fieldsOn)}
          checked={fieldsOn}
          wrapperCss={{ fontWeight: 400 }}
        />
        <Checkbox
          label="scalars"
          disabled={!fieldsOn}
          labelPosition="start"
          onChange={() => setBaseTypesOn(!baseTypesOn)}
          checked={fieldsOn ? baseTypesOn : false}
          wrapperCss={{ fontWeight: 400 }}
        />
        <Checkbox
          label="inputs"
          labelPosition="start"
          onChange={() => setInputsOn(!inputsOn)}
          checked={inputsOn}
          wrapperCss={{ fontWeight: 400 }}
        />
        <Tooltip title="Export to png" position="left-bottom">
          <IconWrapper onClick={() => downloadPng()}>
            <ImageSquareCheck />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Shuffle layout" position="left-bottom">
          <IconWrapper
            onClick={() => {
              triggerResimulation();
            }}
          >
            <RefreshCwAlt3 />
          </IconWrapper>
        </Tooltip>
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
const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text.default};
  }
`;

const ZoomWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.275rem 0.75rem;
  background-color: ${({ theme }) => theme.neutral[700]};
  border-color: ${({ theme }) => theme.neutral[200]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${(p) => p.theme.radius}px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;

const Menu = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.fontFamilySans};
  gap: 12px;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;
