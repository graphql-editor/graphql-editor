import { Link, Node } from 'graphsource';
import { Directive, NodeData, Operations, ParserField, ParserRoot } from '../Models';
import { TypeDefinition, TypeSystemDefinition } from '../Models/Spec';
import {
  directiveNodeTemplate,
  enumNodeTemplate,
  inputNodeTemplate,
  scalarNodeTemplate,
  typeNodeTemplate,
  unionNodeTemplate
} from './templates/objectNode';

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
    } as ParserField)
  static resolveDirectiveObjectNode = (n: Node) => {
    const templateField: ParserRoot = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.type,
        directiveOptions: n.options as Directive[]
      },
      fields: n.inputs ? n.inputs.map(NodesToTree.resolveFieldNode) : undefined
    };
    return directiveNodeTemplate({
      ...templateField
    });
  }
  static resolveInputObjectNode = (n: Node) => {
    const templateField: ParserField = {
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
  }
  static resolveObjectNode = (n: Node) => {
    const templateField: ParserRoot = {
      name: n.name,
      description: n.description,
      type: {
        name: n.definition.type
      },
      directives: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === NodeData.directives)
            .map((i) => i.inputs || [])
            .reduce((a, b) => a.concat(b), [])
            .map(NodesToTree.resolveFieldNode)
        : undefined,
      interfaces: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type === NodeData.implements)
            .map((i) => (i.inputs ? i.inputs.map((n) => n.definition.type) : []))
            .reduce((a, b) => a.concat(b), [])
        : undefined,
      fields: n.inputs
        ? n.inputs
            .filter((i) => i.definition.type !== NodeData.implements)
            .filter((i) => i.definition.type !== NodeData.directives)
            .map(NodesToTree.resolveFieldNode)
        : undefined
    };
    console.log(templateField);
    if (!n.inputs) {
      return typeNodeTemplate(templateField);
    }
    return typeNodeTemplate(templateField);
  }
  static parse(nodes: Node[], links: Link[]) {
    if (!nodes.length) {
      return '';
    }
    const objectNodes = nodes.filter((n) => n.definition.root);
    const joinDefinitions = (...defintions: string[]) => defintions.join('\n\n');
    const operations: Record<Operations, string | null> = {
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
      if (type === TypeSystemDefinition.DirectiveDefinition) {
        return NodesToTree.resolveDirectiveObjectNode(n);
      }
      if (type === TypeDefinition.ScalarTypeDefinition) {
        return scalarNodeTemplate({
          name,
          description
        });
      }
      if (type === TypeDefinition.EnumTypeDefinition) {
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
      }
      if (type === TypeDefinition.UnionTypeDefinition) {
        return unionNodeTemplate(
          {
            name,
            description
          },
          n.inputs ? n.inputs.map((i) => i.definition.type) : []
        );
      }
      if (type === TypeDefinition.InputObjectTypeDefinition) {
        return NodesToTree.resolveInputObjectNode(n);
      }
      if (type === TypeDefinition.InterfaceTypeDefinition) {
        return NodesToTree.resolveObjectNode(n);
      }
      if (type === TypeDefinition.ObjectTypeDefinition) {
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
