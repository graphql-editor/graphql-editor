import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { ExtendNodeMenu } from '@/Graf/Node/ContextMenu';
import { Plus } from '@/Graf/icons';
import styled from '@emotion/styled';
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
  margin: 0 20px 25px 0;
  color: ${({ theme }) => theme.colors.Extend};
`;

const NodeName = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 20px;
`;

const ExtendButton = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.Extend};
  height: 36px;
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ExtendButtonTitle = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

const ExtendMenuContainer = styled.div`
  position: absolute;
  top: 30px;
  right: -70px;
`;

const PlusButton = styled.span`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  color: ${({ theme }) => theme.text};
  width: 20px;
  height: 20px;
  border-radius: 10px;
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
            <ExtendButtonTitle>Extend node</ExtendButtonTitle>
            <PlusButton>
              <Plus width={10} height={10} />
            </PlusButton>
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
