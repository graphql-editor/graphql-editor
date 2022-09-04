import React from 'react';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { Title } from '@/Graf/Node/components';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE};
  margin-right: 4px;
  white-space: nowrap;
  min-width: 30px;
`;

const Main = styled.div<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 31px;
  color: ${({ theme }) => theme.backgroundedText};
  margin: 0;
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive && theme.background.mainClose};
  }
`;

const Type = styled.div`
  font-size: ${FIELD_TYPE_SIZE};
`;

type FieldProps = Pick<GrafFieldProps, 'node' | 'parentNodeTypeName'> & {
  onClick: () => void;
  active?: boolean;
  isPrimitive?: boolean;
  showArgs?: boolean;
};

export const Field: React.FC<FieldProps> = ({
  node,
  parentNodeTypeName,
  onClick,
  active,
  showArgs,
  isPrimitive,
}) => {
  const { parentTypes } = useTreesState();
  return (
    <Main
      isActive={active}
      onClick={(e) => {
        if (active && !isPrimitive) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      <Title changeTitle isActive={active}>
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
      </Title>
    </Main>
  );
};
