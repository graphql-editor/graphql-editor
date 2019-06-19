import { AcceptedNodeDefinition, NodeDefinition } from 'graphsource';
import { TypeDefinitionDisplayStrings, TypeSystemDefinitionDisplayStrings } from './DisplayMap';
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
  | TypeDefinitionDisplayStrings
  | TypeSystemDefinition
  | TypeSystemDefinitionDisplayStrings
  | Instances
  | Helpers
  | Type;

export interface GraphQLNodeParams {
  type?: AllTypes;
  for?: AllTypes[];
}

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
