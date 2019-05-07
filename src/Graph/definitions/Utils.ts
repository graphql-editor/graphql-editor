import { Node, NodeOption } from 'graphsource';
import {
  AcceptedEditorNodeDefinition,
  AllTypes,
  EditorNodeDefinition,
  GraphQLNodeParams
} from '../../Models';
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
   * create basic node to use with definitions
   *
   * @static
   * @memberof Utils
   */
  static createOND = (name: string): EditorNodeDefinition['node'] => ({
    name: `${name}Node`,
    description: `${name} object node`,
    inputs: [],
    outputs: null
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
          name: `${definitions[0].parent!.type} →`,
          definitions: definitions.map(Utils.nodeDefinitionToAcceptedEditorNodeDefinition)
        }
      }))
  /**
   * Get Definitions of nodes connected to parent node
   *
   * @static
   * @memberof Utils
   */
  static getDefinitionsFromParent = (
    d: EditorNodeDefinition,
    nodes: Array<Node<GraphQLNodeParams>>
  ): EditorNodeDefinition[] => {
    const parentNode = nodes!.find(
      (n) => !!n.editsDefinitions && n.editsDefinitions.includes(d.parent!)
    )!;
    const possibleNodes = parentNode
      .inputs!.map((i) => i.editsDefinitions || [])
      .reduce((a, b) => [...a, ...b]);
    return possibleNodes;
  }
}
