import { Link, Node, NodeUtils } from 'graphsource';
import { EditorNodeDefinition, GraphQLNodeParams, ParserField, ParserTree } from '../Models';
import { Helpers } from '../Models/Spec';

export class TreeToNodes {
  static compareData(d1: GraphQLNodeParams | undefined, d2: GraphQLNodeParams | undefined) {
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
  static connectAndCreate = (
    n: ParserField,
    rootNode: Node,
    links: Link[],
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Array<Node<GraphQLNodeParams>>
  ) => {
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
            type: Helpers.Implements
          }
        },
        createdNode,
        links,
        nodeDefinitions,
        nodes
      );
    });
  }
  static createDirectivesHelper = (
    rootNode: Node,
    nodeDefinitions: EditorNodeDefinition[],
    links: Link[],
    nodes: Array<Node<GraphQLNodeParams>>
  ) => {
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
  static resolveField(
    root: ParserField,
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Array<Node<GraphQLNodeParams>>,
    links: Link[],
    rootNode?: Node
  ): Node<GraphQLNodeParams> {
    const defs = nodeDefinitions.filter((nd) => nd.type === root.type.name)!;
    let def = defs[0];
    if (defs.length > 1) {
      def = defs.find((d) => TreeToNodes.compareData(d.data, root.data))!;
    }
    if (!def) {
      console.log(def, root, [...nodeDefinitions]);
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
  static resolveTree(tree: ParserTree, nodeDefinitions: EditorNodeDefinition[]) {
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
      tree.nodes.map((parserField) => ({
        parserField
      }))
    );
    return { nodes, links };
  }
}
