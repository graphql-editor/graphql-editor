import { TypeDefinition, TypeSystemDefinition, Value, ValueDefinition } from 'graphql-zeus';
import { EditorNodeDefinition } from '../../Models';
import { Utils } from './Utils';

export const InputValueInstance: Partial<EditorNodeDefinition> & Pick<EditorNodeDefinition, 'node'> = {
  options: Utils.ArrayNonNullOptions,
  data: {
    type: ValueDefinition.InputValueDefinition,
    for: [
      TypeDefinition.InputObjectTypeDefinition,
      TypeSystemDefinition.FieldDefinition,
      TypeSystemDefinition.DirectiveDefinition,
      Value.ObjectValue,
    ],
  },
  node: {
    ...Utils.createOND(),
    outputs: [],
  },
};
