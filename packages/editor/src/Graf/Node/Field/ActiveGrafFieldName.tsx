import React from 'react';
import { ParserField } from 'graphql-js-tree';
import styled from '@emotion/styled';
import { EditableText } from '@/Graf/Node/Field/EditableText';
import { ActiveGrafType } from '@/Graf/Node/Field/ActiveGrafType';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Indent = styled.div`
  margin-left: 2px;
`;

export const ActiveGrafFieldName: React.FC<
  Pick<ParserField, 'name' | 'args' | 'data'> & {
    afterChange?: (newName: string) => void;
    parentTypes?: Record<string, string>;
    active?: boolean;
  }
> = ({ args, data, name, afterChange, parentTypes, active }) => {
  if (args && args.length > 0) {
    return (
      <Main>
        <EditableText
          value={name}
          onChange={active ? afterChange : undefined}
        />
        (
        {afterChange &&
          args.map((a, i) => (
            <Indent key={a.name}>
              <EditableText
                onChange={
                  active && afterChange
                    ? (newName) => {
                        args[i].name = newName;
                        afterChange(name);
                      }
                    : undefined
                }
                value={a.name}
              />
              :<ActiveGrafType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </Indent>
          ))}
        {!afterChange &&
          args.map((a, i) => (
            <Indent key={a.name}>
              <span>{a.name}</span>
              :<ActiveGrafType type={a.type} parentTypes={parentTypes} />
              {i < args.length - 1 && <span>,</span>}
            </Indent>
          ))}
        )
      </Main>
    );
  }
  return <EditableText value={name} onChange={afterChange} />;
};
