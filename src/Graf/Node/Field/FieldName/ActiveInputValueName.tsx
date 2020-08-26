import React from 'react';
import { ParserField, Options } from 'graphql-zeus';
import { style } from 'typestyle';
import { EditableText } from './EditableText';
const Main = style({
  display: 'flex',
  flexFlow: 'row no-wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
export const ActiveInputValueName: React.FC<{
  afterChange: (newName: string) => void;
  changeValue: (index: number, value: string) => void;
  node: ParserField;
}> = ({ afterChange, changeValue, node }) => {
  const {
    args,
    name,
    type: { options = [] },
  } = node;
  if (args && args.length > 0) {
    return (
      <div className={Main}>
        <EditableText value={name} onChange={afterChange} />
        {args.length > 0 && <span>{`= `}</span>}
        {args.length > 0 && options.includes(Options.array) && <span>{`[`}</span>}
        {args?.map((a, i) => (
          <React.Fragment key={a.name}>
            <EditableText
              value={a.name}
              onChange={(v) => {
                changeValue(i, v);
              }}
            />
            {i < args.length - 1 && <span>,</span>}
          </React.Fragment>
        ))}
        {args.length > 0 && options.includes(Options.array) && <span>{`]`}</span>}
      </div>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
