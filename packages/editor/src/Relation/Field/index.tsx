import React from 'react';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';
import { TypeSystemDefinition } from 'graphql-js-tree';
import { ActiveFieldName } from '@/Relation/Field/ActiveFieldName';
import { ActiveType } from '@/Relation/Field/ActiveType';

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
      <ActiveType type={node.type} parentTypes={parentTypes} />
    </Main>
  );
};
