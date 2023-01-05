import React, { useState } from 'react';
import { X } from '@/shared/icons';
import styled from '@emotion/styled';
import { NodeImplementInterfacesMenu } from '@/shared/components/ContextMenu';
import { ParserField } from 'graphql-js-tree';
import { transition } from '@/vars';

interface NodeInterfaceProps {
  onDelete: () => void;
  isLocked?: boolean;
}

const NodeInterfaceBlock = styled.div`
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.interface};
  font-size: 12px;
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
  svg {
    display: none;
    margin-left: 5px;
    fill: ${({ theme }) => theme.error};
  }

  &:hover {
    & > div {
      opacity: 1;
    }

    svg {
      display: inline;
    }
  }
`;

export const NodeInterface: React.FC<NodeInterfaceProps> = ({
  onDelete,
  children,
  isLocked,
}) => {
  return (
    <NodeInterfaceBlock
      onClick={(e) => {
        if (isLocked) {
          return;
        }
        e.stopPropagation();
        onDelete();
      }}
    >
      {children}
      {!isLocked && <X width={12} />}
    </NodeInterfaceBlock>
  );
};

interface CreateNodeInterfaceProps {
  isLocked?: boolean;
  node: ParserField;
}
const CreateNodeInterfaceBlock = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.disabled};
  border-radius: 0.25rem;
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
    <CreateNodeInterfaceBlock
      onClick={(e) => {
        if (isLocked) {
          return;
        }
        e.stopPropagation();
        setMenuOpen(true);
      }}
    >
      Implement interface
      {menuOpen && (
        <NodeMenuContainer>
          <NodeImplementInterfacesMenu
            node={node}
            hideMenu={() => setMenuOpen(false)}
          />
        </NodeMenuContainer>
      )}
    </CreateNodeInterfaceBlock>
  );
};

const NodeMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
  transform: translate(-0.25rem, 0.5rem);
`;
