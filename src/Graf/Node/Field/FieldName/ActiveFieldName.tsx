import React from 'react';
import { ParserField } from 'graphql-zeus';
import { ActiveFieldType } from '@Graf/Node/Field/FieldType/ActiveFieldType';
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
export const ActiveFieldName: React.FC<
  Pick<ParserField, 'name' | 'args' | 'data'> & { afterChange: (newName: string) => void }
> = ({ args, data, name, afterChange }) => {
  if (args && args.length > 0) {
    return (
      <div className={Main}>
        <EditableText value={name} onChange={afterChange} />(
        {args.map((a, i) => (
          <div className={Indent} key={a.name}>
            <ActiveFieldName
              afterChange={(newName) => {
                args[i].name = newName;
                afterChange(name);
              }}
              data={a.data}
              name={a.name}
              args={a.args}
            />
            :
            <ActiveFieldType type={a.type} />,
          </div>
        ))}
        )
      </div>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
