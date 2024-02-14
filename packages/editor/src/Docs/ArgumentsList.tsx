import { FieldText, TypeText } from "@/Docs/DocsStyles";
import { BuiltInScalars } from "@/GraphQL/Resolve";
import styled from "@emotion/styled";
import { ParserField, getTypeName, compileType } from "graphql-js-tree";
import React from "react";

const ArgumentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FieldDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text.default};
  font-size: 1rem;
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
                  (scalar) => scalar.name === getTypeName(a.type.fieldType)
                )}
                onClick={() => setNode(getTypeName(a.type.fieldType))}
              >
                {compileType(a.type.fieldType)}
              </TypeText>
            </FieldDiv>
            {i === (argument.args?.length || 0) - 1 ? (
              <>
                <FieldText>)</FieldText>
                <TypeText
                  isScalar={BuiltInScalars.some(
                    (scalar) => scalar.name === getTypeName(a.type.fieldType)
                  )}
                  onClick={() => setNode(getTypeName(a.type.fieldType))}
                >
                  {compileType(argument.type.fieldType)}
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
