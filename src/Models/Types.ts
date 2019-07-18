import { GraphQLNodeParams } from 'graphql-zeus';
import { AcceptedNodeDefinition, NodeDefinition } from 'graphsource';

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
