import { Node, NodeOption } from 'graphsource';
import {
  AcceptedEditorNodeDefinition,
  AllTypes,
  EditorNodeDefinition,
  GraphQLNodeParams
} from '../../Models';
import { OperationType, ValueDefinition } from '../../Models/Spec';
import { help } from '../help';
/**
 * Class responsible for Connection Utils
 *
 * @export
 * @class Utils
 */
export class Utils {
  /**
   * Options for nodes
   *
   * @static
   * @type {NodeOption[]}
   * @memberof Utils
   */
  static ArrayNonNullOptions: NodeOption[] = [
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
  /**
   * Options for root type node
   *
   * @static
   * @type {NodeOption[]}
   * @memberof Utils
   */
  static rootOptions: NodeOption[] = [
    {
      name: OperationType.query,
      help: help.query
    },
    {
      name: OperationType.mutation,
      help: help.mutation
    },
    {
      name: OperationType.subscription,
      help: help.subscription
    }
  ];
  /**
   * create basic node to use with definitions
   *
   * @static
   * @memberof Utils
   */
  static createOND = (
    name: string = '',
    notEditable: boolean = false
  ): EditorNodeDefinition['node'] => ({
    name,
    description: ``,
    inputs: [],
    outputs: null,
    notEditable
  })
  /**
   * Map definitions to format accepted by graphsource menu
   *
   * @static
   * @memberof Utils
   */
  static nodeDefinitionToAcceptedEditorNodeDefinition = (
    definition: EditorNodeDefinition
  ): AcceptedEditorNodeDefinition => ({ definition })
  /**
   * Get Node definitions accepting this definition
   *
   * @static
   * @memberof Utils
   */
  static dataForTypes = (defs: EditorNodeDefinition[], types: AllTypes[]) =>
    defs.filter((d) => d.data && d.data.for && types.find((t) => d.data!.for!.includes(t)))
  /**
   * Map definition sets as Categories
   *
   * @static
   * @memberof Utils
   */
  static displayAsCategories = (
    definitions: EditorNodeDefinition[][]
  ): AcceptedEditorNodeDefinition[] =>
    definitions
      .filter((a) => a.length)
      .map((definitions) => ({
        category: {
          name: definitions[0].parent ? `${definitions[0].parent!.type} →` : 'scalars →',
          definitions: definitions.map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      }))

  /**
   * Sort defintions by type of parent
   *
   * @static
   * @memberof Utils
   */
  static sortByParentType = (definitions: EditorNodeDefinition[]): EditorNodeDefinition[][] => {
    const mapDefintions = definitions.reduce(
      (a, b) => {
        const index = b.parent ? b.parent.type : 'scalars';
        a[index] = a[index] || [];
        a[index].push(b);
        return a;
      },
      {} as Record<string, EditorNodeDefinition[]>
    );
    return Object.values(mapDefintions);
  }
  /**
   * Get Definitions of nodes instantiated by nodes connected to parent node
   *
   * @static
   * @memberof Utils
   */
  static getDefinitionsFromParent = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>
  ): EditorNodeDefinition[] => {
    const parentNode = nodes!.find((n) => !!n.editsDefinitions && n.editsDefinitions.includes(d))!;
    const possibleNodes = parentNode
      .inputs!.map((i) => i.editsDefinitions || [])
      .reduce((a, b) => [...a, ...b]);
    return possibleNodes;
  }
  /**
   * Get Definitions of nodes instantiated by nodes connected to parent node
   *
   * @static
   * @memberof Utils
   */
  static getDefinitionsFromParentInput = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>
  ): EditorNodeDefinition[] => {
    const goToInput = (def: EditorNodeDefinition): EditorNodeDefinition => {
      if (def.data && def.data.type !== ValueDefinition.InputValueDefinition && def.parent) {
        return goToInput(def.parent);
      }
      return def;
    };
    const parentInputNode = goToInput(d);
    const parentNode = nodes!.find(
      (n) => !!n.editsDefinitions && n.editsDefinitions.includes(parentInputNode)
    )!;
    const possibleNodes = parentNode
      .inputs!.map((i) => i.editsDefinitions || [])
      .reduce((a, b) => [...a, ...b]);
    return possibleNodes;
  }

  /**
   * Get Definitions of nodes connected to parent node
   *
   * @static
   * @memberof Utils
   */
  static getSameDefinitionsAsParent = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>
  ): EditorNodeDefinition[] => {
    const parentNode = nodes!.find((n) => !!n.editsDefinitions && n.editsDefinitions.includes(d))!;
    const possibleNodes = parentNode.inputs!.map((i) => i.definition);
    return possibleNodes;
  }
}
