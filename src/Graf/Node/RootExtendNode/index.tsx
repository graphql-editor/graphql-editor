import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { ExtendNodeMenu } from '@/Graf/Node/ContextMenu';
import styled from '@emotion/styled';
import { transition } from '@/vars';
export interface RootExtendNodeProps {
  node: ParserField;
  filterNodes: string;
  libraryNode?: ParserField;
  readonly?: boolean;
}

const NodeContainer = styled.div`
  margin: 0 25px;
`;

const NodeTopBar = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  margin: 0 20px 20px 0;
  color: ${({ theme }) => theme.colors.Extend};
`;

const NodeName = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
`;

const ExtendButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  position: relative;
  height: 100%;
  transition: ${transition};

  &:hover {
    background-color: ${({ theme }) => theme.background.mainFurthest};
    color: ${({ theme }) => theme.text};
  }

  & > span {
    transition: ${transition};
    color: ${({ theme }) => theme.disabled};

    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const ExtendButtonTitle = styled.span`
  font-size: 12px;
`;

const ExtendMenuContainer = styled.div`
  position: absolute;
  z-index: 5;
  top: 34px;
  right: -70px;
`;

const Plus = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
`;

const NodeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 15px 20px;
`;

export const RootExtendNode: React.FC<RootExtendNodeProps> = ({
  node,
  libraryNode,
  readonly,
  filterNodes,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <NodeContainer ref={thisNode}>
      <NodeTopBar>
        <NodeName>extend</NodeName>
        {!readonly && (
          <ExtendButton
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <Plus>+</Plus>
            <ExtendButtonTitle>Extend node</ExtendButtonTitle>
            {menuOpen && (
              <ExtendMenuContainer>
                <ExtendNodeMenu
                  hideMenu={() => {
                    setMenuOpen(false);
                  }}
                />
              </ExtendMenuContainer>
            )}
          </ExtendButton>
        )}
      </NodeTopBar>
      <NodeBox>
        {node.args?.map((a, i) => {
          return (
            <PaintNode
              isMatchedToSearch={a.name
                .toLowerCase()
                .includes(filterNodes.toLowerCase())}
              key={a.name + i}
              node={a}
            />
          );
        })}
        {libraryNode?.args?.map((a, i) => {
          return (
            <PaintNode
              isMatchedToSearch={a.name
                .toLowerCase()
                .includes(filterNodes.toLowerCase())}
              isLibrary={true}
              key={a.name + i + node.args?.length}
              node={a}
            />
          );
        })}
      </NodeBox>
    </NodeContainer>
  );
};
