import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { FIELD_HEIGHT } from '@Graf/constants';
import { PaintFieldName } from './FieldName/PaintFieldName';
import { PaintFieldType } from './FieldType/PaintFieldType';
export interface PaintFieldProps {
  node: ParserField;
  last?: boolean;
  parentNodeTypeName: string;
}

const Main = style({
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  height: FIELD_HEIGHT,
  margin: `0 0`,
  transition: 'background 0.25s ease-in-out',
  $nest: {
    '.NodeFieldPortPlaceholder': {
      width: 24,
      height: 16,
    },
  },
});
const LastField = style({
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
});
const Title = style({
  fontSize: 10,
  display: 'flex',
  flex: 1,
  alignItems: 'baseline',
  overflow: 'hidden',
});
const Name = style({ fontSize: 10, marginRight: 4, overflow: 'hidden' });
const Type = style({ fontSize: 8, color: Colors.green[0] });
export const PaintField: React.FC<PaintFieldProps> = ({ node, last, parentNodeTypeName }) => {
  return (
    <div className={`NodeType-${parentNodeTypeName} ${Main} ${last ? LastField : ''}`}>
      <div className={'NodeFieldPortPlaceholder'} />
      <div className={Title}>
        <div className={Name}>
          <PaintFieldName data={node.data} name={node.name} args={node.args} />
        </div>
        <div className={Type}>
          <PaintFieldType type={node.type} />
        </div>
      </div>
      <div className={'NodeFieldPortPlaceholder'} />
    </div>
  );
};
