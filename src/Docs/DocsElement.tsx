import { BuiltInScalars } from '@/GraphQL/Resolve';
import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { Options, ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';

interface DocsElementI {
  node: ParserField;
}

const Wrapper = style({
  margin: 32,
  display: 'flex',
  flexDirection: 'column',
  height: '96vh',
});

const ListWrapper = style({
  marginBottom: 12,
  flex: '1 1 auto',
  overflowY: 'auto',
  minHeight: '0px',
});

const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontFamily,
    margin: '16px 0',
  }),
);

const Type = themed(({ colors }) =>
  style({
    color: colors.type,
    fontFamily,
  }),
);

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
const TypeText = (isScalar: boolean) =>
  themed(({ colors }) =>
    style({
      fontFamily,
      color: isScalar ? colors.String : colors.type,
      fontSize: 14,
    }),
  );

const FieldText = themed(({ backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
    paddingRight: 8,
    fontSize: 14,
  }),
);

const DescText = themed(({ backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
    fontSize: 12,
    paddingLeft: 16,
    marginTop: 8,
  }),
);

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree } = useTreesState();
  const { theme } = useTheme();

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0) setSelectedNode(newSelectedNode[0]);
  };

  const checkOptions = (field: ParserField) => {
    if (field.type.operations) {
      const options: Options[] = [];
      field.type.options?.map((a) => {
        switch (a) {
          case Options.array:
            options.push(Options.array);
            break;
          case Options.required:
            options.push(Options.array);
            break;
          case Options.arrayRequired:
            options.push(Options.array);
            break;
        }
      });
    }
    return field.type.name;
  };

  return (
    <div className={`${Wrapper}`}>
      <div>
        <h1 className={`${Title(theme)}`}>{node.name}</h1>
        <p className={`${Type(theme)}`}>{node.type.name}</p>
        <p className={`${Title(theme)}`}>{node.description}</p>
      </div>
      <h3 className={`${Title(theme)}`}>Fields</h3>
      <div className={`${ListWrapper}`}>
        {node.args?.map((arg, i) => (
          <div
            key={i}
            className={`${FieldsWrapper(theme)}`}
            onClick={() => setNode(arg.type.name)}
          >
            <div
              className={`${TitleWrapper(
                !BuiltInScalars.some((scalar) => scalar.name === arg.type.name),
              )}`}
            >
              <p className={`${FieldText(theme)}`}>{arg.name}</p>
              <p
                className={`${TypeText(
                  BuiltInScalars.some(
                    (scalar) => scalar.name === arg.type.name,
                  ),
                )(theme)}`}
              >
                {checkOptions(arg)}
              </p>
            </div>
            {arg.description && (
              <p className={`${DescText(theme)}`}>{arg.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
