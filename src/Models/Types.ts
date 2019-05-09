import { AcceptedNodeDefinition, NodeDefinition } from 'graphsource';
import {
  Helpers,
  Instances,
  ScalarTypes,
  Type,
  TypeDefinition,
  TypeSystemDefinition,
  Value,
  ValueDefinition
} from './Spec';

export enum Directive {
  SCHEMA = 'SCHEMA',
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  FIELD_DEFINITION = 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION = 'ARGUMENT_DEFINITION',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  ENUM_VALUE = 'ENUM_VALUE',
  INPUT_OBJECT = 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION = 'INPUT_FIELD_DEFINITION'
}

export enum BuiltInDirectives {
  skip = 'skip',
  include = 'include',
  deprecated = 'deprecated'
}
export type AllTypes =
  | ScalarTypes
  | Value
  | ValueDefinition
  | TypeDefinition
  | TypeSystemDefinition
  | Instances
  | Helpers
  | Type;

export interface GraphQLNodeParams {
  type?: AllTypes;
  for?: AllTypes[];
}

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
