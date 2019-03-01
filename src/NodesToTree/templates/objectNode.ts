import { ParserRoot, ParserField, Options } from '../../Models';

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

export const rootFieldTemplate = ({
  description,
  name,
  type
}: Pick<ParserRoot, 'description' | 'name' | 'type'>) =>
  `${descriptionResolver(description)}${type.name} ${name}`;

export const typeNodeTemplate = ({ name, description, type, interfaces, fields }: ParserRoot) =>
  rootFieldTemplate({ name, description, type }) +
  `${interfaces && interfaces.length ? ` implements ${interfaces.join(' & ')}` : ''}${
    fields && fields.length ? `{\n${fields.map(fieldNodeTemplate).join('\n')}\n}` : ''
  }`;
export const inputNodeTemplate = ({ name, description, type, args }: ParserField) =>
  rootFieldTemplate({ name, description, type: { name: type.name } }) +
  `${args && args.length ? `{\n${args.map(inputFieldNodeTemplate).join('\n')}\n}` : ''}`;

export const unionNodeTemplate = (
  { name, description }: Pick<ParserRoot, 'description' | 'name'>,
  types: string[]
) =>
  `${rootFieldTemplate({ name, description, type: { name: 'union' } })}${
    types && types.length ? `= ${types.join(' | ')}` : ``
  }`;

export const enumNodeTemplate = (
  { name, description }: Pick<ParserRoot, 'description' | 'name'>,
  values: Pick<ParserRoot, 'description' | 'name'>[]
) =>
  `${rootFieldTemplate({ name, description, type: { name: 'enum' } })}${
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
  rootFieldTemplate({ name, description, type: { name: 'scalar' } });

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
