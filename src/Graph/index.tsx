import { NodeOption, Diagram, NodeUtils, Node, Link } from 'graphsource';
import { help } from './help';
import { TreeToNodes } from '../TreeToNodes';
import { Parser } from '../Parser';
import { NodesToTree } from '../NodesToTree';
import { ObjectTypes, EditorNodeDefinition, AcceptedEditorNodeDefinition } from '../Models';

export class GraphController {
  diagram?: Diagram;
  public definitions?: EditorNodeDefinition[];
  passSchema?: (schema: string) => void;
  parser = new Parser();
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element);
    this.loadDefinitions();
  };
  loadOldNodes = () => {};
  load = (schema: string) => {
    const tree = this.parser.parse(schema);
    const result = TreeToNodes.resolveTree(tree, this.definitions!);
    this.diagram!.setDefinitions(this.definitions!);
    NodeUtils.beautifyDiagram(result.nodes);
    this.diagram!.setNodes(result.nodes);
    this.serialise({
      nodes: result.nodes,
      links: result.links
    });
    this.diagram!.setLinks(result.links);
  };
  setPassSchema(fn: (schema: string) => void) {
    this.passSchema = fn;
  }
  serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }) => {
    const schema = NodesToTree.parse(nodes, links);
    this.passSchema && this.passSchema(schema);
  };
  loadDefinitions = () => {
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
    const fieldDefinitionsByParent = (types: string[]) => (
      _: EditorNodeDefinition,
      defs: EditorNodeDefinition[]
    ): AcceptedEditorNodeDefinition[] =>
      getParents(
        types.map((name) =>
          defs.filter((def) => def.parent && def.parent.type === name && def.data && def.data.field)
        )
      );
    const argumentDefinitionsByParent = (types: string[]) => (
      _: EditorNodeDefinition,
      defs: EditorNodeDefinition[]
    ): AcceptedEditorNodeDefinition[] =>
      getParents(
        types.map((name) =>
          defs.filter(
            (def) => def.parent && def.parent.type === name && def.data && def.data.argument
          )
        )
      );
    const noInputsFieldDefinitionsByParent = (types: string[]) => (
      _: EditorNodeDefinition,
      defs: EditorNodeDefinition[]
    ): AcceptedEditorNodeDefinition[] =>
      getParents(
        types.map((name) =>
          defs.filter((def) => def.parent && def.parent.type === name && !def.node.inputs)
        )
      );

    const options: NodeOption[] = [
      {
        name: 'required',
        help:
          'Check this if this node is required for creation of the type or is required in input | interface'
      },
      {
        name: 'array',
        help:
          "Check this if you want a list here for example 'Hello' is a String however ['Hello', 'Me', 'World', 'Sloth'] its an array of strings"
      },
      {
        name: 'arrayRequired',
        help: 'Check this if you want a list here and you dont want null'
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
          acceptsInputs: argumentInstance.acceptsInputs
        } as EditorNodeDefinition)
    );
    const implementsObject: EditorNodeDefinition = {
      node: {
        name: 'implementsNode'
      },
      type: 'implements',
      acceptsInputs: noInputsFieldDefinitionsByParent([ObjectTypes.interface]),
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
      object: true,
      acceptsInputs: (d, defs) =>
        fieldDefinitionsByParent([
          ObjectTypes.type,
          ObjectTypes.interface,
          ObjectTypes.union,
          ObjectTypes.enum,
          ObjectTypes.scalar
        ])(d, defs).concat(
          [...builtInScalarFields].map(nodeDefinitionToAcceptedEditorNodeDefinition)
        ),
      instances: [fieldInstance]
    };
    const builtInTypeObject: EditorNodeDefinition = {
      node: createOND('type'),
      type: 'type',
      help: help.type,
      object: true,
      acceptsInputs: (d, defs) =>
        fieldDefinitionsByParent([
          ObjectTypes.type,
          ObjectTypes.interface,
          ObjectTypes.union,
          ObjectTypes.enum,
          ObjectTypes.scalar
        ])(d, defs).concat(
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
      object: true,
      acceptsInputs: (d, defs) =>
        fieldDefinitionsByParent([ObjectTypes.enum, ObjectTypes.scalar])(d, defs)
          .concat(noInputsFieldDefinitionsByParent([ObjectTypes.input])(d, defs))
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
      object: true,
      instances: [fieldInstance, argumentInstance]
    };
    const builtInUnionObject: EditorNodeDefinition = {
      node: createOND('union'),
      type: 'union',
      help: help.union,
      acceptsInputs: noInputsFieldDefinitionsByParent([ObjectTypes.type]),
      instances: [fieldInstance],
      object: true
    };
    const builtInEnumObject: EditorNodeDefinition = {
      node: createOND('enum'),
      type: 'enum',
      help: help.enum,
      instances: [fieldInstance, argumentInstance],
      object: true,
      acceptsInputs: (d, defs) => [{ definition: builtInEnumValue }]
    };
    const nodeDefinitions: EditorNodeDefinition[] = [
      ...builtInScalarFields,
      ...builtInScalarArguments,
      builtInEnumObject,
      builtInEnumValue,
      builtInInputObject,
      builtInInterfaceObject,
      builtInScalarObject,
      builtInTypeObject,
      builtInUnionObject,
      implementsObject
    ];

    this.definitions = nodeDefinitions;

    this.diagram!.setDefinitions(this.definitions);
    this.diagram!.setSerialisationFunction(this.serialise);
  };
}
