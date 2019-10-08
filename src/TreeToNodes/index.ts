import {
  GraphQLNodeParams,
  Helpers,
  ParserField,
  ParserTree,
  TypeExtension,
  TypeSystemDefinition
} from 'graphql-zeus';
import { Link, Node, NodeUtils } from 'graphsource';
import { EditorNodeDefinition } from '../Models';

/**
 * Transform Zeus ParserTree to Nodes and Node Definitions, this file should be refactored in future
 *
 * @export
 * @class TreeToNodes
 */
export class TreeToNodes {
  /**
   * Compare GraphQL Related data of two GraphQLNodeParams
   *
   * @static
   * @param d1 Params of node #1
   * @param d2 Params of node #2
   * @returns {boolean} params match
   * @memberof TreeToNodes
   */
  static compareData(
    d1: GraphQLNodeParams | undefined,
    d2: GraphQLNodeParams | undefined
  ): boolean {
    if (!d1 && d2) {
      return false;
    }
    if (d1 && !d2) {
      return false;
    }
    if (!d1 && !d2) {
      return true;
    }
    return d1!.type === d2!.type;
  }
  /**
   * Create new node and connect it too rootNode
   *
   * @param n ParserField
   * @param rootNode node to be connected with
   * @param links already existing links
   * @param nodeDefinitions already existing node definitions
   * @param nodes already existing nodes
   * @returns
   */
  static connectAndCreate = (
    n: ParserField,
    rootNode: Node,
    links: Link[],
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Array<Node<GraphQLNodeParams>>
  ): Node<GraphQLNodeParams> => {
    const createdNode = TreeToNodes.resolveField(n, nodeDefinitions, nodes, links);
    links.push({
      centerPoint: 0.5,
      o: createdNode,
      i: rootNode
    });
    rootNode.inputs!.push(createdNode);
    createdNode.outputs!.push(rootNode);
    nodes.push(createdNode);
    return createdNode;
  }
  /**
   * Create interface nodes
   *
   * @param interfaces interfaces names to be implemented and connected with node
   * @param rootNode node to be connected with
   * @param nodeDefinitions already existing nodeDefinitions
   * @param links already existing links
   * @param  nodes already existing nodes
   */
  static createInterfaces = (
    interfaces: string[],
    rootNode: Node,
    nodeDefinitions: EditorNodeDefinition[],
    links: Link[],
    nodes: Array<Node<GraphQLNodeParams>>
  ) => {
    const createdNode = TreeToNodes.connectAndCreate(
      {
        name: Helpers.Implements,
        type: {
          name: Helpers.Implements
        }
      },
      rootNode,
      links,
      nodeDefinitions,
      nodes
    );
    interfaces.forEach((i) => {
      TreeToNodes.connectAndCreate(
        {
          type: {
            name: i
          },
          name: i,
          data: {
            type: TypeSystemDefinition.FieldDefinition
          }
        },
        createdNode,
        links,
        nodeDefinitions,
        nodes
      );
    });
  }
  /**
   * Create connected directives helper node
   *
   * @param rootNode node to be connected with
   * @param nodeDefinitions already existing nodeDefinitions
   * @param links already existing links
   * @param nodes already existing nodes
   * @returns {Node<GraphQLNodeParams>} 'graphsource' ready Node
   * @memberof TreeToNodes
   */
  static createDirectivesHelper = (
    rootNode: Node,
    nodeDefinitions: EditorNodeDefinition[],
    links: Link[],
    nodes: Array<Node<GraphQLNodeParams>>
  ): Node<GraphQLNodeParams> => {
    return TreeToNodes.connectAndCreate(
      {
        name: Helpers.Directives,
        type: {
          name: Helpers.Directives
        }
      },
      rootNode,
      links,
      nodeDefinitions,
      nodes
    );
  }
  static createExtendHelper(f: ParserField): ParserField {
    return {
      args: [f],
      data: {
        type: Helpers.Extend
      },
      name: Helpers.Extend,
      type: {
        name: Helpers.Extend
      }
    } as ParserField;
  }
  /**
   * Return node given ParserField
   *
   * @static
   * @param root ParserField
   * @param nodeDefinitions already existing nodeDefinitions
   * @param nodes already existing nodes
   * @param links already existing links
   * @param [rootNode] node to be connected with
   * @memberof TreeToNodes
   */
  static resolveField(
    root: ParserField,
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Array<Node<GraphQLNodeParams>>,
    links: Link[],
    rootNode?: Node
  ): Node<GraphQLNodeParams> {
    let defs: EditorNodeDefinition[];
    if (root.data && root.data!.type! in TypeExtension) {
      defs = nodeDefinitions.filter((nd) => nd.type === root.name)!;
    } else {
      defs = nodeDefinitions.filter((nd) => nd.type === root.type.name)!;
    }
    let def = defs[0];
    if (defs.length > 1) {
      def = defs.find((d) => TreeToNodes.compareData(d.data, root.data))!;
    }
    const nodeCreated = NodeUtils.createBasicNode({ x: 0, y: 0 }, def, {
      name: root.name,
      description: root.description,
      options: root.type.options || root.type.directiveOptions || root.type.operations || []
    });
    const newDefinitions = NodeUtils.createObjectDefinition(def, root.name);
    newDefinitions.forEach((newDefinition) => {
      newDefinition.help = root.description || newDefinition.help;
      nodeDefinitions.push(newDefinition);
    });
    nodeCreated.editsDefinitions = newDefinitions;
    nodes.push(nodeCreated);
    if (rootNode) {
      links.push({
        centerPoint: 0.5,
        o: nodeCreated,
        i: rootNode
      });
      rootNode.inputs!.push(nodeCreated);
      nodeCreated.outputs!.push(rootNode);
    }
    return nodeCreated;
  }
  /**
   * Given the parser tree this function returns graphsource library ready nodes and links
   *
   * @static
   * @param tree tree generated by Parser from 'graphql-zeus'
   * @param nodeDefinitions predefined graphql definitions
   * @returns {{
   *     nodes: Array<Node<GraphQLNodeParams>>;
   *     links: Link[];
   *   }} 'graphsource' ready links and nodes
   * @memberof TreeToNodes
   */
  static resolveTree(
    tree: ParserTree,
    nodeDefinitions: EditorNodeDefinition[]
  ): {
    nodes: Array<Node<GraphQLNodeParams>>;
    links: Link[];
  } {
    const nodes: Array<Node<GraphQLNodeParams>> = [];
    const links: Link[] = [];
    const resolveAllFields = (
      parserFields: Array<{
        parserField: ParserField;
        node?: Node<GraphQLNodeParams>;
      }>
    ) => {
      const rootNodes = parserFields.map(({ parserField, node }) => {
        return {
          parserField,
          node: TreeToNodes.resolveField(parserField, nodeDefinitions, nodes, links, node)
        };
      });
      rootNodes
        .filter((pf) => pf.parserField.interfaces && pf.parserField.interfaces.length)
        .forEach((f) => {
          TreeToNodes.createInterfaces(
            f.parserField.interfaces!,
            f.node,
            nodeDefinitions,
            links,
            nodes
          );
        });

      const returnRootNodes = rootNodes
        .filter((rn) => rn.parserField.args && rn.parserField.args.length)
        .map((rn) =>
          rn.parserField.args!.map((a) => ({
            parserField: a,
            node: rn.node
          }))
        )
        .reduce((a, b) => [...a, ...b], []);
      if (returnRootNodes.length > 0) {
        resolveAllFields(returnRootNodes);
      }
      const returnDirectives = rootNodes
        .filter((rn) => rn.parserField.directives && rn.parserField.directives.length)
        .map((rn) => {
          const directiveHelper = TreeToNodes.createDirectivesHelper(
            rn.node,
            nodeDefinitions,
            links,
            nodes
          );
          return rn.parserField.directives!.map((a) => ({
            parserField: a,
            node: directiveHelper
          }));
        })
        .reduce((a, b) => [...a, ...b], []);

      if (returnDirectives.length > 0) {
        resolveAllFields(returnDirectives);
      }
      return;
    };
    resolveAllFields(
      tree.nodes
        .map((parserField) =>
          parserField.data!.type! in TypeExtension
            ? TreeToNodes.createExtendHelper(parserField)
            : parserField
        )
        .map((parserField) => ({
          parserField
        }))
    );
    return { nodes, links };
  }
}
