import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { ActiveType } from '@/Graf/Node/Type';
import { style } from 'typestyle';
import { EditableText } from '@/Graf/Node/components';
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
  Pick<ParserField, 'name' | 'args' | 'data'> & {
    afterChange?: (newName: string) => void;
    parentTypes?: Record<string, string>;
  }
> = ({ args, data, name, afterChange, parentTypes }) => {
  if (args && args.length > 0) {
    return (
      <div className={Main}>
        <EditableText value={name} onChange={afterChange} />(
        {afterChange &&
          args.map((a, i) => (
            <div className={Indent} key={a.name}>
              <EditableText
                onChange={
                  afterChange
                    ? (newName) => {
                        args[i].name = newName;
                        afterChange(name);
                      }
                    : undefined
                }
                value={a.name}
              />
              :<ActiveType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </div>
          ))}
        {!afterChange &&
          args.map((a, i) => (
            <div className={Indent} key={a.name}>
              <span>{a.name}</span>
              :<ActiveType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </div>
          ))}
        )
      </div>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
