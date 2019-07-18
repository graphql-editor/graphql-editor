import { GraphQLNodeParams, TypeDefinition, Value, ValueDefinition } from 'graphql-zeus';
import { Node } from 'graphsource';
import { EditorNodeDefinition } from '../../Models';
import { help } from './help';
import { Utils } from './Utils';

export class ValueDefinitions {
  static generate(stitchNodes: Array<Node<GraphQLNodeParams>>) {
    const enumValue: EditorNodeDefinition = {
      node: { ...Utils.createOND(), inputs: [], outputs: [] },
      type: ValueDefinition.EnumValueDefinition,
      data: {
        type: ValueDefinition.EnumValueDefinition,
        for: [TypeDefinition.EnumTypeDefinition]
      },
      help: help.EnumValue,
      acceptsInputs: (d, defs) =>
        Utils.dataForTypes(defs, [ValueDefinition.EnumValueDefinition]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      instances: [
        {
          data: {
            type: Value.EnumValue
          },
          node: {
            inputs: null,
            outputs: [],
            notEditable: true,
            name: undefined
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
        return Utils.getDefinitionsFromParentInput(
          createdFromNode.definition,
          nodes!.concat(stitchNodes)
        ).map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition);
      },
      instances: undefined
    };
    return [enumValue, objectValue];
  }
}
