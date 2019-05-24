import { Node, NodeOption } from 'graphsource';
import { EditorNodeDefinition, GraphQLNodeParams } from '../../Models';
import {
  Directive,
  Helpers,
  Instances,
  TypeDefinition,
  TypeSystemDefinition,
  Value,
  ValueDefinition
} from '../../Models/Spec';
import { ArgumentInstance } from './Argument';
import { FieldInstance } from './Field';
import { help } from './help';
import { InputValueInstance } from './InputValue';
import { Utils } from './Utils';

/**
 * Class generating all TypeDefinitions from GraphQL and DirectiveDefinition
 *
 * @export
 * @class TypeDefinitions
 */
export class TypeDefinitions {
  /**
   * method generating definitions
   *
   * @static
   * @returns {EditorNodeDefinition[]}
   * @memberof TypeDefinitions
   */
  static generate(stitchNodes: Array<Node<GraphQLNodeParams>>): EditorNodeDefinition[] {
    const generateTypeDefinition = ({
      acceptsInputs,
      node = Utils.createOND(),
      options,
      type,
      help,
      instances = []
    }: {
      type: TypeDefinition | TypeSystemDefinition;
      acceptsInputs: EditorNodeDefinition['acceptsInputs'];
      node?: EditorNodeDefinition['node'];
      options?: NodeOption[];
      help: string;
      instances?: Array<Partial<EditorNodeDefinition>>;
    }) => {
      const builtInTypeObject: EditorNodeDefinition = {
        node,
        type,
        data: {
          type
        },
        help,
        options,
        root: true,
        acceptsInputs,
        instances
      };
      return builtInTypeObject;
    };

    const ObjectTypeDefinition = generateTypeDefinition({
      help: help.type,
      type: TypeDefinition.ObjectTypeDefinition,
      options: Utils.rootOptions,
      acceptsInputs: (d, defs, _) =>
        Utils.displayAsCategories(
          Utils.sortByParentType(Utils.dataForTypes(defs, [TypeDefinition.ObjectTypeDefinition]))
        ),
      instances: [
        {
          ...FieldInstance
        },
        {
          ...FieldInstance,
          data: {
            type: TypeSystemDefinition.UnionMemberDefinition,
            for: [TypeDefinition.UnionTypeDefinition]
          }
        }
      ]
    });

    const InterfaceTypeDefinition = generateTypeDefinition({
      help: help.interface,
      type: TypeDefinition.InterfaceTypeDefinition,
      acceptsInputs: (d, defs, _) =>
        Utils.displayAsCategories(
          Utils.sortByParentType(Utils.dataForTypes(defs, [TypeDefinition.InterfaceTypeDefinition]))
        ),
      instances: [
        {
          ...FieldInstance,
          data: {
            ...FieldInstance.data,
            for: [...FieldInstance.data!.for!, Helpers.Implements]
          }
        }
      ]
    });

    const EnumTypeDefinition = generateTypeDefinition({
      help: help.enum,
      type: TypeDefinition.EnumTypeDefinition,
      acceptsInputs: (d, defs, _) =>
        Utils.dataForTypes(defs, [TypeDefinition.EnumTypeDefinition]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      instances: [
        {
          ...FieldInstance
        },
        {
          ...InputValueInstance,
          help: help.EnumValue,
          instances: [
            {
              ...ArgumentInstance,
              node: {
                notEditable: true,
                name: undefined
              },
              acceptsInputs: (d, defs, _) =>
                defs
                  .filter((d) => d.data && d.data.type === Value.EnumValue)
                  .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
            }
          ],
          acceptsInputs: (d, defs, _) =>
            defs
              .filter((d) => d.data && d.data.type === Value.EnumValue)
              .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      ]
    });
    const ScalarTypeDefintion = generateTypeDefinition({
      help: help.scalar,
      type: TypeDefinition.ScalarTypeDefinition,
      acceptsInputs: (d, defs, _) => {
        return Utils.dataForTypes(defs, [TypeDefinition.ScalarTypeDefinition]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        );
      },
      instances: [
        {
          ...FieldInstance
        },
        {
          ...InputValueInstance,
          help: help.scalar,
          instances: [
            {
              ...ArgumentInstance,
              node: {
                notEditable: true,
                name: undefined
              },
              acceptsInputs: (d, defs, _) =>
                defs
                  .filter((d) => d.data && d.data.type === Value.StringValue)
                  .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
            }
          ],
          acceptsInputs: (d, defs, _) =>
            defs
              .filter((d) => d.data && d.data.type === Value.StringValue)
              .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      ]
    });

    const UnionTypeDefinition = generateTypeDefinition({
      help: help.union,
      type: TypeDefinition.UnionTypeDefinition,
      acceptsInputs: (d, defs, _) =>
        Utils.dataForTypes(defs, [TypeDefinition.UnionTypeDefinition]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      instances: [
        {
          ...FieldInstance
        }
      ]
    });

    const InputObjectTypeDefinition = generateTypeDefinition({
      help: help.input,
      type: TypeDefinition.InputObjectTypeDefinition,
      acceptsInputs: (d, defs, _) =>
        Utils.displayAsCategories(
          Utils.sortByParentType(
            Utils.dataForTypes(defs, [TypeDefinition.InputObjectTypeDefinition])
          )
        ),
      instances: [
        {
          ...InputValueInstance,
          acceptsInputs: (d, defs, _) => {
            return Utils.dataForTypes(defs, [ValueDefinition.InputValueDefinition]).map(
              Utils.nodeDefinitionToAcceptedEditorNodeDefinition
            );
          },
          instances: [
            {
              ...ArgumentInstance,
              acceptsInputs: (d, defs, _) =>
                Utils.dataForTypes(defs, [ValueDefinition.InputValueDefinition]).map(
                  Utils.nodeDefinitionToAcceptedEditorNodeDefinition
                )
            }
          ]
        }
      ]
    });
    const DirectiveDefinition = generateTypeDefinition({
      help: help.directive,
      type: TypeSystemDefinition.DirectiveDefinition,
      options: Object.keys(Directive).map((d) => ({ name: d, help: d })),
      acceptsInputs: (d, defs, _) =>
        Utils.displayAsCategories(
          Utils.sortByParentType(
            Utils.dataForTypes(defs, [TypeSystemDefinition.DirectiveDefinition])
          )
        ),
      instances: [
        {
          data: {
            type: Instances.Directive,
            for: [Helpers.Directives]
          },
          node: {
            notEditable: true,
            name: undefined
          },
          options: undefined,
          instances: undefined,
          acceptsInputs: (d, defs, _, nodes) => {
            return Utils.displayAsCategories(
              Utils.sortByParentType(Utils.getDefinitionsFromParent(d, nodes!.concat(stitchNodes)))
            );
          }
        }
      ]
    });

    return [
      ObjectTypeDefinition,
      InputObjectTypeDefinition,
      UnionTypeDefinition,
      EnumTypeDefinition,
      ScalarTypeDefintion,
      InterfaceTypeDefinition,
      DirectiveDefinition
    ];
  }
}
