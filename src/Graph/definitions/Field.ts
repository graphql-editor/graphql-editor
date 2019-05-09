import { EditorNodeDefinition } from '../../Models';
import { TypeDefinition, TypeSystemDefinition } from '../../Models/Spec';
import { Utils } from './Utils';

export const FieldInstance: Partial<EditorNodeDefinition> & Pick<EditorNodeDefinition, 'node'> = {
  options: Utils.ArrayNonNullOptions,
  data: {
    type: TypeSystemDefinition.FieldDefinition,
    for: [TypeDefinition.InterfaceTypeDefinition, TypeDefinition.ObjectTypeDefinition]
  },
  acceptsInputs: (d, defs) =>
    Utils.dataForTypes(defs, [TypeSystemDefinition.FieldDefinition]).map(
      Utils.nodeDefinitionToAcceptedEditorNodeDefinition
    ),
  node: {
    ...Utils.createOND(),
    outputs: []
  },
  instances: undefined
};
