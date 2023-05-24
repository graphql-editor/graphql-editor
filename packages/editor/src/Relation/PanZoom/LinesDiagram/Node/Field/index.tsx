import React from 'react';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import styled from '@emotion/styled';
import { TypeSystemDefinition } from 'graphql-js-tree';
import { RELATION_CONSTANTS } from '@/Relation/PanZoom/LinesDiagram/Lines/constants';
import { ActiveFieldName } from '@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveFieldName';
import { ActiveType } from '@/Relation/PanZoom/LinesDiagram/Node/Field/ActiveType';
import { DOMClassNames } from '@/shared/hooks/DOMClassNames';

const Main = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: ${RELATION_CONSTANTS.FIELD_HEIGHT}px;
  padding: 0 12px;
  color: ${({ theme }) => theme.text.disabled};
  margin: 0 -12px;
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.neutral[500]};
  }
`;

type FieldProps = Pick<GrafFieldProps, 'node'> & {
  showArgs?: boolean;
};

export const Field: React.FC<FieldProps> = ({ node }) => {
  const { parentTypes, setSelectedNodeId, getParentOfField } = useTreesState();
  return (
    <Main
      className={DOMClassNames.nodeField}
      onClick={(e) => {
        const parent = getParentOfField(node);
        if (parent) {
          e.stopPropagation();
          setSelectedNodeId({
            source: 'relation',
            value: {
              id: parent.id,
              name: parent.name,
            },
          });
        }
      }}
    >
      <ActiveFieldName
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
