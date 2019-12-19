import { Helpers, Instances } from 'graphql-zeus';
import { EditorNodeDefinition } from '../../Models';
import { Utils } from './Utils';

export const ImplementsInstance: Partial<EditorNodeDefinition> & Pick<EditorNodeDefinition, 'node'> = {
  options: Utils.ArrayNonNullOptions,
  data: {
    type: Instances.Implement,
    for: [Helpers.Implements],
  },
  acceptsInputs: undefined,
  node: {
    inputs: null,
    outputs: [],
    notEditable: true,
    name: undefined,
  },
  instances: undefined,
};
