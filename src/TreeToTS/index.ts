import { ParserTree, Operations } from '../Models';
import { resolveTypeFromRoot } from './templates/returnedTypes';
import { body } from './templates/operations';

export class TreeToTS {
  static resolveTree(tree: ParserTree) {
    const rootTypes = tree.nodes.map(resolveTypeFromRoot);
    const operations = body({
      queries: tree.nodes
        .filter((n) => n.type.options && n.type.options.find((o) => o === Operations.query))
        .map((n) => (n.fields ? n.fields.map((f) => f.name) : []))
        .reduce((a, b) => a.concat(b), []),
      mutations: tree.nodes
        .filter((n) => n.type.options && n.type.options.find((o) => o === Operations.mutation))
        .map((n) => (n.fields ? n.fields.map((f) => f.name) : []))
        .reduce((a, b) => a.concat(b), []),
      subscriptions: tree.nodes
        .filter((n) => n.type.options && n.type.options.find((o) => o === Operations.subscription))
        .map((n) => (n.fields ? n.fields.map((f) => f.name) : []))
        .reduce((a, b) => a.concat(b), [])
    });
    return rootTypes.join('\n\n').concat(operations);
  }
}
