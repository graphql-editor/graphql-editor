import { Node, Link } from 'graphsource';
import {
  scalarNodeTemplate,
  enumNodeTemplate,
  unionNodeTemplate,
  typeNodeTemplate,
  inputNodeTemplate
} from './templates/objectNode';
import { ObjectTypes, ParserRoot, ParserField, Operations } from '../Models';

export class NodesToTree {
  static resolveFieldNode = (i: Node): ParserField =>
    ({
      name: i.name,
      type: {
        name: i.definition.type,
        options: i.options
      },
      description: i.description,
      args: i.inputs ? i.inputs.map(NodesToTree.resolveFieldNode) : undefined
    } as ParserField);
  static resolveInputObjectNode = (n: Node) => {
    let templateField: ParserField = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.type
      },
      args: n.inputs ? n.inputs.map(NodesToTree.resolveFieldNode) : undefined
    };
    return inputNodeTemplate({
      ...templateField
    });
  };
  static resolveObjectNode = (n: Node) => {
    let templateField: ParserRoot = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.type
      },
      interfaces: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === 'implements')
            .map((i) => (i.inputs ? i.inputs.map((n) => n.definition.type) : []))
            .reduce((a, b) => a.concat(b), [])
        : undefined,
      fields: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type !== 'implements')
            .map(NodesToTree.resolveFieldNode)
        : undefined
    };
    if (!n.inputs) {
      return typeNodeTemplate(templateField);
    }
    return typeNodeTemplate(templateField);
  };
  static parse(nodes: Node[], links: Link[]) {
    if (!nodes.length) {
      return '';
    }
    const objectNodes = nodes.filter((n) => n.definition.root);
    const joinDefinitions = (...defintions: string[]) => defintions.join('\n\n');
    let operations: Record<Operations, string | null> = {
      [Operations.query]: null,
      [Operations.mutation]: null,
      [Operations.subscription]: null
    };
    const definitions = objectNodes.map((n) => {
      const {
        name,
        description,
        definition: { type }
      } = n;
      if (type === ObjectTypes.scalar)
        return scalarNodeTemplate({
          name,
          description
        });
      if (type === ObjectTypes.enum)
        return enumNodeTemplate(
          {
            name,
            description
          },
          n.inputs
            ? n.inputs.map(
                (i) =>
                  ({
                    name: i.name,
                    description: i.description
                  } as Pick<ParserField, 'description' | 'name'>)
              )
            : []
        );
      if (type === ObjectTypes.union)
        return unionNodeTemplate(
          {
            name,
            description
          },
          n.inputs ? n.inputs.map((i) => i.definition.type) : []
        );
      if (type === ObjectTypes.input) return NodesToTree.resolveInputObjectNode(n);
      if (type === ObjectTypes.interface) return NodesToTree.resolveObjectNode(n);
      if (type === ObjectTypes.type) {
        if (n.options) {
          if (n.options.find((o) => o === Operations.query)) {
            operations[Operations.query] = name;
          }
          if (n.options.find((o) => o === Operations.mutation)) {
            operations[Operations.mutation] = name;
          }
          if (n.options.find((o) => o === Operations.subscription)) {
            operations[Operations.subscription] = name;
          }
        }
        return NodesToTree.resolveObjectNode(n);
      }
      return '';
    });
    const resolvedOperations = Object.keys(operations)
      .filter((k) => operations[k as Operations])
      .map((k) => `\t${k}: ${operations[k as Operations]}`)
      .join(',\n');

    return joinDefinitions(...definitions)
      .concat('\n')
      .concat(
        operations[Operations.query]
          ? `schema{\n${resolvedOperations}\n}`
          : `
      `
      );
  }
}
