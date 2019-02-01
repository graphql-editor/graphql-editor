import { NodeDefinition, NodeOption, Diagram, NodeUtils } from 'graphsource';
import { help } from './help';
import { TreeToNodes } from '../TreeToNodes';
import { Parser } from '../Parser';

export class GraphController {
  diagram?: Diagram;
  public definitions?: NodeDefinition[];
  parser = new Parser();
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element);
    this.loadDefinitions();
  };
  loadOldNodes = () => {};
  load = (schema: string) => {
    const tree = this.parser.parse(schema);
    const result = TreeToNodes.resolveTree(tree.tree, this.definitions!);
    this.diagram!.setDefinitions(this.definitions!);
    NodeUtils.beautifyDiagram(result.nodes);
    this.diagram!.setNodes(result.nodes);
    this.diagram!.setLinks(result.links);
  };
  loadDefinitions = () => {
    const createOND = (name: string): NodeDefinition['node'] => ({
      name: `${name}Node`,
      description: `${name} object node`,
      inputs: [],
      outputs: null
    });
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
      }
    ];
    const instanceOptions = options;
    const builtInScalars = ['String', 'ID', 'Int', 'Float', 'Boolean'].map(
      (name) =>
        ({
          node: { ...createOND(name), outputs: [] },
          description: 'Scalar node',
          help: help[name],
          type: name,
          acceptsInputs: [],
          options
        } as NodeDefinition)
    );
    const builtInTypeObjects: NodeDefinition[] = ['type', 'interface'].map(
      (name) =>
        ({
          node: createOND(name),
          type: name,
          acceptsInputs: [],
          help: help[name],
          object: true,
          instanceOptions
        } as NodeDefinition)
    );
    const builtInInputObjects: NodeDefinition[] = ['input'].map(
      (name) =>
        ({
          node: createOND(name),
          type: name,
          acceptsInputs: [],
          help: help[name],
          object: true,
          instanceOptions
        } as NodeDefinition)
    );
    const builtInScalarObjects: NodeDefinition[] = ['scalar'].map(
      (name) =>
        ({
          node: { ...createOND(name), inputs: null, outputs: null },
          type: name,
          help: help[name],
          object: true,
          acceptsInputs: undefined,
          instanceOptions
        } as NodeDefinition)
    );
    const builtInUnionObjects: NodeDefinition[] = ['union'].map(
      (name) =>
        ({
          node: createOND(name),
          type: name,
          help: help[name],
          object: true,
          acceptsInputs: [builtInTypeObjects.find((bi) => bi.type === 'type')],
          instanceOptions
        } as NodeDefinition)
    );
    const builtInEnumObjects: NodeDefinition[] = ['enum'].map(
      (name) =>
        ({
          node: createOND(name),
          type: name,
          help: help[name],
          object: true,
          acceptsInputs: [builtInScalars.find((bi) => bi.type === 'String')],
          instanceOptions
        } as NodeDefinition)
    );
    const acceptedArguments = builtInScalars
      .concat(builtInTypeObjects)
      .concat(builtInEnumObjects)
      .concat(builtInScalarObjects)
      .concat(builtInUnionObjects);
    for (const scalar of builtInScalars) {
      scalar.acceptsInputs = [...acceptedArguments];
    }
    for (const object of builtInTypeObjects) {
      object.acceptsInputs = acceptedArguments.concat(builtInInputObjects);
    }
    for (const object of builtInInputObjects) {
      object.acceptsInputs = [...acceptedArguments];
    }
    for (const object of builtInScalarObjects) {
      object.instanceAcceptsInputs = [...acceptedArguments];
    }
    for (const object of builtInEnumObjects) {
      object.instanceAcceptsInputs = [...acceptedArguments];
    }
    for (const object of builtInUnionObjects) {
      object.instanceAcceptsInputs = [...acceptedArguments];
    }

    const nodeDefinitions: NodeDefinition[] = [
      ...builtInScalars,
      ...builtInTypeObjects,
      ...builtInInputObjects,
      ...builtInScalarObjects,
      ...builtInEnumObjects,
      ...builtInUnionObjects
    ];

    this.definitions = nodeDefinitions;

    this.diagram!.setDefinitions(this.definitions);
  };
}
