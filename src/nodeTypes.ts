export enum nodeTypes {
  type = 'type',
  argument = 'argument',
  input = 'input',
  enum = 'enum',
  union = 'union',
  array = 'array',
  query = 'query',
  mutation = 'mutation',
  subscription = 'subscription',
  interface = 'interface',
  implements = 'implements'
}

export enum argumentTypes {
  String = 'String',
  Int = 'Int',
  Float = 'Float',
  Boolean = 'Boolean',
  ID = 'ID'
}

export enum Macros {
  crud = 'crud'
}
export enum SubTypes {
  definition = 'definition',
  clone = 'clone',
  field = 'field',
  faker = 'faker'
}

export type allTypes = keyof typeof nodeTypes | keyof typeof argumentTypes | keyof typeof Macros
