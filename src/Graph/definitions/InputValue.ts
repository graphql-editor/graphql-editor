import { EditorNodeDefinition } from '../../Models';
import { Type, TypeDefinition, TypeSystemDefinition, ValueDefinition } from '../../Models/Spec';
import { Utils } from './Utils';

export const InputValueInstance: Partial<EditorNodeDefinition> = {
  options: Utils.ArrayNonNullOptions,
  data: {
    type: ValueDefinition.InputValueDefinition,
    for: [
      TypeDefinition.InputObjectTypeDefinition,
      Type.NamedType,
      TypeSystemDefinition.DirectiveDefinition
    ]
  }
};
