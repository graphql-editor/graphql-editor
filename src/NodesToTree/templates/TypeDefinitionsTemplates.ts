import {
  ParserField,
  TypeDefinition,
  TypeDefinitionDisplayMap,
  TypeSystemDefinitionDisplayStrings
} from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

export class TypeDefinitionsTemplates {
  static definitionTemplate = ({
    description,
    name,
    type
  }: Pick<ParserField, 'description' | 'name' | 'type'>) =>
    `${TemplateUtils.descriptionResolver(description)}${
      TypeDefinitionDisplayMap[type.name as TypeDefinition]
    } ${name}`
  static resolve = ({
    name,
    description,
    type,
    interfaces,
    args,
    directives
  }: ParserField): string =>
    TypeDefinitionsTemplates.definitionTemplate({ name, description, type }) +
    `${TemplateUtils.resolveImplements(interfaces)}${TemplateUtils.resolveDirectives(directives)}${
      args && args.length ? `{\n${args.map(TemplateUtils.resolverForConnection).join('\n')}\n}` : ''
    }`
  static resolveDirective = ({ name, description, type, args }: ParserField): string =>
    `${TemplateUtils.descriptionResolver(description)}${
      TypeSystemDefinitionDisplayStrings.directive
    } @${name}${
      args && args.length ? `(\n${args.map(TemplateUtils.resolverForConnection).join('\n')}\n)` : ''
    } on ${(type.directiveOptions || []).join(' | ')}`
  static resolveUnion = ({ name, description, type, args, directives }: ParserField): string =>
    TypeDefinitionsTemplates.definitionTemplate({ name, description, type }) +
    `${TemplateUtils.resolveDirectives(directives)}${
      args && args.length ? ` = ${args.map(TemplateUtils.resolverForConnection).join(' | ')}` : ''
    }`
}
