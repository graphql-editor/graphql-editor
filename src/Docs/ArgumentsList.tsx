import { FieldText, TypeText } from '@/Docs/DocsElement';
import { tranfromOptions } from '@/Docs/handleOptions';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { useTheme } from '@/state/containers';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';

const ArgumentsWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
});

interface ArgumentsListI {
  argument: ParserField;
  setNode: (nodeName: string) => void;
}

export const ArgumentsList: React.FC<ArgumentsListI> = ({
  argument,
  setNode,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`${ArgumentsWrapper}`}>
      {argument.args &&
        argument.args.map((a, i) => (
          <React.Fragment key={i}>
            {i === 0 && <p className={`${FieldText(theme)}`}>(</p>}
            <p className={`${FieldText(theme)}`} style={{ display: 'flex' }}>
              {a.name}:
              <p
                className={`${TypeText(
                  BuiltInScalars.some((scalar) => scalar.name === a.type.name),
                )(theme)}`}
                onClick={() => setNode(a.type.name)}
              >
                {tranfromOptions(a.type.name, a.type.options)}
              </p>
            </p>

            {i === argument.args?.length! - 1 ? (
              <>
                <p className={`${FieldText(theme)}`}>)</p>
                <p
                  className={`${TypeText(
                    BuiltInScalars.some(
                      (scalar) => scalar.name === argument.type.name,
                    ),
                  )(theme)}`}
                  onClick={() => setNode(argument.type.name)}
                >
                  {tranfromOptions(argument.type.name, argument.type.options)}
                </p>
              </>
            ) : (
              <p className={`${FieldText(theme)}`}>,</p>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
