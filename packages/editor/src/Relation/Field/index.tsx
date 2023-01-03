import React from 'react';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';
import { TypeSystemDefinition } from 'graphql-js-tree';
import { ActiveType } from '@/Relation/Node/ActiveType';
import { ActiveFieldName } from '@/Relation/Field/ActiveFieldName';

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE}px;
  white-space: nowrap;
`;

const Main = styled.div<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
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
  margin-right: auto;
`;

type FieldProps = Pick<GrafFieldProps, 'node'> & {
  active?: boolean;
  isPrimitive?: boolean;
  showArgs?: boolean;
  readOnly?: boolean;
};

export const Field: React.FC<FieldProps> = ({ node, active, readOnly }) => {
  const { parentTypes } = useTreesState();
  return (
    <Main isActive={active}>
      <Name>
        <ActiveFieldName
          active={active}
          data={node.data}
          name={
            node.data.type !== TypeSystemDefinition.UnionMemberDefinition
              ? node.name
              : ''
          }
          args={node.args}
          parentTypes={parentTypes}
        />
      </Name>
      <Type>
        <ActiveType type={node.type} parentTypes={parentTypes} />
      </Type>
    </Main>
  );
};
