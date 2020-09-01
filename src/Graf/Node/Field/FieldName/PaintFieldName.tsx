import React from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintType } from '@/Graf/Node/Type';
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
export const PaintFieldName: React.FC<Pick<ParserField, 'name' | 'args' | 'data'>> = ({ args, data, name }) => {
  if (args && args.length > 0) {
    return (
      <div className={Main}>
        <span>{name}</span>(
        {args.map((a, i) => (
          <div className={Indent} key={a.name}>
            <PaintFieldName data={a.data} name={a.name} args={a.args} />
            :
            <PaintType type={a.type} />,
          </div>
        ))}
        )
      </div>
    );
  }
  return <span>{name}</span>;
};
