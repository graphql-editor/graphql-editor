import {
  AcceptedEditorNodeDefinition,
  AllTypes,
  Directive,
  EditorNodeDefinition,
  GraphQLNodeParams,
  NodeData,
  Operations
} from '../Models';

import { Node, NodeOption } from 'graphsource';

import {
  ScalarTypes,
  Type,
  TypeDefinition,
  TypeSystemDefinition,
  Value,
  ValueDefinition
} from '../Models/Spec';
import { help } from './help';
export class Definitions {
  static counter = 0;
  static generate() {
    const createOND = (name: string): EditorNodeDefinition['node'] => ({
      name: `${name}Node`,
      description: `${name} object node`,
      inputs: [],
      outputs: null
    });
    const nodeDefinitionToAcceptedEditorNodeDefinition = (
      definition: EditorNodeDefinition
    ): AcceptedEditorNodeDefinition => ({ definition });

    const dataForTypes = (defs: EditorNodeDefinition[], types: AllTypes[]) =>
      defs
        .filter((d) => d.data && d.data.for && types.find((t) => d.data!.for!.includes(t)))
        .map((definition) => ({ definition }));

    const getParents = (definitions: EditorNodeDefinition[][]): AcceptedEditorNodeDefinition[] =>
      definitions
        .filter((a) => a.length)
        .map((definitions) => ({
          category: {
            name: `${definitions[0].parent!.type} →`,
            definitions: definitions.map(nodeDefinitionToAcceptedEditorNodeDefinition)
          }
        }));
    const DefinitionsByParent = (
      types: string[],
      dataFunction: (data?: GraphQLNodeParams) => boolean
    ) => (_: EditorNodeDefinition, defs: EditorNodeDefinition[]): AcceptedEditorNodeDefinition[] =>
      getParents(
        types.map((name) =>
          defs.filter((def) => def.parent && def.parent.type === name && dataFunction(def.data))
        )
      );
    const fieldDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.type === Type.NamedType));
    const argumentDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.type === ValueDefinition.InputValueDefinition));
    const directiveInputFieldDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.type === NodeData.directiveInputField));
    const interfaceDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.type === NodeData.implements));
    const directiveDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.type === NodeData.directives));

    const objectDefinitionsByParent = fieldDefinitionsByParent([
      TypeDefinition.ObjectTypeDefinition,
      TypeDefinition.InterfaceTypeDefinition,
      TypeDefinition.UnionTypeDefinition,
      TypeDefinition.EnumTypeDefinition,
      TypeDefinition.ScalarTypeDefinition
    ]);

    const getPossibleInputArgumentsForDirective = (
      d: EditorNodeDefinition,
      nodes: Node[]
    ): AcceptedEditorNodeDefinition[] => {
      const possibleNodes = nodes!
        .find((n) => !!n.editsDefinitions && n.editsDefinitions.includes(d.parent!))!
        .inputs!.map((i) => i.editsDefinitions || [])
        .reduce((a, b) => [...a, ...b])
        .filter(
          (d) => d.data && (d.data as GraphQLNodeParams).type === NodeData.argumentForDirective
        );
      console.log(possibleNodes);
      // TODO: Jeżelei jest scalar/enum/array to robimy valuenode jeżeli nie to zwracamy opcje będące argumentami inputa
      return possibleNodes.map((pn) => ({
        definition: pn
      }));
    };
    const options: NodeOption[] = [
      {
        name: 'required',
        help: help.required
      },
      {
        name: 'array',
        help: help.array
      },
      {
        name: 'arrayRequired',
        help: help.arrayRequired
      }
    ];
    const directiveOptions: NodeOption[] = Object.keys(Directive).map((d) => ({
      name: d,
      help: d
    }));
    const rootOptions: NodeOption[] = [
      {
        name: Operations.query,
        help: help.query
      },
      {
        name: Operations.mutation,
        help: help.mutation
      },
      {
        name: Operations.subscription,
        help: help.subscription
      }
    ];
    const instanceOptions = options;
    const fieldInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: Type.NamedType,
        for: [TypeDefinition.InterfaceTypeDefinition, TypeDefinition.ObjectTypeDefinition]
      },
      acceptsInputs: (d, defs) =>
        argumentDefinitionsByParent([
          TypeDefinition.ScalarTypeDefinition,
          TypeDefinition.EnumTypeDefinition,
          TypeDefinition.InputObjectTypeDefinition
        ])(d, defs).concat(
          builtInScalarArguments.map(nodeDefinitionToAcceptedEditorNodeDefinition)
        ),
      instances: undefined
    };
    // TODO: Dodać enumy default value tylko z enuma

    const argumentInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: ValueDefinition.InputValueDefinition,
        for: [
          Type.NamedType,
          TypeDefinition.InputObjectTypeDefinition,
          ValueDefinition.InputValueDefinition
        ]
      },
      acceptsInputs: (d, defs) => [
        {
          definition: builtInDefaultValue
        }
      ],
      instances: [
        {
          data: { type: NodeData.argumentForDirective },
          instances: undefined,
          options: instanceOptions,
          acceptsInputs: (d, defs, _, nodes) => {
            if (Object.keys(ScalarTypes).includes(d.parent!.type)) {
              return [
                {
                  definition: builtInDefaultValue
                }
              ];
            }
            return getPossibleInputArgumentsForDirective(d, nodes!);
          }
        }
      ]
    };
    const directiveInputArgumentInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: NodeData.directiveInputArgument
      },
      acceptsInputs: (d, defs, _, nodes) => getPossibleInputArgumentsForDirective(d, nodes!),
      instances: undefined
    };
    const directiveScalarArgumentInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: NodeData.directiveScalarArgument
      },
      acceptsInputs: argumentInstance.acceptsInputs,
      instances: undefined
    };
    const directiveScalarFieldInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: NodeData.directiveScalarField
      },
      acceptsInputs: argumentInstance.acceptsInputs,
      instances: [directiveScalarArgumentInstance]
    };
    const directiveInputFieldInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        type: NodeData.directiveInputField
      },
      instances: [directiveInputArgumentInstance]
    };
    const implementsInstance: Partial<EditorNodeDefinition> = {
      data: {
        type: NodeData.implements
      },
      node: {
        inputs: null
      },
      instances: undefined
    };
    const directivesInstance: Partial<EditorNodeDefinition> = {
      data: {
        type: NodeData.directives
      },
      acceptsInputs: (d, defs, _, nodes) => {
        const parentNode = nodes!.find(
          (n) => !!n.editsDefinitions && !!n.editsDefinitions.find((ed) => ed === d)
        );
        if (!parentNode!.inputs) {
          return [];
        }
        const directiveScalarValueDefinitions = defs.filter(
          (d) =>
            d.data &&
            (d.data.type === NodeData.directiveScalarArgument ||
              d.data.type === NodeData.directiveInputArgument)
        );
        return parentNode!.inputs.map((n) => ({
          definition: directiveScalarValueDefinitions.find((d) => d.type === n.name)
        }));
      },
      instances: undefined
    };
    const builtInScalarFields = (['String', 'ID', 'Int', 'Float', 'Boolean'] as Array<
      keyof typeof help
    >).map(
      (name) =>
        ({
          node: { ...createOND(name), outputs: [] },
          description: 'Scalar node',
          help: help[name],
          type: name,
          ...fieldInstance
        } as EditorNodeDefinition)
    );
    const builtInDefaultValue: EditorNodeDefinition = {
      node: { ...createOND('DefaultValue'), outputs: [], inputs: null },
      help: help.EnumValue,
      type: 'DefaultValue',
      data: {
        type: NodeData.defaultValue
      },
      options
    };
    const builtInScalarArguments = builtInScalarFields.map(
      (sf) =>
        ({
          ...sf,
          ...argumentInstance
        } as EditorNodeDefinition)
    );
    const builtInDirectiveScalarFields = builtInScalarFields.map(
      (sf) =>
        ({
          ...sf,
          ...directiveScalarFieldInstance
        } as EditorNodeDefinition)
    );
    const implementsObject: EditorNodeDefinition = {
      node: {
        name: 'implementsNode'
      },
      type: NodeData.implements,
      acceptsInputs: interfaceDefinitionsByParent([TypeDefinition.InterfaceTypeDefinition]),
      help: help.implements
    };
    const directivesObject: EditorNodeDefinition = {
      node: {
        name: 'directivesNode'
      },
      type: NodeData.directives,
      acceptsInputs: directiveDefinitionsByParent([TypeSystemDefinition.DirectiveDefinition]),
      help: help.directives
    };
    const builtInEnumValue: EditorNodeDefinition = {
      node: { ...createOND('EnumValue'), outputs: [], inputs: null },
      help: help.EnumValue,
      type: Value.EnumValue,
      instances: [
        {
          data: {
            type: NodeData.enumValue
          }
        }
      ],
      options: undefined
    };
    const builtInInterfaceObject: EditorNodeDefinition = {
      node: createOND(TypeDefinition.InterfaceTypeDefinition),
      type: TypeDefinition.InterfaceTypeDefinition,
      help: help.interface,
      root: true,
      acceptsInputs: (d, defs) =>
        objectDefinitionsByParent(d, defs).concat(
          [...builtInScalarFields].map(nodeDefinitionToAcceptedEditorNodeDefinition)
        ),
      instances: [fieldInstance, implementsInstance]
    };
    const builtInDirectiveObject: EditorNodeDefinition = {
      node: createOND(TypeSystemDefinition.DirectiveDefinition),
      type: TypeSystemDefinition.DirectiveDefinition,
      help: help.directive,
      options: directiveOptions,
      root: true,
      acceptsInputs: (d, defs) =>
        directiveInputFieldDefinitionsByParent([TypeDefinition.InputObjectTypeDefinition])(
          d,
          defs
        ).concat(builtInDirectiveScalarFields.map(nodeDefinitionToAcceptedEditorNodeDefinition)),
      instances: [directivesInstance]
    };
    const builtInTypeObject: EditorNodeDefinition = {
      node: createOND(TypeDefinition.ObjectTypeDefinition),
      type: TypeDefinition.ObjectTypeDefinition,
      help: help.type,
      options: rootOptions,
      root: true,
      acceptsInputs: (d, defs) =>
        objectDefinitionsByParent(d, defs).concat(
          [implementsObject, directivesObject, ...builtInScalarFields].map(
            nodeDefinitionToAcceptedEditorNodeDefinition
          )
        ),
      instances: [
        // Field instance
        fieldInstance,
        // Union type instance
        {
          data: {
            type: Type.NamedType,
            for: [TypeDefinition.UnionTypeDefinition]
          },
          node: {
            name: 'typeNode',
            inputs: null
          },
          options: instanceOptions
        }
      ]
    };
    const builtInInputObject: EditorNodeDefinition = {
      node: createOND(TypeDefinition.InputObjectTypeDefinition),
      type: TypeDefinition.InputObjectTypeDefinition,
      help: help.input,
      root: true,
      acceptsInputs: (d, defs) =>
        fieldDefinitionsByParent([
          TypeDefinition.EnumTypeDefinition,
          TypeDefinition.ScalarTypeDefinition
        ])(d, defs)
          .concat(argumentDefinitionsByParent([TypeDefinition.InputObjectTypeDefinition])(d, defs))
          .concat(builtInScalarArguments.map(nodeDefinitionToAcceptedEditorNodeDefinition)),
      instances: [
        {
          ...argumentInstance,
          node: {
            name: 'inputNode',
            inputs: null
          }
        },
        {
          ...directiveInputFieldInstance,
          node: {
            name: 'directiveInput',
            inputs: null
          }
        }
      ]
    };
    const builtInScalarObject: EditorNodeDefinition = {
      node: { ...createOND(TypeDefinition.ScalarTypeDefinition), inputs: null, outputs: null },
      type: TypeDefinition.ScalarTypeDefinition,
      help: help.scalar,
      root: true,
      instances: [fieldInstance, argumentInstance, directiveScalarFieldInstance]
    };
    const builtInUnionObject: EditorNodeDefinition = {
      node: createOND(TypeDefinition.UnionTypeDefinition),
      type: TypeDefinition.UnionTypeDefinition,
      help: help.union,
      instances: [fieldInstance],
      root: true,
      acceptsInputs: (d, defs) => dataForTypes(defs, [TypeDefinition.UnionTypeDefinition])
    };
    const builtInEnumObject: EditorNodeDefinition = {
      node: createOND(TypeDefinition.EnumTypeDefinition),
      type: TypeDefinition.EnumTypeDefinition,
      help: help.enum,
      instances: [fieldInstance, argumentInstance, directiveScalarFieldInstance],
      root: true,
      acceptsInputs: (d, defs) => [{ definition: builtInEnumValue }]
    };
    const nodeDefinitions: EditorNodeDefinition[] = [
      ...builtInScalarFields,
      ...builtInScalarArguments,
      ...builtInDirectiveScalarFields,
      builtInDefaultValue,
      builtInEnumObject,
      builtInEnumValue,
      builtInInputObject,
      builtInInterfaceObject,
      builtInScalarObject,
      builtInTypeObject,
      builtInUnionObject,
      builtInDirectiveObject,
      implementsObject,
      directivesObject
    ];
    return nodeDefinitions;
  }
}
