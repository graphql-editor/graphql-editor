import { Colors, mix } from '@/Colors';
import { GraphQLBackgrounds, GraphQLDarkBackgrounds } from '@/editor/theme';
import { NodeTitle } from '@/Graf/Node';
import { EditableText } from '@/Graf/Node/components';
import { ActiveType } from '@/Graf/Node/Type';
import { ParserField } from 'graphql-zeus';
import React from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Field } from '../Field';

const Content = style({
  minWidth: 320,
  padding: 20,
  margin: 20,
  maxHeight: '30vh',
  textOverflow: 'elipssis',
  overflowY: 'auto',
  $nest: {
    '.NodeTitle': NodeTitle,
    ...Object.keys(GraphQLDarkBackgrounds).reduce((a, b) => {
      a[`&.NodeBackground-${b}`] = {
        background: `${mix(GraphQLBackgrounds[b], Colors.grey[10], 40)}`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});

interface NodeProps {
  field: ParserField;
}

const EditableTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 'bold',
};
export const Node: React.FC<NodeProps> = ({ field }) => {
  return (
    <div className={Content + ` NodeBackground-${field.type.name}`}>
      <div className={'NodeTitle'}>
        <div className={`NodeName`}>
          <EditableText style={EditableTitle} value={field.name} />
        </div>
        <div className={`NodeType`}>
          <ActiveType type={field.type} />
        </div>
      </div>
      <div>
        {field.args?.map((a) => (
          <Field node={a} parentNodeTypeName={field.type.name} />
        ))}
      </div>
    </div>
  );
};
