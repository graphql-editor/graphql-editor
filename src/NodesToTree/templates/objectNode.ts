import { GraphQLTemplateField, BaseField } from '../../Models';

const isArray = (f: BaseField, type: string) => (f.array ? `[${type}]` : type);
const isRequired = (f: BaseField, type: string) => (f.required ? `${type}!` : type);
const isArrayRequired = (f: BaseField, type: string) => (f.arrayRequired ? `${type}!` : type);
const resolveFieldType = (f: BaseField) => isArrayRequired(f, isArray(f, isRequired(f, f.type)));

const descriptionResolver = (description?: string, prefix = '') =>
  description ? `${prefix}"""\n${prefix}${description}\n${prefix}"""\n` : '';

const argsResolver = (f: GraphQLTemplateField) =>
  f.args && f.args.length
    ? f.array
      ? ` = [${f.args.map((a) => a.name).join(', ')}]`
      : ` = ${f.args[0].name}`
    : '';

export const rootFieldTemplate = ({
  description,
  name,
  type
}: Pick<GraphQLTemplateField, 'description' | 'name' | 'type'>) =>
  `${descriptionResolver(description)}${type} ${name}`;

export const typeNodeTemplate = ({
  name,
  description,
  type,
  interfaces,
  fields
}: {
  name: string;
  type: string;
  description?: string;
  interfaces?: string[];
  fields?: GraphQLTemplateField[];
}) =>
  rootFieldTemplate({ name, description, type }) +
  `${interfaces && interfaces.length ? ` implements ${interfaces.join(',')}` : ''}${
    fields && fields.length ? `{\n${fields.map(fieldNodeTemplate).join('\n')}\n}` : ''
  }`;
export const inputNodeTemplate = ({
  name,
  description,
  type,
  fields
}: {
  name: string;
  type: string;
  description?: string;
  fields?: GraphQLTemplateField[];
}) =>
  rootFieldTemplate({ name, description, type }) +
  `${fields && fields.length ? `{\n${fields.map(inputFieldNodeTemplate).join('\n')}\n}` : ''}`;

export const unionNodeTemplate = (
  { name, description }: Pick<GraphQLTemplateField, 'description' | 'name'>,
  types: string[]
) => `${rootFieldTemplate({ name, description, type: 'union' })} = ${types.join(' | ')}`;

export const enumNodeTemplate = (
  { name, description }: Pick<GraphQLTemplateField, 'description' | 'name'>,
  values: Pick<GraphQLTemplateField, 'description' | 'name'>[]
) =>
  `${rootFieldTemplate({ name, description, type: 'enum' })} {\n${values
    .map((v) => `${descriptionResolver(v.description, '\t')}\t${v.name}`)
    .join(',\n')}\n}`;
export const scalarNodeTemplate = ({
  name,
  description
}: Pick<GraphQLTemplateField, 'description' | 'name'>) =>
  rootFieldTemplate({ name, description, type: 'scalar' });

export const inputFieldNodeTemplate = (f: GraphQLTemplateField) =>
  `${descriptionResolver(f.description, '\t')}\t${f.name} : ${resolveFieldType(f)}${argsResolver(
    f
  )}`;
export const fieldNodeTemplate = (f: GraphQLTemplateField) =>
  `${descriptionResolver(f.description, '\t')}\t${f.name}${
    f.args && f.args.length
      ? `(${f.args.map((a) => `${a.name}:${resolveFieldType(a)}`).join(', ')})`
      : ''
  } : ${resolveFieldType(f)}`;
