import { isScalarArgument } from '@/GraphQL/Resolve';
import {
  compileType,
  getTypeName,
  Options,
  Parser,
  ParserField,
  Value,
} from 'graphql-js-tree';
import { TemplateUtils } from 'graphql-js-tree/lib/TreeToGraphQL/templates/TemplateUtils';
export const ConvertStringToObject = (
  value: string,
  typeName: string,
  fieldType: string,
) => {
  const computeString = `
    scalar ${typeName}
    input Translate{
        field: ${fieldType} = ${value}
    }
`;
  const TranslatedString = Parser.parse(computeString);

  const translationNode = TranslatedString.nodes.find(
    (n) => n.name === 'Translate',
  );
  if (!translationNode || !translationNode.args) {
    return;
  }
  const fieldNode = translationNode.args[0];
  return fieldNode.args;
};

export const ConvertValueToEditableString = (f: ParserField) => {
  const TranslatedString = TemplateUtils.resolverForConnection(f);
  return TranslatedString;
};

export const ConvertValueNodeToString = (node: ParserField) => {
  if (!node.args.length) {
    return '';
  }
  return ConvertValueToEditableString(node).split('=')[1];
};

interface PlaceFunctionArgs {
  v: string;
  node: ParserField;
}
export const placeStringInNode = ({ node, v }: PlaceFunctionArgs) => {
  if (!v) {
    return;
  }
  if (v.length === 2 && v[0] === '[' && v[1] === ']') {
    return [];
  }
  const valueType = isScalarArgument(node);
  let value = v;
  if (valueType) {
    if (valueType === Value.StringValue) {
      if (v.startsWith(`\"`) && v.endsWith(`\"`)) {
        value = v.slice(1, -1);
      }
    }
    if (valueType === Value.BooleanValue) {
      value = v === 'true' ? 'true' : 'false';
    }
    const n: ParserField = {
      data: {
        type: valueType,
      },
      type: {
        fieldType: {
          name: valueType,
          type: Options.name,
        },
      },
      name: value,
      directives: [],
      args: [],
      interfaces: [],
    };
    return [n];
  }
  return ConvertStringToObject(
    v,
    getTypeName(node.type.fieldType),
    compileType(node.type.fieldType),
  );
};
