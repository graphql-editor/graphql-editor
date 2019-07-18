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

export class TemplateUtils {
  static isArray = (f: ParserField, type: string) =>
    f.type.options && f.type.options.find((o) => o === Options.array) ? `[${type}]` : type
  static isRequired = (f: ParserField, type: string) =>
    f.type.options && f.type.options.find((o) => o === Options.required) ? `${type}!` : type
  static isArrayRequired = (f: ParserField, type: string) =>
    f.type.options &&
    f.type.options.find((o) => o === Options.arrayRequired) &&
    f.type.options.find((o) => o === Options.array)
      ? `${type}!`
      : type
  static resolveType = (f: ParserField) =>
    TemplateUtils.isArrayRequired(
      f,
      TemplateUtils.isArray(f, TemplateUtils.isRequired(f, f.type.name))
    )
  static descriptionResolver = (description?: string, prefix = '') =>
    description ? `${prefix}"""\n${prefix}${description}\n${prefix}"""\n` : ''
  static resolveImplements = (interfaces?: string[]) =>
    interfaces && interfaces.length ? ` implements ${interfaces.join(' & ')}` : ''
  static resolveDirectives = (directives?: ParserField[]) =>
    directives && directives.length
      ? ` ${directives.map((d) => TemplateUtils.resolverForConnection(d)).join(' ')}`
      : ''
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
