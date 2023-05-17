import React from 'react';
import { fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useRelationNodesState, useRelationsState } from '@/state/containers';
import styled from '@emotion/styled';
import * as vars from '@/vars';
import { TopBar } from '@/shared/components/TopBar';
import { useControls } from 'react-zoom-pan-pinch';
import { NewNode } from '@/shared/components/NewNode';
import {
  Checkbox,
  ImageSquareCheck,
  Minus,
  Plus,
  Button,
  EyeAlt,
} from '@aexol-studio/styling-system';
import { DOMClassNames } from '@/Relation/shared/DOMClassNames';
export const ControlsBar: React.FC<{
  downloadPng: () => void;
  className: 'all' | 'focused';
}> = ({ downloadPng, className }) => {
  const { readonly } = useTreesState();
  const { exitFocus, focusMode } = useRelationNodesState();

  const { zoomIn, zoomOut } = useControls();
  const {
    setBaseTypesOn,
    baseTypesOn,
    fieldsOn,
    setFieldsOn,
    inputsOn,
    setInputsOn,
  } = useRelationsState();

  const step = 0.2;
  return (
    <TopBar>
      <Menu>
        {focusMode && (
          <Button
            size="small"
            onClick={() => exitFocus()}
            endAdornment={<EyeAlt />}
          >
            Exit focus
          </Button>
        )}
        {!readonly && !focusMode && <NewNode />}
        <ZoomWrapper>
          <IconWrapper
            data-tooltip="Zoom out"
            onClick={() => {
              zoomOut(step);
            }}
          >
            <Minus />
          </IconWrapper>
          <TooltippedZoom data-tooltip="Ctrl/Cmd + Scroll to zoom in/out">
            <span className={`${DOMClassNames.topBarZoom} ${className}`}></span>
          </TooltippedZoom>
          <IconWrapper
            data-tooltip="Zoom in"
            onClick={() => {
              zoomIn(step);
            }}
          >
            <Plus />
          </IconWrapper>
        </ZoomWrapper>
        <Checkbox
          label="fields"
          labelPosition="start"
          onChange={() => setFieldsOn(!fieldsOn)}
          checked={fieldsOn}
        />
        <Checkbox
          label="scalars"
          disabled={!fieldsOn}
          labelPosition="start"
          onChange={() => setBaseTypesOn(!baseTypesOn)}
          checked={fieldsOn ? baseTypesOn : false}
        />
        <Checkbox
          label="inputs"
          labelPosition="start"
          onChange={() => setInputsOn(!inputsOn)}
          checked={inputsOn}
        />
        <IconWrapper data-tooltip="Export to png" onClick={() => downloadPng()}>
          <ImageSquareCheck />
        </IconWrapper>
      </Menu>
    </TopBar>
  );
};
const TooltippedZoom = styled.div`
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  width: 4ch;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.default};
  font-family: ${fontFamilySans};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text.default};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.text.disabled};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
  }
`;
const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${fontFamilySans};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text.default};
  }

  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text.default};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.text.disabled};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
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
`;

const Menu = styled.div`
  display: flex;
  font-family: ${fontFamilySans};
  gap: 12px;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;
