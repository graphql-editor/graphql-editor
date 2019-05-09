import { EditorNodeDefinition } from '../../Models';
import { Helpers, TypeDefinition } from '../../Models/Spec';
import { help } from './help';
import { Utils } from './Utils';

export class HelperDefinitions {
  static generate() {
    const implementsObject: EditorNodeDefinition = {
      node: {
        name: 'implementsNode'
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
        name: 'directives'
      },
      type: Helpers.Directives,
      data: {
        type: Helpers.Directives,
        for: [TypeDefinition.ObjectTypeDefinition]
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
