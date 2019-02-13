import {
  EditorNodeDefinition,
  AcceptedEditorNodeDefinition,
  GraphQLNodeParams,
  ObjectTypes,
  Operations
} from '../Models';

import { NodeOption } from 'graphsource';

import { help } from './help';

export class Definitions {
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
    const getParents = (definitions: EditorNodeDefinition[][]): AcceptedEditorNodeDefinition[] =>
      definitions.filter((a) => a.length).map((definitions) => ({
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
      DefinitionsByParent(types, (d) => !!(d && d.field));
    const argumentDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.argument));
    const interfaceDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.implements));
    const unionTypeDefinitionsByParent = (types: string[]) =>
      DefinitionsByParent(types, (d) => !!(d && d.unionType));

    const objectDefinitionsByParent = fieldDefinitionsByParent([
      ObjectTypes.type,
      ObjectTypes.interface,
      ObjectTypes.union,
      ObjectTypes.enum,
      ObjectTypes.scalar
    ]);

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
        field: true
      },
      acceptsInputs: (d, defs) =>
        argumentDefinitionsByParent([ObjectTypes.scalar, ObjectTypes.enum, ObjectTypes.input])(
          d,
          defs
        ).concat(builtInScalarArguments.map(nodeDefinitionToAcceptedEditorNodeDefinition))
    };
    const argumentInstance: Partial<EditorNodeDefinition> = {
      options: instanceOptions,
      data: {
        argument: true
      },
      acceptsInputs: (d, defs) => [
        {
          definition: builtInDefaultValue
        }
      ]
    };
    const implementsInstance: Partial<EditorNodeDefinition> = {
      data: {
        implements: true
      },
      node: {
        inputs: null
      }
    };
    const builtInScalarFields = ([
      'String',
      'ID',
      'Int',
      'Float',
      'Boolean'
    ] as (keyof typeof help)[]).map(
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
        defaultValue: true
      },
      options
    };
    const builtInScalarArguments = builtInScalarFields.map(
      (sf) =>
        ({
          ...sf,
          data: {
            argument: true
          },
          acceptsInputs: argumentInstance.acceptsInputs
        } as EditorNodeDefinition)
    );
    const implementsObject: EditorNodeDefinition = {
      node: {
        name: 'implementsNode'
      },
      type: 'implements',
      acceptsInputs: interfaceDefinitionsByParent([ObjectTypes.interface]),
      help: help.implements
    };
    const builtInEnumValue: EditorNodeDefinition = {
      node: { ...createOND('EnumValue'), outputs: [], inputs: null },
      help: help.EnumValue,
      type: 'EnumValue',
      instances: [
        {
          data: {
            defaultEnumValue: true
          }
        }
      ],
      options
    };
    const builtInInterfaceObject: EditorNodeDefinition = {
      node: createOND('interface'),
      type: 'interface',
      help: help.interface,
      root: true,
      acceptsInputs: (d, defs) =>
        objectDefinitionsByParent(d, defs).concat(
          [...builtInScalarFields].map(nodeDefinitionToAcceptedEditorNodeDefinition)
        ),
      instances: [fieldInstance, implementsInstance]
    };
    const builtInTypeObject: EditorNodeDefinition = {
      node: createOND('type'),
      type: 'type',
      help: help.type,
      options: rootOptions,
      root: true,
      acceptsInputs: (d, defs) =>
        objectDefinitionsByParent(d, defs).concat(
          [implementsObject, ...builtInScalarFields].map(
            nodeDefinitionToAcceptedEditorNodeDefinition
          )
        ),
      instances: [
        //Field instance
        fieldInstance,
        // Union type instance
        {
          data: {
            unionType: true
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
      node: createOND('input'),
      type: 'input',
      help: help.input,
      root: true,
      acceptsInputs: (d, defs) =>
        fieldDefinitionsByParent([ObjectTypes.enum, ObjectTypes.scalar])(d, defs)
          .concat(argumentDefinitionsByParent([ObjectTypes.input])(d, defs))
          .concat(builtInScalarArguments.map(nodeDefinitionToAcceptedEditorNodeDefinition)),
      instances: [
        {
          ...argumentInstance,
          node: {
            name: 'inputNode',
            inputs: null
          }
        }
      ]
    };
    const builtInScalarObject: EditorNodeDefinition = {
      node: { ...createOND('scalar'), inputs: null, outputs: null },
      type: 'scalar',
      help: help.scalar,
      root: true,
      instances: [fieldInstance, argumentInstance]
    };
    const builtInUnionObject: EditorNodeDefinition = {
      node: createOND('union'),
      type: 'union',
      help: help.union,
      acceptsInputs: unionTypeDefinitionsByParent([ObjectTypes.type]),
      instances: [fieldInstance],
      root: true
    };
    const builtInEnumObject: EditorNodeDefinition = {
      node: createOND('enum'),
      type: 'enum',
      help: help.enum,
      instances: [fieldInstance, argumentInstance],
      root: true,
      acceptsInputs: (d, defs) => [{ definition: builtInEnumValue }]
    };
    const nodeDefinitions: EditorNodeDefinition[] = [
      ...builtInScalarFields,
      ...builtInScalarArguments,
      builtInDefaultValue,
      builtInEnumObject,
      builtInEnumValue,
      builtInInputObject,
      builtInInterfaceObject,
      builtInScalarObject,
      builtInTypeObject,
      builtInUnionObject,
      implementsObject
    ];
    return nodeDefinitions;
  }
}
