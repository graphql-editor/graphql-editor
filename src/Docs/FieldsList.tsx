import { ArgumentsList } from '@/Docs/ArgumentsList';
import { DescText, FieldText, Title, TypeText } from '@/Docs/DocsElement';
import { tranfromOptions } from '@/Docs/handleOptions';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';
import { Remarkable } from 'remarkable';

const md = new Remarkable();

const ListWrapper = style({
  marginBottom: 12,
  flex: '1 1 auto',
  overflowY: 'auto',
  minHeight: '0px',
  wordWrap: 'normal',
});

const FieldsWrapper = themed(({ colors }) =>
  style({
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginBottom: '8px',
    borderBottom: `1px solid ${colors.type}`,
  }),
);

const TitleWrapper = (isType: boolean) =>
  style({
    display: 'flex',
    cursor: isType ? 'pointer' : 'default',
  });

interface FieldsListI {
  node: ParserField;
  setNode: (nodeName: string) => void;
}

export const FieldsList: React.FC<FieldsListI> = ({ node, setNode }) => {
  const { theme } = useTheme();

  return (
    <>
      <h3 className={`${Title(theme)}`}>Fields</h3>
      <div className={`${ListWrapper}`}>
        {node.args?.map((arg, i) => (
          <div key={i} className={`${FieldsWrapper(theme)}`}>
            <div
              className={`${TitleWrapper(
                !BuiltInScalars.some((scalar) => scalar.name === arg.type.name),
              )}`}
            >
              <p className={`${FieldText(theme)}`}>{arg.name}</p>
              {arg.args && arg.args?.length > 0 ? (
                <ArgumentsList argument={arg} setNode={setNode} />
              ) : (
                <p
                  className={`${TypeText(
                    BuiltInScalars.some(
                      (scalar) => scalar.name === arg.type.name,
                    ),
                  )(theme)}`}
                  onClick={() => setNode(arg.type.name)}
                >
                  {tranfromOptions(arg.type.name, arg.type.options)}
                </p>
              )}
            </div>
            {arg.description && (
              <p
                className={`${DescText(theme)}`}
                dangerouslySetInnerHTML={{
                  __html: md.render(arg.description),
                }}
              ></p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
