import { Operations, ParserTree } from '../Models';
import { body } from './templates/operations';
import { resolvePropTypeFromRoot } from './templates/returnedPropTypes';
import { resolveReturnFromRoot } from './templates/returnedReturns';
import { resolveTypeFromRoot } from './templates/returnedTypes';

export class TreeToTS {
  static resolveTree(tree: ParserTree) {
    const rootTypes = tree.nodes.map(resolveTypeFromRoot);
    const propTypes = `export const AllTypesProps = {\n${tree.nodes
      .map(resolvePropTypeFromRoot)
      .filter((pt) => pt)
      .join(',\n')}\n}`;
    const returnTypes = `export const ReturnTypes = {\n${tree.nodes
      .map(resolveReturnFromRoot)
      .filter((pt) => pt)
      .join(',\n')}\n}`;
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
    return propTypes
      .concat('\n\n')
      .concat(returnTypes)
      .concat('\n\n')
      .concat(rootTypes.join('\n\n'))
      .concat(operations);
  }
}
