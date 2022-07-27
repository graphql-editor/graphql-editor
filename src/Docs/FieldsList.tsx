import { ArgumentsList } from '@/Docs/ArgumentsList';
import { tranfromOptions } from '@/Docs/handleOptions';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { Remarkable } from 'remarkable';
import { DescText, FieldText, Title, TypeText } from '@/Docs/DocsStyles';
import styled from '@emotion/styled';

const md = new Remarkable();

const ListWrapper = styled.div`
  margin-bottom: 12px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  word-wrap: normal;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.type};
`;

const TitleWrapper = styled.div<{ isType: boolean }>`
  display: flex;
  cursor: ${({ isType }) => (isType ? 'pointer' : 'default')};
`;

interface FieldsListI {
  node: ParserField;
  setNode: (nodeName: string) => void;
}

export const FieldsList: React.FC<FieldsListI> = ({ node, setNode }) => {
  return (
    <>
      <Title>
        <h3>Fields</h3>
      </Title>
      <ListWrapper>
        {node.args?.map((arg, i) => (
          <FieldsWrapper key={i}>
            <TitleWrapper
              isType={
                !BuiltInScalars.some((scalar) => scalar.name === arg.type.name)
              }
            >
              <FieldText>{arg.name}</FieldText>
              {arg.args && arg.args?.length > 0 ? (
                <ArgumentsList argument={arg} setNode={setNode} />
              ) : (
                <TypeText
                  isScalar={BuiltInScalars.some(
                    (scalar) => scalar.name === arg.type.name,
                  )}
                  onClick={() => setNode(arg.type.name)}
                >
                  {tranfromOptions(arg.type.name, arg.type.options)}
                </TypeText>
              )}
            </TitleWrapper>
            {arg.description && (
              <DescText
                dangerouslySetInnerHTML={{
                  __html: md.render(arg.description),
                }}
              />
            )}
          </FieldsWrapper>
        ))}
      </ListWrapper>
    </>
  );
};
