import React from 'react';
import { X } from '@/shared/icons';
import { useTheme } from '@/state/containers';
import styled from '@emotion/styled';

interface NodeInterfaceProps {
  onDelete: () => void;
  isLocked?: boolean;
}

const NodeInterfaceBlock = styled.div`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.backgrounds.interface};
  color: ${({ theme }) => theme.text};
  font-size: 10px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  margin: 5px;

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

const DeleteInterface = styled.div`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  cursor: pointer;
  top: -17px;
  right: 0;
  font-size: 8px;
  width: 200px;
  text-align: right;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: red;
  }
`;

export const NodeInterface: React.FC<NodeInterfaceProps> = ({
  onDelete,
  children,
  isLocked,
}) => {
  const { theme } = useTheme();

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
      {!isLocked && <DeleteInterface>Click to delete</DeleteInterface>}
      <span>
        {children}
        {!isLocked && <X fill={theme.error} />}
      </span>
    </NodeInterfaceBlock>
  );
};
