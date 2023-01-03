import React, { useState } from 'react';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { RELATION_CONSTANTS } from '@/Relation/Lines/constants';
import { NodeChangeFieldTypeMenu } from '@/shared/components/ContextMenu';
import { TypeSystemDefinition, ValueDefinition } from 'graphql-js-tree';
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

type FieldProps = Pick<
  GrafFieldProps,
  'node' | 'parentNodeTypeName' | 'parentNode'
> & {
  active?: boolean;
  isPrimitive?: boolean;
  showArgs?: boolean;
  readOnly?: boolean;
  index: number;
};

export const Field: React.FC<FieldProps> = ({
  node,
  active,
  showArgs,
  readOnly,
  index,
  parentNode,
}) => {
  console.log(node.name, active);
  const { parentTypes, updateNode } = useTreesState();
  const [menuOpen, setMenuOpen] = useState<'type' | 'options'>();
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  return (
    <Main isActive={active}>
      <Name>
        <ActiveFieldName
          active={active}
          afterChange={
            readOnly
              ? undefined
              : (newName) => {
                  node.name = newName;
                  updateNode(node);
                }
          }
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
        {!isEnumValue && (
          <ActiveType
            onClick={
              !readOnly
                ? () => setMenuOpen(menuOpen === 'type' ? undefined : 'type')
                : undefined
            }
            type={node.type}
            parentTypes={parentTypes}
          />
        )}
        {active && menuOpen === 'type' && (
          <TypeMenuContainer>
            <NodeChangeFieldTypeMenu
              node={parentNode}
              fieldIndex={index}
              hideMenu={() => {
                setMenuOpen(undefined);
              }}
            />
          </TypeMenuContainer>
        )}
      </Type>
    </Main>
  );
};

const TypeMenuContainer = styled.div`
  position: fixed;
  z-index: 2;
`;
