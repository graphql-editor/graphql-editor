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

export enum NodeData {
  argument="argument",
  field="field",
  unionType="unionType",
  implements="implements",
  enumValue="enumValue",
  defaultValue="defaultValue",
  defaultEnumValue="defaultEnumValue"
}

export interface GraphQLNodeParams {
  type?:NodeData
}

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
