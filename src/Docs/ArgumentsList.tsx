import { FieldText, TypeText } from '@/Docs/DocsStyles';
import { tranfromOptions } from '@/Docs/handleOptions';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import styled from '@emotion/styled';
import { ParserField } from 'graphql-js-tree';
import React from 'react';

const ArgumentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FieldDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.backgroundedText};
  font-size: 14px;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;

interface ArgumentsListI {
  argument: ParserField;
  setNode: (nodeName: string) => void;
}

export const ArgumentsList: React.FC<ArgumentsListI> = ({
  argument,
  setNode,
}) => {
  return (
    <ArgumentsWrapper>
      {argument.args &&
        argument.args.map((a, i) => (
          <React.Fragment key={i}>
            {i === 0 && <FieldText>(</FieldText>}
            <FieldDiv>
              {a.name}:
              <TypeText
                isScalar={BuiltInScalars.some(
                  (scalar) => scalar.name === a.type.name,
                )}
                onClick={() => setNode(a.type.name)}
              >
                {tranfromOptions(a.type.name, a.type.options)}
              </TypeText>
            </FieldDiv>

            {i === argument.args?.length! - 1 ? (
              <>
                <FieldText>)</FieldText>
                <TypeText
                  isScalar={BuiltInScalars.some(
                    (scalar) => scalar.name === a.type.name,
                  )}
                  onClick={() => setNode(argument.type.name)}
                >
                  {tranfromOptions(argument.type.name, argument.type.options)}
                </TypeText>
              </>
            ) : (
              <FieldText>,</FieldText>
            )}
          </React.Fragment>
        ))}
    </ArgumentsWrapper>
  );
};
