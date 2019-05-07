import { EditorNodeDefinition } from '../../Models';

import { ScalarTypes, Type, Value, ValueDefinition } from '../../Models/Spec';
import { help } from '../help';
import { InputValueInstance } from './InputValue';
import { NamedTypeInstance } from './NamedType';
import { Utils } from './Utils';
export class ScalarDefinitions {
  static counter = 0;
  static generate() {
    const generateScalarDefinitions = (
      type: ScalarTypes,
      valueType: Value,
      helpText: string
    ): EditorNodeDefinition[] => {
      const scalarDefinitions: EditorNodeDefinition[] = [
        {
          ...NamedTypeInstance,
          type,
          help: helpText,
          node: Utils.createOND(type)
        },
        {
          type,
          data: {
            type: valueType
          },
          help: helpText,
          node: { ...Utils.createOND(valueType), inputs: null }
        },
        {
          ...InputValueInstance,
          type,
          help: helpText,
          node: Utils.createOND(type),
          instances: [
            {
              data: {
                type: ''
              },
              acceptsInputs: (d, defs, _, nodes) =>
                defs
                  .filter((d) => d.data && d.data.type === valueType)
                  .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
            }
          ],
          acceptsInputs: (d, defs, _, nodes) =>
            defs
              .filter((d) => d.data && d.data.type === valueType)
              .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      ];
      return scalarDefinitions;
    };
    const BooleanField: EditorNodeDefinition = {
      ...NamedTypeInstance,
      type: ScalarTypes.Boolean,
      help: help.Boolean,
      node: Utils.createOND('Boolean')
    };
    const BooleanValue: EditorNodeDefinition = {
      type: ScalarTypes.Boolean,
      data: {
        type: Value.BooleanValue
      },
      help: help.Boolean,
      node: { ...Utils.createOND('Boolean'), inputs: null }
    };
    const BooleanArgument: EditorNodeDefinition = {
      ...InputValueInstance,
      type: ScalarTypes.Boolean,
      help: help.Boolean,
      node: Utils.createOND('Boolean'),
      instances: [],
      acceptsInputs: (d, defs, _, nodes) =>
        defs
          .filter((d) => d.data && d.data.type === Value.BooleanValue)
          .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
    };
    const FloatField: EditorNodeDefinition = {
      ...NamedTypeInstance,
      type: ScalarTypes.Float,
      help: help.Float,
      node: Utils.createOND('Float')
    };
    const IDField: EditorNodeDefinition = {
      ...NamedTypeInstance,
      type: ScalarTypes.ID,
      help: help.ID,
      node: Utils.createOND('ID')
    };
    const IntField: EditorNodeDefinition = {
      ...NamedTypeInstance,
      type: ScalarTypes.Int,
      help: help.Int,
      node: Utils.createOND('Int')
    };
    const StringField: EditorNodeDefinition = {
      ...NamedTypeInstance,
      type: ScalarTypes.String,
      help: help.String,
      node: Utils.createOND('String')
    };
    return [BooleanField, BooleanArgument, FloatField, IDField, IntField, StringField];
  }
}
