import React from 'react';
import { ParserField } from 'graphql-zeus';
import { FieldType } from './FieldType';
import { style } from 'typestyle';
const Indent = style({
  marginLeft: 10,
});
export const FieldName: React.FC<Pick<ParserField, 'name' | 'args' | 'data'>> = ({ args, data, name }) => {
  let compiledName = name;
  if (args && args.length > 0) {
    return (
      <span>
        {name}(
        {args.map((a) => (
          <div className={Indent}>
            <FieldName data={a.data} name={a.name} args={a.args} key={a.name} />:
            <FieldType type={a.type} key={a.name} />
          </div>
        ))}
        )
      </span>
    );
  }
  return <span>{compiledName}</span>;
};
