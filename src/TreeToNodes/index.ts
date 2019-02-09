import { ParserRoot, ParserTree, ParserField, ObjectTypes, EditorNodeDefinition } from '../Models';
import { NodeUtils, Node, Link } from 'graphsource';
import { ScreenPosition } from 'graphsource/lib/IO/ScreenPosition';

export class TreeToNodes {
  static resolveRootNodeDefintion(node: ParserRoot, nodeDefinitions: EditorNodeDefinition[]): void {
    const definingObjectDefinition = nodeDefinitions.find(
      (nd) => !!nd.object && nd.type === node.type
    )!;
    const newDefinitions = NodeUtils.createObjectDefinition(definingObjectDefinition, node.name);
    newDefinitions.forEach((newDefinition) => {
      newDefinition.help = node.description || newDefinition.help;
      nodeDefinitions.push(newDefinition);
    });
  }
  static resolveField(
    node: ParserField,
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Node[]
  ): Node {
    const def = nodeDefinitions.find((nd) => nd.type === node.type.name)!;
    const nodeCreated = NodeUtils.createBasicNode({ x: 0, y: 0 }, def, {
      name: node.name,
      description: node.description,
      options: node.type.options || []
    });
    return nodeCreated;
  }
  static resolveArgument(
    node: ParserField,
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Node[]
  ): Node {
    const def = nodeDefinitions.find(
      (nd) => nd.type === node.type.name && !!nd.data && !!nd.data.argument
    )!;
    const nodeCreated = NodeUtils.createBasicNode({ x: 0, y: 0 }, def, {
      name: node.name,
      description: node.description,
      options: node.type.options || []
    });
    return nodeCreated;
  }
  static resolveFields(
    node: ParserRoot,
    nodeDefinitions: EditorNodeDefinition[],
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
    nodes.push(createdRootNode);
    if (node.type === ObjectTypes.input) {
      // if (node.fields) {
      //   n.args.forEach((a) => {
      //     const createdArgNode = TreeToNodes.resolveField(a, nodeDefinitions, nodes);
      //     createdArgNode.outputs = [createdNode];
      //     createdNode.inputs!.push(createdArgNode);
      //     nodes.push(createdArgNode);
      //     links.push({
      //       centerPoint: 0.5,
      //       o: createdArgNode,
      //       i: createdNode
      //     });
      //   });
      // }
      // return;
    }
    if (node.interfaces && node.interfaces.length) {
      const createdNode = TreeToNodes.resolveField(
        {
          name: 'implements',
          type: {
            name: 'implements'
          }
        },
        nodeDefinitions,
        nodes
      );
      links.push({
        centerPoint: 0.5,
        o: createdNode,
        i: createdRootNode
      });
      createdRootNode.inputs!.push(createdNode);
      createdNode.outputs!.push(createdRootNode);
      nodes.push(createdNode);
      node.interfaces.forEach((i) => {
        const createdArgNode = TreeToNodes.resolveField(
          {
            type: {
              name: i
            },
            name: i
          },
          nodeDefinitions,
          nodes
        );
        createdArgNode.outputs = [createdNode];
        createdNode.inputs!.push(createdArgNode);
        nodes.push(createdArgNode);
        links.push({
          centerPoint: 0.5,
          o: createdArgNode,
          i: createdNode
        });
      });
    }
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
            createdArgNode.outputs = [createdNode];
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
  }
  static resolveTree(tree: ParserTree, nodeDefinitions: EditorNodeDefinition[]) {
    const nodes: Node[] = [];
    const links: Link[] = [];
    tree.nodes.forEach((n) => TreeToNodes.resolveRootNodeDefintion(n, nodeDefinitions));
    tree.nodes.forEach((n) => TreeToNodes.resolveFields(n, nodeDefinitions, nodes, links));
    return { nodes, links };
  }
}
