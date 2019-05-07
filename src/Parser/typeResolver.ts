import {
  DirectiveNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  TypeDefinitionNode,
  TypeNode,
  ValueNode
} from 'graphql';
import { NodeData, Options, ParserField, ScalarTypes } from '../Models';
import { Type, ValueDefinition } from '../Models/Spec';

export class TypeResolver {
  static resolveSingleField(n: TypeNode, options: Options[] = []): ParserField['type'] {
    if (n.kind === 'ListType') {
      const opts = [...options, Options.array];
      return {
        options: opts,
        ...TypeResolver.resolveSingleField(n.type, opts)
      };
    }
    if (n.kind === 'NonNullType') {
      const opts = [...options];
      if (opts.indexOf(Options.required) >= 0 && opts.indexOf(Options.array) >= 0) {
        opts.push(Options.arrayRequired);
      } else {
        opts.push(Options.required);
      }
      return {
        options: opts,
        ...TypeResolver.resolveSingleField(n.type, opts)
      };
    }
    return {
      name: n.name.value
    };
  }
  static iterateObjectTypeFields(fields: ReadonlyArray<FieldDefinitionNode>): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          description: n.description && n.description.value,
          args: n.arguments && TypeResolver.iterateInputValueFields(n.arguments),
          type: TypeResolver.resolveSingleField(n.type),
          nodeParams: {
            type: Type.NamedType
          }
        } as ParserField)
    );
  }
  static resolveDefaultValues(value: ValueNode): string[] {
    if (value.kind === 'ListValue') {
      return value.values.map(TypeResolver.resolveDefaultValues).reduce((a, b) => a.concat(b), []);
    }
    if (
      value.kind === 'EnumValue' ||
      value.kind === 'FloatValue' ||
      value.kind === 'IntValue' ||
      value.kind === 'BooleanValue'
    ) {
      return [`${value.value}`];
    }
    if (value.kind === 'Variable') {
      return [value.name.value];
    }
    if (value.kind === 'StringValue') {
      return [`"${value.value}"`];
    }
    return [];
  }
  static resolveDirectiveArgumentValue(value: ValueNode): string[] {
    if (value.kind === 'ListValue') {
      return value.values
        .map(TypeResolver.resolveDirectiveArgumentValue)
        .reduce((a, b) => a.concat(b), []);
    }
    if (value.kind === 'ObjectValue') {
      return [
        `{${value.fields.map(
          (f) => `${f.name.value}:${TypeResolver.resolveDirectiveArgumentValue(f.value).join('')}`
        )}}`
      ];
    }
    if (
      value.kind === 'EnumValue' ||
      value.kind === 'FloatValue' ||
      value.kind === 'IntValue' ||
      value.kind === 'BooleanValue'
    ) {
      return [`${value.value}`];
    }
    if (value.kind === 'Variable') {
      return [value.name.value];
    }
    if (value.kind === 'StringValue') {
      return [`"${value.value}"`];
    }
    return [];
  }
  static iterateInputValueFields(fields: ReadonlyArray<InputValueDefinitionNode>): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          description: n.description && n.description.value,
          type: TypeResolver.resolveSingleField(n.type),
          nodeParams: {
            type: ValueDefinition.InputValueDefinition
          },
          args: n.defaultValue
            ? TypeResolver.resolveDefaultValues(n.defaultValue).map(
                (d) =>
                  ({
                    name: d,
                    type: {
                      name: ScalarTypes.DefaultValue
                    },
                    nodeParams: {
                      type: NodeData.defaultValue
                    }
                  } as ParserField)
              )
            : undefined
        } as ParserField)
    );
  }
  static iterateDirectiveArguments(
    fields: ReadonlyArray<InputValueDefinitionNode>,
    type: NodeData
  ): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          description: n.description && n.description.value,
          type: TypeResolver.resolveSingleField(n.type),
          nodeParams: {
            type
          },
          args: n.defaultValue
            ? TypeResolver.resolveDefaultValues(n.defaultValue).map(
                (d) =>
                  ({
                    name: d,
                    type: {
                      name: ScalarTypes.DefaultValue
                    },
                    nodeParams: {
                      type: NodeData.defaultValue
                    }
                  } as ParserField)
              )
            : undefined
        } as ParserField)
    );
  }
  static resolveInterfaces(n: TypeDefinitionNode) {
    if (n.kind !== 'ObjectTypeDefinition' || !n.interfaces) {
      return;
    }
    return n.interfaces.map((i) => i.name.value);
  }
  static resolveDirectives(directives: readonly DirectiveNode[]) {}
  static resolveFields(n: TypeDefinitionNode): ParserField[] | undefined {
    if (n.kind === 'EnumTypeDefinition') {
      if (!n.values) {
        return;
      }
      return n.values.map(
        (v) =>
          ({
            name: v.name.value,
            description: v.description && v.description.value,
            type: { name: ScalarTypes.EnumValue },
            nodeParams: {
              type: NodeData.enumValue
            }
          } as ParserField)
      );
    }
    if (n.kind === 'ScalarTypeDefinition') {
      return;
    }
    if (n.kind === 'UnionTypeDefinition') {
      if (!n.types) {
        return;
      }
      return n.types.map(
        (t) =>
          ({
            name: t.name.value,
            type: { name: t.name.value },
            nodeParams: {
              type: NodeData.unionType
            }
          } as ParserField)
      );
    }
    if (n.kind === 'InputObjectTypeDefinition') {
      if (!n.fields) {
        return;
      }
      const fields = TypeResolver.iterateInputValueFields(n.fields);
      return fields;
    }
    if (!n.fields) {
      return;
    }
    const fields = TypeResolver.iterateObjectTypeFields(n.fields);
    return fields;
  }
}
