import { NodeOption } from 'graphsource';
import { EditorNodeDefinition, Options } from '../../Models';
import {
  Directive,
  Helpers,
  Instances,
  TypeDefinition,
  TypeSystemDefinition,
  Value,
  ValueDefinition
} from '../../Models/Spec';
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
  static generate(): EditorNodeDefinition[] {
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
      acceptsInputs: (d, defs, _, nodes) =>
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
      acceptsInputs: (d, defs, _, nodes) =>
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
      acceptsInputs: (d, defs, _, nodes) =>
        Utils.dataForTypes(defs, [TypeDefinition.EnumTypeDefinition]).map(
          Utils.nodeDefinitionToAcceptedEditorNodeDefinition
        ),
      instances: [
        {
          ...FieldInstance
        },
        {
          ...InputValueInstance,
          acceptsInputs: (d, defs, _, nodes) =>
            Utils.getDefinitionsFromParent(d, nodes!)
              .filter((d) => d.data && d.data.type === Value.EnumValue)
              .map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      ]
    });
    const ScalarTypeDefintion = generateTypeDefinition({
      help: help.scalar,
      type: TypeDefinition.ScalarTypeDefinition,
      acceptsInputs: (d, defs, _, nodes) => [],
      instances: [
        {
          ...FieldInstance
        }
      ]
    });

    const UnionTypeDefinition = generateTypeDefinition({
      help: help.union,
      type: TypeDefinition.UnionTypeDefinition,
      acceptsInputs: (d, defs, _, nodes) =>
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
      acceptsInputs: (d, defs, _, nodes) =>
        Utils.displayAsCategories(
          Utils.sortByParentType(
            Utils.dataForTypes(defs, [TypeDefinition.InputObjectTypeDefinition])
          )
        ),
      instances: [
        {
          ...InputValueInstance,
          acceptsInputs: (d, defs, _, nodes) => {
            return Utils.dataForTypes(defs, [ValueDefinition.InputValueDefinition]).map(
              Utils.nodeDefinitionToAcceptedEditorNodeDefinition
            );
          },
          instances: [
            {
              node: {
                notEditable: true
              },
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
      acceptsInputs: (d, defs, _, nodes) =>
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
          acceptsInputs: (d, defs, _, nodes) =>
            Utils.displayAsCategories(
              Utils.sortByParentType(Utils.getDefinitionsFromParent(d, nodes!))
            )
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
