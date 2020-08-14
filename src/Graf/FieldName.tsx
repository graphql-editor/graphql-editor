import React from 'react';
import { ParserField } from 'graphql-zeus';
import { FieldType } from './FieldType';
import { style } from 'typestyle';
import { EditableText } from './EditableText';
const Main = style({
  display: 'flex',
  flexFlow: 'row no-wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
const Indent = style({
  marginLeft: 2,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
export const FieldName: React.FC<Pick<ParserField, 'name' | 'args' | 'data'>> = ({ args, data, name }) => {
  if (args && args.length > 0) {
    return (
      <div className={Main}>
        <EditableText value={name} onChange={(e) => {}} />(
        {args.map((a) => (
          <div className={Indent}>
            <FieldName data={a.data} name={a.name} args={a.args} key={a.name} />:
            <FieldType type={a.type} key={a.name} />,
          </div>
        ))}
        )
      </div>
    );
  }
  return <EditableText value={name} onChange={(e) => {}} />;
};
