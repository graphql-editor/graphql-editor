import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  ContextMenu,
  NodeImplementInterfacesMenu,
} from "@/shared/components/ContextMenu";
import { ParserField } from "graphql-js-tree";
import { transition } from "@/vars";
import {
  DetailMenuItem,
  Menu,
  MenuScrollingArea,
} from "@/Graf/Node/components/Menu";
import { dataIt } from "@/Models";

interface NodeInterfaceProps {
  onDelete: () => void;
  onDetach: () => void;
  children?: React.ReactNode;
  isLocked?: boolean;
}

const NodeInterfaceBlock = styled.div<{ isLocked?: boolean }>`
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.interface};
  font-size: 12px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  position: relative;
  cursor: pointer;
  border: 1px solid currentColor;
  &:hover {
    border: 1px ${({ isLocked }) => (isLocked ? "solid" : "dashed")}
      currentColor;
  }
`;

export const NodeInterface: React.FC<NodeInterfaceProps> = ({
  onDelete,
  onDetach,
  children,
  isLocked,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setSelectedIndex] = useState(0);
  return (
    <ContextMenu
      isOpen={menuOpen}
      close={() => setMenuOpen(false)}
      Trigger={({ triggerProps }) => (
        <NodeInterfaceBlock
          {...triggerProps}
          title="Click to remove"
          onClick={(e) => {
            if (isLocked) {
              return;
            }
            e.stopPropagation();
            setMenuOpen(true);
          }}
        >
          {children}
        </NodeInterfaceBlock>
      )}
    >
      {({ layerProps }) => (
        <Menu
          {...layerProps}
          menuName={"Detach interface"}
          onScroll={(e) => e.stopPropagation()}
          hideMenu={() => setMenuOpen(false)}
        >
          <MenuScrollingArea
            controls={{
              arrowDown: () => setSelectedIndex((s) => (s + 1) % 2),
              arrowUp: () => setSelectedIndex((s) => (s - 1) % 2),
            }}
          >
            <DetailMenuItem onClick={onDetach}>Detach interface</DetailMenuItem>
            <DetailMenuItem onClick={onDelete}>
              Detach interface and remove fields
            </DetailMenuItem>
          </MenuScrollingArea>
        </Menu>
      )}
    </ContextMenu>
  );
};

interface CreateNodeInterfaceProps {
  isLocked?: boolean;
  node: ParserField;
}
const CreateNodeInterfaceBlock = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.text.default};
  border-radius: ${(p) => p.theme.radius}px;
  position: relative;
  cursor: pointer;
  border: 1px dashed currentColor;
  transition: ${transition};
  svg {
    fill: ${({ theme }) => theme.colors.interface};
  }
  :hover {
    color: ${({ theme }) => theme.colors.interface};
  }
`;

export const CreateNodeInterface: React.FC<CreateNodeInterfaceProps> = ({
  node,
  isLocked,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <ContextMenu
      isOpen={menuOpen}
      close={() => setMenuOpen(false)}
      Trigger={({ triggerProps }) => (
        <CreateNodeInterfaceBlock
          {...dataIt("implementInterface")}
          {...triggerProps}
          onClick={(e) => {
            if (isLocked) {
              return;
            }
            e.stopPropagation();
            setMenuOpen(true);
          }}
        >
          Implement interface
        </CreateNodeInterfaceBlock>
      )}
    >
      {({ layerProps }) => (
        <NodeImplementInterfacesMenu
          {...layerProps}
          node={node}
          hideMenu={() => setMenuOpen(false)}
        />
      )}
    </ContextMenu>
  );
};
