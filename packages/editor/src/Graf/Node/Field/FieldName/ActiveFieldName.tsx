import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { ActiveType } from '@/Graf/Node/Type';
import { EditableText } from '@/Graf/Node/components';
import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Indent = styled.div`
  margin-left: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ActiveFieldName: React.FC<
  Pick<ParserField, 'name' | 'args' | 'data'> & {
    afterChange?: (newName: string) => void;
    parentTypes?: Record<string, string>;
  }
> = ({ args, data, name, afterChange, parentTypes }) => {
  if (args && args.length > 0) {
    return (
      <Main>
        <EditableText value={name} onChange={afterChange} />(
        {afterChange &&
          args.map((a, i) => (
            <Indent key={a.name}>
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
            </Indent>
          ))}
        {!afterChange &&
          args.map((a, i) => (
            <Indent key={a.name}>
              <span>{a.name}</span>
              :<ActiveType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </Indent>
          ))}
        )
      </Main>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
