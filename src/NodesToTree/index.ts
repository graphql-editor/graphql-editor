import {
  Directive,
  Helpers,
  OperationType,
  Options,
  ParserField,
  TreeToGraphQL,
  TypeSystemDefinition,
} from 'graphql-zeus';
import { Link } from 'graphsource';
import { EditorNode } from '../Models';

export class NodesToTree {
  static resolveFieldNode = (n: EditorNode): ParserField =>
    ({
      name: n.name,
      type: {
        name: n.definition.type,
        options: n.options,
      },
      data: n.definition.data,
      description: n.description,
      directives: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === Helpers.Directives)
            .map((i) => i.inputs || [])
            .reduce((a, b) => a.concat(b), [])
            .map(NodesToTree.resolveFieldNode)
        : undefined,
      args: n.inputs
        ? n.inputs.filter((i) => i.definition.type !== Helpers.Directives).map(NodesToTree.resolveFieldNode)
        : undefined,
    } as ParserField);

  static resolveObjectNode = (n: EditorNode) => {
    const templateField: ParserField = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.type,
        options: n.options && (n.options.filter((o) => o in Options) as Options[]),
        operations: n.options && (n.options.filter((o) => o in OperationType) as OperationType[]),
        directiveOptions:
          n.definition.data!.type! === TypeSystemDefinition.DirectiveDefinition
            ? (n.options as Directive[])
            : undefined,
      },
      data: n.definition.data!,
      directives: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === Helpers.Directives)
            .map((i) => i.inputs || [])
            .reduce((a, b) => a.concat(b), [])
            .map(NodesToTree.resolveFieldNode)
        : undefined,
      interfaces: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === Helpers.Implements)
            .map((i) => (i.inputs ? i.inputs.map((n) => n.definition.type) : []))
            .reduce((a, b) => a.concat(b), [])
        : undefined,
      args: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type !== Helpers.Implements)
            .filter((i) => i.definition.type !== Helpers.Directives)
            .map(NodesToTree.resolveFieldNode)
        : undefined,
    };
    return templateField;
  };

  static parse(nodes: Array<EditorNode>, links: Link[]) {
    if (!nodes.length) {
      return '';
    }
    const roots = nodes.filter((n) => n.definition.root).map(NodesToTree.resolveObjectNode);
    const graphql = TreeToGraphQL.parse({
      nodes: roots,
    });
    return graphql;
  }
}
