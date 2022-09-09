import { compileType, getTypeName, Parser, ParserField } from 'graphql-js-tree';
import { TemplateUtils } from 'graphql-js-tree/lib/TreeToGraphQL/templates/TemplateUtils';

export const ConvertValueToEditableString = (f: ParserField) => {
  console.log(f);
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
  console.log(computeString);
  const TranslatedString = Parser.parse(computeString);

  const translationNode = TranslatedString.nodes.find(
    (n) => n.name === 'Translate',
  );
  if (!translationNode || !translationNode.args) {
    return;
  }
  const fieldNode = translationNode.args[0];
  return fieldNode;
};

export const placeStringInNode = ({ node, v }: PlaceFunctionArgs) => {
  if (!v) {
    return;
  }
  const converted = ConvertStringToObject(
    v,
    getTypeName(node.type.fieldType),
    compileType(node.type.fieldType),
  );
  console.log(converted?.args);
  return converted?.args;
};
