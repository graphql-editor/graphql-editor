import {
  Instances,
  Options,
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
  Value,
  ValueDefinition
} from 'graphql-zeus';
import {} from '../../Models';
import { ArgumentTemplate } from './ArgumentTemplate';
import { DirectiveTemplate } from './DirectiveTemplate';
import { EnumValueDefinitionTemplate } from './EnumValueDefinitionTemplate';
import { FieldTemplate } from './FieldTemplate';
import { InputValueTemplate } from './InputValueTemplate';
import { TypeDefinitionsTemplates } from './TypeDefinitionsTemplates';
import { UnionMemberTemplate } from './UnionMemberTemplate';
import { ValueTemplate } from './ValueTemplate';

/**
 * Class for solving GraphQL Types and directing them to a right resolver
 *
 * @export
 * @class TemplateUtils
 */
export class TemplateUtils {
  /**
   * Check if type is ListType from graphql and array in zeus
   *
   * @static
   * @param f field to check
   * @param type type of field to resolve
   * @returns {string} the real type
   * @memberof TemplateUtils
   */
  static isArray = (f: ParserField, type: string): string =>
    f.type.options && f.type.options.find((o) => o === Options.array) ? `[${type}]` : type
  /**
   * Check if type is NonNullType from graphql and required in zeus
   *
   * @static
   * @param f field to check
   * @param type type of field to resolve
   * @returns {string} the real type
   * @memberof TemplateUtils
   */
  static isRequired = (f: ParserField, type: string): string =>
    f.type.options && f.type.options.find((o) => o === Options.required) ? `${type}!` : type
  /**
   * Check if type is NonNullType and ListType from graphql and required and arrayRequired in zeus
   *
   * @static
   * @param f field to check
   * @param type type of field to resolve
   * @returns {string} the real type
   * @memberof TemplateUtils
   */
  static isArrayRequired = (f: ParserField, type: string): string =>
    f.type.options &&
    f.type.options.find((o) => o === Options.arrayRequired) &&
    f.type.options.find((o) => o === Options.array)
      ? `${type}!`
      : type
  /**
   *
   *
   * @param f field to be resolved
   * @static
   * @memberof TemplateUtils
   */
  static resolveType = (f: ParserField) =>
    TemplateUtils.isArrayRequired(
      f,
      TemplateUtils.isArray(f, TemplateUtils.isRequired(f, f.type.name))
    )
  /**
   * Return description in GraphQL format
   *
   * @static
   * @param [description]
   * @param [prefix='']
   * @returns {string}
   * @memberof TemplateUtils
   */
  static descriptionResolver = (description?: string, prefix = ''): string =>
    description ? `${prefix}"""\n${prefix}${description}\n${prefix}"""\n` : ''
  /**
   * Creates implements for GraphQL types
   *
   * @param [interfaces] names of interfaces
   * @static
   * @memberof TemplateUtils
   */
  static resolveImplements = (interfaces?: string[]) =>
    interfaces && interfaces.length ? ` implements ${interfaces.join(' & ')}` : ''
  /**
   * Create directives for graphql fields
   *
   * @static
   * @memberof TemplateUtils
   * @param [directives] directives parser fields
   */
  static resolveDirectives = (directives?: ParserField[]) =>
    directives && directives.length
      ? ` ${directives.map((d) => TemplateUtils.resolverForConnection(d)).join(' ')}`
      : ''
  /**
   * Detect the Zeus graphql type and cast it to proper function in type resolver
   *
   * @static
   * @memberof TemplateUtils
   * @param f
   * @returns {string}
   */
  static resolverForConnection = (f: ParserField): string => {
    if (f.data) {
      const { type = '' } = f.data;
      if (type === TypeDefinition.UnionTypeDefinition) {
        return TypeDefinitionsTemplates.resolveUnion(f);
      }
      if (type in Value) {
        return ValueTemplate.resolve(f);
      }
      if (type in TypeDefinition) {
        return TypeDefinitionsTemplates.resolve(f);
      }
      switch (type) {
        case TypeSystemDefinition.FieldDefinition:
          return FieldTemplate.resolve(f);
        case TypeSystemDefinition.DirectiveDefinition:
          return TypeDefinitionsTemplates.resolveDirective(f);
        case TypeSystemDefinition.UnionMemberDefinition:
          return UnionMemberTemplate.resolve(f);
        case ValueDefinition.EnumValueDefinition:
          return EnumValueDefinitionTemplate.resolve(f);
        case ValueDefinition.InputValueDefinition:
          return InputValueTemplate.resolve(f);
        case Instances.Argument:
          return ArgumentTemplate.resolve(f);
        case Instances.Directive:
          return DirectiveTemplate.resolve(f);
        default:
          return '';
      }
    }
    return '';
  }
}
