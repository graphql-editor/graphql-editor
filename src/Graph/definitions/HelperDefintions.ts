import { EditorNodeDefinition } from '../../Models';
import { Helpers, TypeDefinition, TypeSystemDefinition, ValueDefinition } from '../../Models/Spec';
import { help } from './help';
import { Utils } from './Utils';

export class HelperDefinitions {
  static generate() {
    const implementsObject: EditorNodeDefinition = {
      node: {
        notEditable: true,
        name: undefined
      },
      type: Helpers.Implements,
      data: {
        type: Helpers.Implements,
        for: [TypeDefinition.ObjectTypeDefinition]
      },
      acceptsInputs: (d, defs) =>
        Utils.dataForTypes(defs, [Helpers.Implements]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      help: help.implements
    };
    const directivesObject: EditorNodeDefinition = {
      node: {
        notEditable: true,
        name: undefined
      },
      type: Helpers.Directives,
      data: {
        type: Helpers.Directives,
        for: [
          TypeSystemDefinition.FieldDefinition,
          TypeDefinition.ObjectTypeDefinition,
          TypeDefinition.EnumTypeDefinition,
          TypeDefinition.InputObjectTypeDefinition,
          TypeDefinition.InterfaceTypeDefinition,
          TypeDefinition.UnionTypeDefinition,
          TypeDefinition.ScalarTypeDefinition,
          ValueDefinition.EnumValueDefinition,
          ValueDefinition.InputValueDefinition
        ]
      },
      acceptsInputs: (d, defs) =>
        Utils.dataForTypes(defs, [Helpers.Directives]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      help: help.directives
    };
    return [implementsObject, directivesObject];
  }
}
