import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  ContextMenu,
  NodeDirectiveOptionsMenu,
} from "@/shared/components/ContextMenu";
import { ParserField } from "graphql-js-tree";
import { transition } from "@/vars";

interface NodeDirectiveProps {
  onDelete: () => void;
  isLocked?: boolean;
  children?: React.ReactNode;
}

const NodeDirectiveBlock = styled.div<{ isLocked?: boolean }>`
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.directive};
  font-size: 12px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  position: relative;
  transition: ${transition};
  cursor: pointer;
  border: 1px solid currentColor;
  &:hover {
    border: 1px ${({ isLocked }) => (isLocked ? "solid" : "dashed")}
      currentColor;
  }
`;

export const DirectivePlacement: React.FC<NodeDirectiveProps> = ({
  onDelete,
  children,
  isLocked,
}) => {
  return (
    <NodeDirectiveBlock
      onClick={(e) => {
        if (isLocked) {
          return;
        }
        e.stopPropagation();
        onDelete();
      }}
    >
      {children}
    </NodeDirectiveBlock>
  );
};

interface CreateNodeDirectiveProps {
  isLocked?: boolean;
  node: ParserField;
}
const CreateDirectiveBlock = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.text.default};
  border-radius: ${(p) => p.theme.border.primary.radius};
  position: relative;
  cursor: pointer;
  border: 1px dashed currentColor;
  transition: ${transition};
  svg {
    fill: ${({ theme }) => theme.colors.directive};
  }
  :hover {
    color: ${({ theme }) => theme.colors.directive};
  }
`;

export const CreateNodeDirective: React.FC<CreateNodeDirectiveProps> = ({
  node,
  isLocked,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <ContextMenu
      isOpen={menuOpen}
      close={() => setMenuOpen(false)}
      Trigger={({ triggerProps }) => (
        <CreateDirectiveBlock
          {...triggerProps}
          onClick={(e) => {
            if (isLocked) {
              return;
            }
            e.stopPropagation();
            setMenuOpen(true);
          }}
        >
          Add placement
        </CreateDirectiveBlock>
      )}
    >
      {({ layerProps }) => {
        return (
          <NodeDirectiveOptionsMenu
            {...layerProps}
            node={node}
            hideMenu={() => setMenuOpen(false)}
          />
        );
      }}
    </ContextMenu>
  );
};
