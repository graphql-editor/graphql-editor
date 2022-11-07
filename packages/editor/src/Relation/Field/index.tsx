import React, { useState } from 'react';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE}px;
  margin-right: 30px;
  white-space: nowrap;
  min-width: 30px;
`;

const Main = styled.div<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${RELATION_CONSTANTS.FIELD_HEIGHT}px;
  padding: 0 12px;
  color: ${({ theme }) => theme.dimmed};
  margin: 0 -12px;
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive && theme.background.mainClose};
  }
`;

const Type = styled.div`
  font-size: ${FIELD_TYPE_SIZE}px;
`;

type FieldProps = Pick<GrafFieldProps, 'node' | 'parentNodeTypeName'> & {
  onClick: () => void;
  active?: boolean;
  isPrimitive?: boolean;
  showArgs?: boolean;
};

export const Field: React.FC<FieldProps> = ({
  node,
  onClick,
  active,
  showArgs,
  isPrimitive,
}) => {
  const { parentTypes } = useTreesState();
  const [drag, setDrag] = useState(false);
  const [t, setT] = useState<ReturnType<typeof setTimeout>>();

  return (
    <Main
      isActive={active}
      onMouseDown={(e) => {
        if (t) clearTimeout(t);
        setDrag(false);
      }}
      onMouseMove={() =>
        setT((oldT) => {
          clearTimeout(oldT);
          return setTimeout(() => setDrag(true), 10);
        })
      }
      onMouseUp={(e) => {
        if (drag) return;
        if (active && !isPrimitive) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      <Name>
        <ActiveFieldName
          data={node.data}
          name={node.name}
          args={showArgs ? node.args : []}
          parentTypes={parentTypes}
        />
      </Name>
      <Type>
        <ActiveType
          onClick={() => {}}
          type={node.type}
          parentTypes={parentTypes}
        />
      </Type>
    </Main>
  );
};
