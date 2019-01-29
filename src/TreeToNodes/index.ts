import { ParserRoot, ParserTree } from '../Models';
import { NodeUtils, NodeDefinition } from 'graphsource';

export class TreeToNodes {
  static resolveRootNodeDefintion(node: ParserRoot, nodeDefinitions: NodeDefinition[]) {
    const newDefinition = NodeUtils.createObjectDefinition(
      nodeDefinitions.find((nd) => !!nd.object && nd.type === node.type)!,
      node.name
    );
    nodeDefinitions.push(newDefinition);
    // const newNode: Node = {
    //   ...newDefinition.node,
    //   definition: newDefinition,
    //   name: node.name,
    //   editsDefinition: newDefinition,
    //   description: node.description,
    //   x: 0,
    //   y: 0
    // };
  }
  static resolveNodePath(node: ParserRoot, nodeDefinitions: NodeDefinition[]) {}
  static resolveTree(tree: ParserTree, nodeDefinitions: NodeDefinition[]) {
    tree.nodes.forEach((n) => TreeToNodes.resolveRootNodeDefintion(n, nodeDefinitions));
    tree.nodes.forEach((n) => TreeToNodes.resolveNodePath(n, nodeDefinitions));
  }
}
