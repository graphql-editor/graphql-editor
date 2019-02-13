import { NodeDefinition, AcceptedNodeDefinition } from 'graphsource';

export enum ScalarTypes {
  String = 'String',
  Boolean = 'Boolean',
  ID = 'ID',
  Int = 'Int',
  Float = 'Float',
  EnumValue = 'EnumValue',
  DefaultValue = 'DefaultValue'
}
export enum ObjectTypes {
  type = 'type',
  interface = 'interface',
  input = 'input',
  enum = 'enum',
  union = 'union',
  scalar = 'scalar'
}

export enum Operations {
  query = 'query',
  mutation = 'mutation',
  subscription = 'subscription'
}

export interface GraphQLNodeParams {
  argument?: boolean;
  field?: boolean;
  unionType?: boolean;
  implements?: boolean;
  enumValue?: boolean;
  defaultValue?: boolean;
  defaultEnumValue?: boolean;
}

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
