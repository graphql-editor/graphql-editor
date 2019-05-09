import { EditorNodeDefinition, Options } from '../../Models';

import { Instances, ScalarTypes, Value } from '../../Models/Spec';
import { help } from '../help';
import { FieldInstance } from './Field';
import { InputValueInstance } from './InputValue';
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
          ...FieldInstance,
          type,
          help: helpText
        },
        {
          type: valueType,
          data: {
            type: valueType
          },
          help: helpText,
          node: { ...Utils.createOND(), inputs: null, outputs: [] }
        },
        {
          ...InputValueInstance,
          type,
          help: helpText,
          instances: [
            {
              data: {
                type: Instances.Argument
              },
              options: [
                {
                  name: Options.array,
                  help: help.array
                }
              ],
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
    const BooleanDefintions = generateScalarDefinitions(
      ScalarTypes.Boolean,
      Value.BooleanValue,
      help.Boolean
    );
    const FloatDefintions = generateScalarDefinitions(
      ScalarTypes.Float,
      Value.FloatValue,
      help.Float
    );
    const IDDefintions = generateScalarDefinitions(ScalarTypes.ID, Value.StringValue, help.ID);
    const IntDefinitions = generateScalarDefinitions(ScalarTypes.Int, Value.IntValue, help.Int);
    const StringDefinitions = generateScalarDefinitions(
      ScalarTypes.String,
      Value.StringValue,
      help.String
    );
    return [
      ...BooleanDefintions,
      ...FloatDefintions,
      ...IDDefintions,
      ...IntDefinitions,
      ...StringDefinitions
    ];
  }
}
