import { EditorNodeDefinition } from '../../Models';
import { Type, TypeDefinition } from '../../Models/Spec';
import { Utils } from './Utils';

export const NamedTypeInstance: Partial<EditorNodeDefinition> = {
  options: Utils.ArrayNonNullOptions,
  data: {
    type: Type.NamedType,
    for: [TypeDefinition.InterfaceTypeDefinition, TypeDefinition.ObjectTypeDefinition]
  },
  acceptsInputs: (d, defs) =>
    Utils.dataForTypes(defs, [Type.NamedType]).map(
      Utils.nodeDefinitionToAcceptedEditorNodeDefinition
    ),
  instances: undefined
};
