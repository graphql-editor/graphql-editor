import { Parser, ParserField } from 'graphql-zeus';
import { TemplateUtils } from 'graphql-zeus/lib/TreeToGraphQL/templates/TemplateUtils';
export const ConvertStringToObject = (value: string) => {
  const computeString = `
    scalar Translatable
    input Translate{
        field: Translatable = ${value}
    }
`;
  const TranslatedString = Parser.parse(computeString);

  const translationNode = TranslatedString.nodes.find((n) => n.name === 'Translate');
  if (!translationNode || !translationNode.args) {
    return;
  }
  return translationNode.args[0].args;
};

export const ConvertValueToEditableString = (f: ParserField) => {
  const TranslatedString = TemplateUtils.resolverForConnection(f);
  return TranslatedString;
};
