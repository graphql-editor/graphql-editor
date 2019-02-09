import { Node, Link } from 'graphsource';
import {
  scalarNodeTemplate,
  enumNodeTemplate,
  unionNodeTemplate,
  typeNodeTemplate,
  inputNodeTemplate
} from './templates/objectNode';
import {
  ObjectTypes,
  GraphQLTemplateField,
  Options,
  GraphQLTemplateObject,
  BaseField
} from '../Models';

export class NodesToTree {
  static resolveFieldNode = (i: Node) =>
    ({
      array: !!i.options.find((o) => o === Options.array),
      required: !!i.options.find((o) => o === Options.required),
      arrayRequired: !!i.options.find((o) => o === Options.arrayRequired),
      name: i.name,
      type: i.definition.type,
      description: i.description,
      args: i.inputs
        ? i.inputs.map(
            (a) =>
              ({
                array: !!a.options.find((o) => o === Options.array),
                required: !!a.options.find((o) => o === Options.required),
                arrayRequired: !!a.options.find((o) => o === Options.arrayRequired),
                name: a.name,
                type: a.definition.type
              } as BaseField)
          )
        : undefined
    } as GraphQLTemplateField);
  static resolveInputObjectNode = (n: Node) => {
    let templateField: GraphQLTemplateObject = {
      name: n.name,
      description: n.description,
      type: n.definition.type
    };
    if (!n.inputs) {
      return typeNodeTemplate(templateField);
    }
    const fields: GraphQLTemplateField[] = n.inputs
      .filter((i) => i.definition.type !== 'implements')
      .map(NodesToTree.resolveFieldNode);
    return inputNodeTemplate({
      ...templateField,
      fields
    });
  };
  static resolveObjectNode = (n: Node) => {
    let templateField: GraphQLTemplateObject = {
      name: n.name,
      description: n.description,
      type: n.definition.type
    };
    if (!n.inputs) {
      return typeNodeTemplate(templateField);
    }
    const fields: GraphQLTemplateField[] = n.inputs
      .filter((i) => i.definition.type !== 'implements')
      .map(NodesToTree.resolveFieldNode);
    const interfaces = n.inputs
      .filter((i) => i.definition.type === 'implements')
      .map((i) => (i.inputs ? i.inputs.map((n) => n.definition.type) : []))
      .reduce((a, b) => a.concat(b), []);
    return typeNodeTemplate({
      ...templateField,
      interfaces,
      fields
    });
  };
  static parse(nodes: Node[], links: Link[]) {
    const objectNodes = nodes.filter((n) => n.definition.object);
    const joinDefinitions = (...defintions: string[]) => defintions.join('\n\n');
    const scalars: string[] = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.scalar)
      .map((n) =>
        scalarNodeTemplate({
          name: n.name,
          description: n.description
        })
      );
    const enums: string[] = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.enum)
      .map((n) =>
        enumNodeTemplate(
          {
            name: n.name,
            description: n.description
          },
          n.inputs
            ? n.inputs.map(
                (i) =>
                  ({
                    name: i.name,
                    description: i.description
                  } as Pick<GraphQLTemplateField, 'description' | 'name'>)
              )
            : []
        )
      );
    const unions: string[] = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.union)
      .map((n) =>
        unionNodeTemplate(
          {
            name: n.name,
            description: n.description
          },
          n.inputs ? n.inputs.map((i) => i.definition.type) : []
        )
      );
    const inputs = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.input)
      .map(NodesToTree.resolveInputObjectNode);
    const types = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.type)
      .map(NodesToTree.resolveObjectNode);
    const interfaces = objectNodes
      .filter((n) => n.definition.type === ObjectTypes.interface)
      .map(NodesToTree.resolveObjectNode);
    return joinDefinitions(...scalars, ...enums, ...unions, ...types, ...inputs, ...interfaces);
  }
}
