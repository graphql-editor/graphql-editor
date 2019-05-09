import { ParserField } from '../../Models';
import { TypeDefinition } from '../../Models/Spec';
import { TypeDefinitionMirror } from '../mirror';
import { TemplateUtils } from './TemplateUtils';

export class TypeDefinitionsTemplates {
  static definitionTemplate = ({
    description,
    name,
    type
  }: Pick<ParserField, 'description' | 'name' | 'type'>) =>
    `${TemplateUtils.descriptionResolver(description)}${type.name in TypeDefinitionMirror &&
      TypeDefinitionMirror[type.name as TypeDefinition]} ${name}`
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
    `${TypeDefinitionsTemplates.definitionTemplate({ name: `@${name}`, description, type })}${
      args && args.length ? `(\n${args.map(TemplateUtils.resolverForConnection).join('\n')}\n)` : ''
    } on ${(type.directiveOptions || []).join(' | ')}`
  static resolveUnion = ({ name, description, type, args, directives }: ParserField): string =>
    TypeDefinitionsTemplates.definitionTemplate({ name, description, type }) +
    `${TemplateUtils.resolveDirectives(directives)}${
      args && args.length ? ` = ${args.map(TemplateUtils.resolverForConnection).join(' | ')}` : ''
    }`
}
