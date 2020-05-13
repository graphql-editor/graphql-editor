import { GraphQLNodeParams } from 'graphql-zeus';
import { AcceptedNodeDefinition, NodeDefinition, Node } from 'graphsource';

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;
export type EditorNode = Node<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;

export interface PassedSchema {
  code: string;
  libraries?: string;
}
