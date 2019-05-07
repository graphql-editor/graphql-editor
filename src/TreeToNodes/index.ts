import { Link, Node, NodeUtils } from 'graphsource';
import { ScreenPosition } from 'graphsource/lib/IO/ScreenPosition';
import { EditorNodeDefinition, NodeData, ParserField, ParserRoot, ParserTree } from '../Models';

export class TreeToNodes {
  static resolveRootNodeDefintion(root: ParserRoot, nodeDefinitions: EditorNodeDefinition[]): void {
    const definingObjectDefinition = nodeDefinitions.find(
      (nd) => !!nd.root && nd.type === root.type.name
    )!;
    const newDefinitions = NodeUtils.createObjectDefinition(definingObjectDefinition, root.name);
    newDefinitions.forEach((newDefinition) => {
      newDefinition.help = root.description || newDefinition.help;
      nodeDefinitions.push(newDefinition);
    });
  }
  static resolveField(node: ParserField, nodeDefinitions: EditorNodeDefinition[]): Node {
    const defs = nodeDefinitions.filter((nd) => nd.type === node.type.name)!;
    let def = defs[0];
    if (defs.length > 1) {
      def = defs.filter((d) => JSON.stringify(d.data) === JSON.stringify(node.nodeParams))[0];
    }
    const nodeCreated = NodeUtils.createBasicNode({ x: 0, y: 0 }, def, {
      name: node.name,
      description: node.description,
      options: node.type.options || []
    });

    const newDefinitions = NodeUtils.createObjectDefinition(def, node.name);
    newDefinitions.forEach((newDefinition) => {
      newDefinition.help = node.description || newDefinition.help;
      nodeDefinitions.push(newDefinition);
    });
    nodeCreated.editsDefinitions = newDefinitions;
    return nodeCreated;
  }
  static resolveFields(
    root: ParserRoot,
    nodeDefinitions: EditorNodeDefinition[],
    nodes: Node[],
    links: Link[]
  ) {
    const connectAndCreate = (n: ParserField, rootNode: Node) => {
      const createdNode = TreeToNodes.resolveField(n, nodeDefinitions);
      links.push({
        centerPoint: 0.5,
        o: createdNode,
        i: rootNode
      });
      rootNode.inputs!.push(createdNode);
      createdNode.outputs!.push(rootNode);
      nodes.push(createdNode);
      if (n.args) {
        n.args.forEach((a) => {
          connectAndCreate(a, createdNode);
        });
      }
      return createdNode;
    };
    const e: ScreenPosition = { x: 0, y: 0 };
    const definingObjectDefinition = nodeDefinitions.find(
      (nd) => !!nd.root && nd.type === root.type.name
    )!;
    const createdRootNode = NodeUtils.createBasicNode(e, definingObjectDefinition, {
      name: root.name,
      description: root.description,
      options: root.type.options || root.type.directiveOptions,
      editsDefinitions: nodeDefinitions.filter((nd) => nd.type === root.name)
    });
    nodes.push(createdRootNode);
    if (root.interfaces && root.interfaces.length) {
      const createdNode = connectAndCreate(
        {
          name: 'implements',
          type: {
            name: 'implements'
          }
        },
        createdRootNode
      );
      root.interfaces.forEach((i) => {
        connectAndCreate(
          {
            type: {
              name: i
            },
            name: i,
            nodeParams: {
              type: NodeData.implements
            }
          },
          createdNode
        );
      });
    }
    if (root.fields) {
      root.fields.forEach((n) => {
        connectAndCreate(n, createdRootNode);
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
