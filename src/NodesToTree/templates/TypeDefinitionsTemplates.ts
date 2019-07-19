import {
  ParserField,
  TypeDefinition,
  TypeDefinitionDisplayMap,
  TypeSystemDefinitionDisplayStrings
} from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

/**
 * Templates for GraphQL Type definitions
 *
 * @export
 * @class TypeDefinitionsTemplates
 */
export class TypeDefinitionsTemplates {
  /**
   * Basic TypeDefinition template with mapping to display `type` instead of `ObjectTypeDefinition`
   *
   * @param {
   *     description,
   *     name,
   *     type
   *   } props
   *
   * @static
   * @memberof TypeDefinitionsTemplates
   */
  static definitionTemplate = ({
    description,
    name,
    type
  }: Pick<ParserField, 'description' | 'name' | 'type'>) =>
    `${TemplateUtils.descriptionResolver(description)}${
      TypeDefinitionDisplayMap[type.name as TypeDefinition]
    } ${name}`
  /**
   * Resolve type
   *
   * @param {
   *     name,
   *     description,
   *     type,
   *     interfaces,
   *     args,
   *     directives
   *   } field to be resolved
   * @returns {string}
   * @static
   * @memberof TypeDefinitionsTemplates
   */
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
  /**
   * Resolve directive
   *
   * @static
   * @memberof TypeDefinitionsTemplates
   * @param { name, description, type, args } field to be resolved
   * @returns {string}
   */
  static resolveDirective = ({ name, description, type, args }: ParserField): string =>
    `${TemplateUtils.descriptionResolver(description)}${
      TypeSystemDefinitionDisplayStrings.directive
    } @${name}${
      args && args.length ? `(\n${args.map(TemplateUtils.resolverForConnection).join('\n')}\n)` : ''
    } on ${(type.directiveOptions || []).join(' | ')}`
  /**
   * Resolve union
   *
   * @param { name, description, type, args, directives } field to be resolved
   * @returns {string}
   * @static
   * @memberof TypeDefinitionsTemplates
   */
  static resolveUnion = ({ name, description, type, args, directives }: ParserField): string =>
    TypeDefinitionsTemplates.definitionTemplate({ name, description, type }) +
    `${TemplateUtils.resolveDirectives(directives)}${
      args && args.length ? ` = ${args.map(TemplateUtils.resolverForConnection).join(' | ')}` : ''
    }`
}
