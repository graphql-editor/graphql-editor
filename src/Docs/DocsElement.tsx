import { tranfromOptions } from '@/Docs/handleOptions';
import { BuiltInScalars } from '@/GraphQL/Resolve';
import { useTheme, useTreesState } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { ParserField } from 'graphql-js-tree';
import React from 'react';
import { style } from 'typestyle';

const Wrapper = style({
  margin: 32,
  display: 'flex',
  flexDirection: 'column',
  height: '96vh',
  width: '100%',
});

const ListWrapper = style({
  marginBottom: 12,
  flex: '1 1 auto',
  overflowY: 'auto',
  minHeight: '0px',
  wordWrap: 'normal',
});

const Title = themed(({ backgroundedText }) =>
  style({
    color: backgroundedText,
    fontFamily,
    margin: '16px 0',
  }),
);

const Interfaces = themed(({ colors }) =>
  style({
    color: colors.interface,
    fontFamily,
    fontSize: 14,
  }),
);

const InterfacesWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

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
      paddingLeft: 8,
    }),
  );

const FieldText = themed(({ backgroundedText }) =>
  style({
    fontFamily,
    color: backgroundedText,
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
interface DocsElementI {
  node: ParserField;
}

export const DocsElement: React.FC<DocsElementI> = ({ node }) => {
  const { setSelectedNode, tree } = useTreesState();
  const { theme } = useTheme();

  const setNode = (nodeName: string) => {
    const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
    if (newSelectedNode.length > 0) setSelectedNode(newSelectedNode[0]);
  };

  return (
    <div className={`${Wrapper}`}>
      <div>
        <h1 className={`${Title(theme)}`}>{node.name}</h1>
        <p className={`${Type(theme)}`}>{node.type.name}</p>

        {node.interfaces && node.interfaces.length > 0 && (
          <>
            <h3 className={`${Title(theme)}`}>Interfaces</h3>
            <div className={`${InterfacesWrapper}`}>
              {node.interfaces.map((name) => (
                <p
                  className={`${Interfaces(theme)}`}
                  onClick={() => setNode(name)}
                >
                  {name}
                </p>
              ))}
            </div>
          </>
        )}
        <p className={`${Title(theme)}`}>{node.description}</p>
      </div>
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
              {arg.args &&
                arg.args?.length > 0 &&
                arg.args.map((a, i) => (
                  <React.Fragment key={i}>
                    {i === 0 && <p className={`${FieldText(theme)}`}>(</p>}
                    <p className={`${FieldText(theme)}`}>{a.name}:</p>
                    <p
                      className={`${TypeText(
                        BuiltInScalars.some(
                          (scalar) => scalar.name === a.type.name,
                        ),
                      )(theme)}`}
                      onClick={() => setNode(a.type.name)}
                    >
                      {a.type.name}
                    </p>

                    {i === arg.args?.length! - 1 ? (
                      <p className={`${FieldText(theme)}`}>)</p>
                    ) : (
                      <p className={`${FieldText(theme)}`}>,</p>
                    )}
                  </React.Fragment>
                ))}
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
