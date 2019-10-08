import {
  Directive,
  GraphQLNodeParams,
  Helpers,
  Instances,
  TypeDefinition,
  TypeDefinitionDisplayMap,
  TypeDefinitionDisplayStrings,
  TypeExtension,
  TypeSystemDefinition,
  TypeSystemDefinitionDisplayMap,
  TypeSystemDefinitionDisplayStrings,
  Value,
  ValueDefinition
} from 'graphql-zeus';
import { Node, NodeOption } from 'graphsource';
import { EditorNodeDefinition } from '../../Models';
import { ArgumentInstance } from './Argument';
import { ExtensionInstance } from './Extension';
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
      dataType,
      help,
      instances = []
    }: {
      type:
        | TypeDefinitionDisplayStrings
        | TypeSystemDefinitionDisplayStrings
        | TypeSystemDefinition;
      dataType: TypeDefinition | TypeSystemDefinition;
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
          type: dataType
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
      type: TypeDefinitionDisplayMap[TypeDefinition.ObjectTypeDefinition],
      dataType: TypeDefinition.ObjectTypeDefinition,
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
    ObjectTypeDefinition.instances!.push(
      ExtensionInstance(ObjectTypeDefinition, TypeExtension.ObjectTypeExtension)
    );

    const InterfaceTypeDefinition = generateTypeDefinition({
      help: help.interface,
      type: TypeDefinitionDisplayMap[TypeDefinition.InterfaceTypeDefinition],
      dataType: TypeDefinition.InterfaceTypeDefinition,
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
    InterfaceTypeDefinition.instances!.push(
      ExtensionInstance(InterfaceTypeDefinition, TypeExtension.InterfaceTypeExtension)
    );

    const EnumTypeDefinition = generateTypeDefinition({
      help: help.enum,
      type: TypeDefinitionDisplayMap[TypeDefinition.EnumTypeDefinition],
      dataType: TypeDefinition.EnumTypeDefinition,
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
    EnumTypeDefinition.instances!.push(
      ExtensionInstance(EnumTypeDefinition, TypeExtension.EnumTypeExtension)
    );
    const ScalarTypeDefintion = generateTypeDefinition({
      help: help.scalar,
      type: TypeDefinitionDisplayMap[TypeDefinition.ScalarTypeDefinition],
      dataType: TypeDefinition.ScalarTypeDefinition,
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
    ScalarTypeDefintion.instances!.push(
      ExtensionInstance(ScalarTypeDefintion, TypeExtension.ScalarTypeExtension)
    );

    const UnionTypeDefinition = generateTypeDefinition({
      help: help.union,
      type: TypeDefinitionDisplayMap[TypeDefinition.UnionTypeDefinition],
      dataType: TypeDefinition.UnionTypeDefinition,
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
    UnionTypeDefinition.instances!.push(
      ExtensionInstance(UnionTypeDefinition, TypeExtension.UnionTypeExtension)
    );

    const InputObjectTypeDefinition = generateTypeDefinition({
      help: help.input,
      type: TypeDefinitionDisplayMap[TypeDefinition.InputObjectTypeDefinition],
      dataType: TypeDefinition.InputObjectTypeDefinition,
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
    InputObjectTypeDefinition.instances!.push(
      ExtensionInstance(InputObjectTypeDefinition, TypeExtension.InputObjectTypeExtension)
    );
    const DirectiveDefinition = generateTypeDefinition({
      help: help.directive,
      type: TypeSystemDefinitionDisplayMap[TypeSystemDefinition.DirectiveDefinition],
      dataType: TypeSystemDefinition.DirectiveDefinition,
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
