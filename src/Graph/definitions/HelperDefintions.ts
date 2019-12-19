import { Helpers, TypeDefinition, TypeSystemDefinition, ValueDefinition } from 'graphql-zeus';
import { EditorNodeDefinition } from '../../Models';
import { help } from './help';
import { Utils } from './Utils';

/**
 * Definitions for graph helpers that make it more clear to connect directives and implement interfaces
 */
export class HelperDefinitions {
  static generate() {
    const commentObject: EditorNodeDefinition = {
      node: {
        name: undefined,
      },
      type: Helpers.Comment,
      root: true,
      data: {
        type: Helpers.Comment,
      },
      help: help.implements,
    };
    const implementsObject: EditorNodeDefinition = {
      node: {
        notEditable: true,
        name: undefined,
      },
      type: Helpers.Implements,
      data: {
        type: Helpers.Implements,
        for: [TypeDefinition.ObjectTypeDefinition],
      },
      acceptsInputs: (d, defs) =>
        Utils.dataForTypes(defs, [Helpers.Implements]).map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition),
      help: help.implements,
    };
    const directivesObject: EditorNodeDefinition = {
      node: {
        notEditable: true,
        name: undefined,
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
          ValueDefinition.InputValueDefinition,
        ],
      },
      acceptsInputs: (d, defs) =>
        Utils.dataForTypes(defs, [Helpers.Directives]).map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition),
      help: help.directives,
    };
    return [implementsObject, directivesObject, commentObject];
  }
}
