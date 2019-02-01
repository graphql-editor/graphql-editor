import { ParserRoot, ParserTree, ParserField } from '../Models';
import { NodeUtils, NodeDefinition, Node, Link } from 'graphsource';
import { ScreenPosition } from 'graphsource/lib/IO/ScreenPosition';

export class TreeToNodes {
  static resolveRootNodeDefintion(node: ParserRoot, nodeDefinitions: NodeDefinition[]): void {
    const definingObjectDefinition = nodeDefinitions.find(
      (nd) => !!nd.object && nd.type === node.type
    )!;
    const newDefinition = NodeUtils.createObjectDefinition(definingObjectDefinition, node.name);
    newDefinition.help = node.description || newDefinition.help;
    nodeDefinitions.push(newDefinition);
  }
  static resolveField(node: ParserField, nodeDefinitions: NodeDefinition[], nodes: Node[]): Node {
    const def = nodeDefinitions.find((nd) => nd.type === node.type.name)!;
    const nodeCreated = NodeUtils.createBasicNode({ x: 0, y: 0 }, def, {
      name: node.name,
      description: node.description
    });
    return nodeCreated;
  }
  static resolveFields(
    node: ParserRoot,
    nodeDefinitions: NodeDefinition[],
    nodes: Node[],
    links: Link[]
  ) {
    const e: ScreenPosition = { x: 0, y: 0 };
    const definingObjectDefinition = nodeDefinitions.find(
      (nd) => !!nd.object && nd.type === node.type
    )!;
    const createdRootNode = NodeUtils.createBasicNode(e, definingObjectDefinition, {
      name: node.name,
      description: node.description
    });
    if (node.fields) {
      node.fields.forEach((n) => {
        const createdNode = TreeToNodes.resolveField(n, nodeDefinitions, nodes);
        links.push({
          centerPoint: 0.5,
          o: createdNode,
          i: createdRootNode
        });
        createdRootNode.inputs!.push(createdNode);
        createdNode.outputs!.push(createdRootNode);
        if (n.args) {
          n.args.forEach((a) => {
            const createdArgNode = TreeToNodes.resolveField(a, nodeDefinitions, nodes);
            createdArgNode.outputs = [createdRootNode];
            createdNode.inputs!.push(createdArgNode);
            nodes.push(createdArgNode);
            links.push({
              centerPoint: 0.5,
              o: createdArgNode,
              i: createdNode
            });
          });
        }
        nodes.push(createdNode);
      });
    }
    nodes.push(createdRootNode);
  }
  static resolveTree(tree: ParserTree, nodeDefinitions: NodeDefinition[]) {
    const nodes: Node[] = [];
    const links: Link[] = [];
    tree.nodes.forEach((n) => TreeToNodes.resolveRootNodeDefintion(n, nodeDefinitions));
    tree.nodes.forEach((n) => TreeToNodes.resolveFields(n, nodeDefinitions, nodes, links));
    return { nodes, links };
  }
}
