import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { PaintFieldName } from './FieldName';
import { PaintType } from '@/Graf/Node/Type';
export interface PaintFieldProps {
  node: ParserField;
  parentNodeTypeName: string;
}

const Main = style({
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  margin: `0 0`,
  transition: 'background 0.25s ease-in-out',
  $nest: {
    '.NodeFieldPortPlaceholder': {
      width: 24,
      height: 16,
    },
  },
});
const Title = style({
  fontSize: 10,
  display: 'flex',
  flex: 1,
  alignItems: 'baseline',
  overflow: 'hidden',
});
const Name = style({ fontSize: 12, marginRight: 4, overflow: 'hidden' });
const Type = style({ fontSize: 10, color: Colors.green[0] });
export const PaintField: React.FC<PaintFieldProps> = ({ node, parentNodeTypeName }) => {
  return (
    <div className={`NodeType-${parentNodeTypeName} ${Main}`}>
      <div className={'NodeFieldPortPlaceholder'} />
      <div className={Title}>
        <div className={Name}>
          <PaintFieldName data={node.data} name={node.name} args={node.args} />
        </div>
        <div className={Type}>
          <PaintType type={node.type} />
        </div>
      </div>
      <div className={'NodeFieldPortPlaceholder'} />
    </div>
  );
};
