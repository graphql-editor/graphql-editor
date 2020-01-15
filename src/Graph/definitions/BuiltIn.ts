import { Directive, Helpers, Instances, Value } from 'graphql-zeus';
import { EditorNodeDefinition, EditorNode } from '../../Models';
import { Utils } from './Utils';

export const deprecated = (stitchNodes: Array<EditorNode>): EditorNodeDefinition => ({
  data: {
    for: [Helpers.Directives],
    type: Instances.Directive,
  },
  instances: undefined,
  main: undefined,
  root: undefined,
  node: {
    name: undefined,
    notEditable: true,
    description: '',
  },
  type: 'deprecated',
  options: [
    {
      name: Directive.FIELD_DEFINITION,
      help: 'fff',
    },
  ],
  acceptsInputs: (d, defs, _, nodes) => {
    return [
      {
        definition: reason(),
      },
    ];
  },
});
export const reason = (): EditorNodeDefinition => ({
  data: {
    type: Instances.Argument,
  },
  type: 'reason',
  acceptsInputs: (d, defs, _, nodes) => {
    return defs
      .filter((d) => d.data && d.data.type === Value.StringValue)
      .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition);
  },
  node: {
    name: undefined,
    notEditable: true,
  },
});
