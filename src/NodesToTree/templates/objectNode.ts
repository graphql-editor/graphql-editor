import { Options, ParserField, ParserRoot } from '../../Models';
import { TypeDefinition } from '../../Models/Spec';
import { TypeDefinitionMirror } from '../mirror';

const isArray = (f: ParserField, type: string) =>
  f.type.options && f.type.options.find((o) => o === Options.array) ? `[${type}]` : type;
const isRequired = (f: ParserField, type: string) =>
  f.type.options && f.type.options.find((o) => o === Options.required) ? `${type}!` : type;
const isArrayRequired = (f: ParserField, type: string) =>
  f.type.options && f.type.options.find((o) => o === Options.arrayRequired) ? `${type}!` : type;

const resolveFieldType = (f: ParserField) =>
  isArrayRequired(f, isArray(f, isRequired(f, f.type.name)));

const descriptionResolver = (description?: string, prefix = '') =>
  description ? `${prefix}"""\n${prefix}${description}\n${prefix}"""\n` : '';

const argsResolver = (f: ParserField) =>
  f.args && f.args.length
    ? f.type.options && f.type.options.find((o) => o === Options.array)
      ? ` = [${f.args.map((a) => a.name).join(', ')}]`
      : ` = ${f.args[0].name}`
    : '';

export const definitionTemplate = ({
  description,
  name,
  type
}: Pick<ParserRoot, 'description' | 'name' | 'type'>) =>
  `${descriptionResolver(description)}${type.name in TypeDefinitionMirror &&
    TypeDefinitionMirror[type.name as TypeDefinition]} ${name}`;

const resolveImplements = (interfaces?: string[]) =>
  interfaces && interfaces.length ? ` implements ${interfaces.join(' & ')}` : '';
const resolveDirective = (directive: ParserField) => {
  return `@${directive.type.name}`;
};
const resolveDirectives = (directives?: ParserField[]) =>
  directives && directives.length ? ` ${directives.map(resolveDirective)}` : '';

export const typeNodeTemplate = ({
  name,
  description,
  type,
  interfaces,
  fields,
  directives
}: ParserRoot) =>
  definitionTemplate({ name, description, type }) +
  `${resolveImplements(interfaces)}${resolveDirectives(directives)}${
    fields && fields.length ? `{\n${fields.map(fieldNodeTemplate).join('\n')}\n}` : ''
  }`;
export const inputNodeTemplate = ({ name, description, type, args }: ParserField) =>
  definitionTemplate({ name, description, type: { name: type.name } }) +
  `${args && args.length ? `{\n${args.map(inputFieldNodeTemplate).join('\n')}\n}` : ''}`;

export const directiveNodeTemplate = ({ name, description, type, fields }: ParserRoot) =>
  `${definitionTemplate({ description, name: `@${name}`, type })}${
    fields && fields.length
      ? `(${fields.map((a) => `${a.name}:${resolveFieldType(a)}${argsResolver(a)}`).join(', ')})`
      : ''
  } on ${(type.directiveOptions || []).join(' | ')}`;

export const unionNodeTemplate = (
  { name, description }: Pick<ParserRoot, 'description' | 'name'>,
  types: string[]
) =>
  `${definitionTemplate({
    name,
    description,
    type: { name: TypeDefinition.UnionTypeDefinition }
  })}${types && types.length ? `= ${types.join(' | ')}` : ``}`;

export const enumNodeTemplate = (
  { name, description }: Pick<ParserRoot, 'description' | 'name'>,
  values: Array<Pick<ParserRoot, 'description' | 'name'>>
) =>
  `${definitionTemplate({ name, description, type: { name: TypeDefinition.EnumTypeDefinition } })}${
    values && values.length
      ? `{\n${values
          .map((v) => `${descriptionResolver(v.description, '\t')}\t${v.name}`)
          .join(',\n')}\n}`
      : ''
  }`;
export const scalarNodeTemplate = ({
  name,
  description
}: Pick<ParserField, 'description' | 'name'>) =>
  definitionTemplate({ name, description, type: { name: TypeDefinition.ScalarTypeDefinition } });

export const inputFieldNodeTemplate = (f: ParserField) =>
  `${descriptionResolver(f.description, '\t')}\t${f.name} : ${resolveFieldType(f)}${argsResolver(
    f
  )}`;
export const fieldNodeTemplate = (f: ParserField) =>
  `${descriptionResolver(f.description, '\t')}\t${f.name}${
    f.args && f.args.length
      ? `(${f.args.map((a) => `${a.name}:${resolveFieldType(a)}${argsResolver(a)}`).join(', ')})`
      : ''
  } : ${resolveFieldType(f)}`;
