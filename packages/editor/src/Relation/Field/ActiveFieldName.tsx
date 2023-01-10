import React from 'react';
import { ParserField } from 'graphql-js-tree';
import styled from '@emotion/styled';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { ActiveType } from '@/Relation/Field/ActiveType';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Indent = styled.div`
  margin-left: 2px;
`;
const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE};
  color: ${({ theme }) => theme.text};
`;

export const ActiveFieldName: React.FC<
  Pick<ParserField, 'name' | 'args'> & {
    parentTypes?: Record<string, string>;
  }
> = ({ args, name, parentTypes }) => {
  if (args && args.length > 0) {
    return (
      <Main>
        <Name>{name}</Name>
        {args.map((a, i) => (
          <Indent key={a.name}>
            <span>{a.name}</span>
            :<ActiveType type={a.type} parentTypes={parentTypes} />
            {i < args.length - 1 && <span>,</span>}
          </Indent>
        ))}
      </Main>
    );
  }
  return <Name>{name}</Name>;
};
