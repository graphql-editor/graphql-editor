import React from 'react';
import { ParserField } from 'graphql-js-tree';
import styled from '@emotion/styled';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { ActiveType } from '@/Relation/Field/ActiveType';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Name = styled.div`
  font-size: ${FIELD_NAME_SIZE};
  color: ${({ theme }) => theme.text.default};
  margin-right: 2px;
`;

const Comma = styled.span`
  padding: 0 2px;
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
        {args && (
          <>
            {'('}
            {args.map((a, i) => (
              <div key={a.name}>
                <span>{a.name}</span>
                :<ActiveType type={a.type} parentTypes={parentTypes} />
                {i < args.length - 1 && <Comma>,</Comma>}
              </div>
            ))}
            {')'}
          </>
        )}
      </Main>
    );
  }
  return <Name>{name}</Name>;
};
