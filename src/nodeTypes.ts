export enum nodeTypes {
  type = 'type',
  argument = 'argument',
  input = 'input',
  enum = 'enum',
  union = 'union',
  array = 'array',
  query = 'query',
  mutation = 'mutation',
  interface = 'interface'
}

export enum argumentTypes {
  String = 'String',
  Int = 'Int',
  Float = 'Float',
  Boolean = 'Boolean',
  ID = 'ID'
}

export enum SubTypes {
  definition = 'definition',
  clone = 'clone',
  field = 'field',
}

export type allTypes = keyof typeof nodeTypes | keyof typeof argumentTypes