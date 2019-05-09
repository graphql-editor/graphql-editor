import { EditorNodeDefinition } from '../../Models';
import { TypeDefinition, Value, ValueDefinition } from '../../Models/Spec';
import { help } from './help';
import { Utils } from './Utils';

export class ValueDefinitions {
  static generate() {
    const enumValue: EditorNodeDefinition = {
      node: { ...Utils.createOND(), inputs: null, outputs: [] },
      type: ValueDefinition.EnumValueDefinition,
      data: {
        type: ValueDefinition.EnumValueDefinition,
        for: [TypeDefinition.EnumTypeDefinition]
      },
      help: help.EnumValue,
      acceptsInputs: () => [],
      instances: [
        {
          data: {
            type: Value.EnumValue
          },
          node: {
            inputs: null,
            outputs: []
          }
        }
      ]
    };
    const objectValue: EditorNodeDefinition = {
      node: { ...Utils.createOND(Value.ObjectValue, true), inputs: [], outputs: [] },
      type: Value.ObjectValue,
      data: {
        type: Value.ObjectValue,
        for: [ValueDefinition.InputValueDefinition]
      },
      help: help.EnumValue,
      acceptsInputs: (d, defs, _, nodes, node) => {
        const [createdFromNode] = node!.outputs!;
        return Utils.getDefinitionsFromParentInput(createdFromNode.definition, nodes!).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        );
      },
      instances: undefined
    };
    return [enumValue, objectValue];
  }
}
