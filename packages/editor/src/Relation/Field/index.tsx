import React, { useState } from 'react';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';
import { Arrow } from '@/editor/icons';

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE}px;
  margin-right: 30px;
  white-space: nowrap;
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
  active?: boolean;
  isPrimitive?: boolean;
  showArgs?: boolean;
};

export const Field: React.FC<FieldProps> = ({ node, active, showArgs }) => {
  const { parentTypes, selectFieldParent } = useTreesState();
  const [expandedArgs, setExpandedArgs] = useState(false);

  return (
    <Main isActive={active}>
      {!!node.args.length && (
        <OpenFields
          expanded={expandedArgs}
          onClick={() => setExpandedArgs(!expandedArgs)}
        >
          <Arrow size={14} />
        </OpenFields>
      )}
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
          onClick={() => {
            active && selectFieldParent(node);
          }}
          type={node.type}
          parentTypes={parentTypes}
        />
      </Type>
    </Main>
  );
};

const OpenFields = styled.div<{ expanded?: boolean }>`
  position: absolute;
  left: -1rem;
  transform: translate(-100%);
  svg {
    rotate: ${({ expanded }) => (expanded ? '0' : '-90deg')};
  }
`;
