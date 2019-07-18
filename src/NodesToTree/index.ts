import {
  Directive,
  GraphQLNodeParams,
  Helpers,
  OperationType,
  Options,
  ParserField,
  TypeDefinition,
  TypeSystemDefinition
} from 'graphql-zeus';
import { Link, Node } from 'graphsource';
import { TemplateUtils } from './templates/TemplateUtils';

export class NodesToTree {
  static resolveFieldNode = (n: Node): ParserField =>
    ({
      name: n.name,
      type: {
        name: n.definition.type,
        options: n.options
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
        ? n.inputs
            .filter((i) => i.definition.type !== Helpers.Directives)
            .map(NodesToTree.resolveFieldNode)
        : undefined
    } as ParserField)
  static resolveObjectNode = (n: Node<GraphQLNodeParams>) => {
    const templateField: ParserField = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.data!.type!,
        options: n.options && (n.options.filter((o) => o in Options) as Options[]),
        operations: n.options && (n.options.filter((o) => o in OperationType) as OperationType[]),
        directiveOptions:
          n.definition.data!.type! === TypeSystemDefinition.DirectiveDefinition
            ? (n.options as Directive[])
            : undefined
      },
      data: n.definition.data,
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
        : undefined
    };
    return templateField;
  }
  static parse(nodes: Array<Node<GraphQLNodeParams>>, links: Link[]) {
    if (!nodes.length) {
      return '';
    }
    const objectNodes = nodes.filter((n) => n.definition.root);
    const joinDefinitions = (...defintions: string[]) => defintions.join('\n\n');
    const operations: Record<OperationType, string | null> = {
      [OperationType.query]: null,
      [OperationType.mutation]: null,
      [OperationType.subscription]: null
    };
    const definitions = objectNodes.map((n) => {
      if (n.definition.data && n.definition.data.type === TypeDefinition.ObjectTypeDefinition) {
        if (n.options) {
          if (n.options.find((o) => o === OperationType.query)) {
            operations[OperationType.query] = n.name;
          }
          if (n.options.find((o) => o === OperationType.mutation)) {
            operations[OperationType.mutation] = n.name;
          }
          if (n.options.find((o) => o === OperationType.subscription)) {
            operations[OperationType.subscription] = n.name;
          }
        }
      }
      return NodesToTree.resolveObjectNode(n);
    });
    const resolvedOperations = Object.keys(operations)
      .filter((k) => operations[k as OperationType])
      .map((k) => `\t${k}: ${operations[k as OperationType]}`)
      .join(',\n');
    const alldefs = definitions.map(TemplateUtils.resolverForConnection);
    const theBeginning = `# GraphQL from graph at:\n# graphqleditor.com\n\n`;
    return (
      theBeginning +
      joinDefinitions(...alldefs)
        .concat('\n')
        .concat(
          operations[OperationType.query]
            ? `schema{\n${resolvedOperations}\n}`
            : `
      `
        )
    );
  }
}
