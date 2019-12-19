import { AllTypes, GraphQLNodeParams, OperationType, ScalarTypes, TypeExtension, ValueDefinition } from 'graphql-zeus';
import { Node, NodeOption } from 'graphsource';
import { AcceptedEditorNodeDefinition, EditorNodeDefinition } from '../../Models';
import { help } from './help';
/**
 * Class responsible for Connection Utils
 */
export class Utils {
  /**
   * Options for nodes
   */
  static ArrayNonNullOptions: NodeOption[] = [
    {
      name: 'required',
      help: help.required,
    },
    {
      name: 'array',
      help: help.array,
    },
    {
      name: 'arrayRequired',
      help: help.arrayRequired,
    },
  ];
  /**
   * Options for root type node
   */
  static rootOptions: NodeOption[] = [
    {
      name: OperationType.query,
      help: help.query,
    },
    {
      name: OperationType.mutation,
      help: help.mutation,
    },
    {
      name: OperationType.subscription,
      help: help.subscription,
    },
  ];
  /**
   * create basic node to use with definitions
   */
  static createOND = (name: string | undefined = '', notEditable: boolean = false): EditorNodeDefinition['node'] => ({
    name,
    description: ``,
    inputs: [],
    outputs: null,
    notEditable,
  });
  /**
   * Map definitions to format accepted by graphsource menu
   */
  static nodeDefinitionToAcceptedEditorNodeDefinition = (
    definition: EditorNodeDefinition,
  ): AcceptedEditorNodeDefinition => ({ definition });
  /**
   * Get Node definitions accepting this definition
   */
  static dataForTypes = (defs: EditorNodeDefinition[], types: AllTypes[]) =>
    defs.filter((d) => d.data && d.data.for && types.find((t) => d.data!.for!.includes(t)));
  /**
   * Map definition sets as Categories
   */
  static displayAsCategories = (definitions: Record<string, EditorNodeDefinition[]>): AcceptedEditorNodeDefinition[] =>
    Object.keys(definitions)
      .filter((a) => definitions[a].length)
      .map((k) => ({
        category: {
          name: `${k} →`,
          definitions: definitions[k].map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition),
        },
      }));

  /**
   * Sort defintions by type of parent
   */
  static sortByParentType = (definitions: EditorNodeDefinition[]): Record<string, EditorNodeDefinition[]> => {
    const mapDefintions = definitions.reduce((a, b) => {
      let index = b.parent && b.parent.type;
      if (!index) {
        if (b.type in ScalarTypes) {
          index = 'scalars';
        }
      }
      if (!index) {
        index = 'helpers';
      }
      a[index] = a[index] || [];
      a[index].push(b);
      return a;
    }, {} as Record<string, EditorNodeDefinition[]>);
    Object.keys(mapDefintions).forEach((k) => {
      mapDefintions[k].sort((a, b) => (a.type > b.type ? 1 : -1));
    });
    return mapDefintions;
  };
  /**
   * Get Definitions of nodes instantiated by nodes connected to parent node
   */
  static getDefinitionsFromParent = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>,
  ): EditorNodeDefinition[] => {
    const parentNode = nodes!.filter(
      (n) =>
        !!n.editsDefinitions && !!n.editsDefinitions.find((ed) => ed.type === d.type && ed.data!.type === d.data!.type),
    )!;
    const possibleNodes = parentNode[0].inputs!.map((i) => i.editsDefinitions || []).reduce((a, b) => [...a, ...b], []);
    return possibleNodes;
  };
  /**
   * Get Definitions of nodes instantiated by nodes connected to parent node
   */
  static getDefinitionsFromParentInput = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>,
  ): EditorNodeDefinition[] => {
    const goToInput = (def: EditorNodeDefinition): EditorNodeDefinition => {
      if (def.data && def.data.type !== ValueDefinition.InputValueDefinition && def.parent) {
        return goToInput(def.parent);
      }
      return def;
    };
    const parentInputNode = goToInput(d);

    // Find if node was ever extended
    const parentInputNodeExtensionNodes = nodes!
      .filter(
        (n) =>
          n.definition.data && n.definition.data.type! in TypeExtension && n.definition.type === parentInputNode.type,
      )
      .map((pn) => pn.inputs)
      .reduce((a, b) => [...(a || []), ...(b || [])], []);

    const parentNode = nodes!.find(
      (n) =>
        !!n.editsDefinitions &&
        !!n.editsDefinitions.find(
          (ed) => ed.type === parentInputNode.type && ed.data!.type === parentInputNode.data!.type,
        ),
    )!;
    const baseAndExtensionInputs = [...(parentNode.inputs || []), ...(parentInputNodeExtensionNodes || [])];

    const possibleNodes = baseAndExtensionInputs
      .map((i) => i.editsDefinitions || [])
      .reduce((a, b) => [...a, ...b], []);
    return possibleNodes;
  };

  /**
   * Get Definitions of nodes connected to parent node
   */
  static getSameDefinitionsAsParent = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>,
  ): EditorNodeDefinition[] => {
    const parentNode = nodes!.find((n) => !!n.editsDefinitions && n.editsDefinitions.includes(d))!;
    const possibleNodes = parentNode.inputs!.map((i) => i.definition);
    return possibleNodes;
  };
}
