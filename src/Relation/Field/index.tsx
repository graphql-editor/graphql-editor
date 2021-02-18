import React from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { NodeFieldContainer, Title } from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';

const Name = style({
  fontSize: FIELD_NAME_SIZE,
  marginRight: 4,
  whiteSpace: 'nowrap',
  minWidth: 30,
});
const Type = style({ fontSize: FIELD_TYPE_SIZE, color: Colors.green[0] });

export const Field: React.FC<Pick<
  FieldProps,
  'node' | 'parentNodeTypeName'
>> = ({ node, parentNodeTypeName }) => {
  const { parentTypes } = useTreesState();
  return (
    <NodeFieldContainer className={`NodeType-${parentNodeTypeName}`}>
      <Title>
        <div className={Name}>
          <ActiveFieldName
            data={node.data}
            name={node.name}
            args={node.args}
            parentTypes={parentTypes}
          />
        </div>
        <div className={Type}>
          <ActiveType type={node.type} parentTypes={parentTypes} />
        </div>
      </Title>
      <div className={'NodeFieldPortPlaceholder'} />
    </NodeFieldContainer>
  );
};
