import {
  ArgumentNode,
  DirectiveNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  ObjectFieldNode,
  TypeDefinitionNode,
  TypeNode,
  ValueNode
} from 'graphql';
import { AllTypes, Options, ParserField } from '../Models';
import { Instances, TypeSystemDefinition, Value, ValueDefinition } from '../Models/Spec';

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
          directives: n.directives && TypeResolver.iterateDirectives(n.directives),
          data: {
            type: TypeSystemDefinition.FieldDefinition
          }
        } as ParserField)
    );
  }
  static resolveInputValueOptions = (value: ValueNode) => {
    const options: Options[] = [];
    if (value.kind === 'ListValue') {
      options.push(Options.array);
    }
    return options;
  }
  static resolveObjectField(f: ObjectFieldNode): ParserField[] {
    return [
      {
        name: f.name.value,
        type: {
          name: f.name.value,
          options: TypeResolver.resolveInputValueOptions(f.value)
        },
        data: {
          type: Instances.Argument
        },
        args: TypeResolver.resolveValue(f.value)
      }
    ];
  }
  static resolveValue(value: ValueNode): ParserField[] {
    if (value.kind === 'ListValue') {
      return value.values.map(TypeResolver.resolveValue).reduce((a, b) => [...a, ...b], []);
    }
    if (value.kind === 'ObjectValue') {
      return [
        {
          name: value.kind,
          args: value.fields
            .map((f) => TypeResolver.resolveObjectField(f))
            .reduce((a, b) => [...a, ...b], []),
          data: {
            type: value.kind as AllTypes
          },
          type: {
            name: value.kind as AllTypes
          }
        }
      ];
    }
    if (value.kind === 'EnumValue') {
      return [
        {
          name: value.value,
          data: {
            type: value.kind as AllTypes
          },
          type: {
            name: value.value
          }
        }
      ];
    }
    if (value.kind in Value) {
      return [
        {
          name: 'value' in value ? value.value.toString() : 'name' in value ? value.name.value : '',
          type: {
            name: value.kind
          },
          data: {
            type: value.kind as AllTypes
          }
        }
      ];
    }
    return [];
  }
  static iterateDirectives(directives: ReadonlyArray<DirectiveNode>): ParserField[] {
    return directives.map(
      (n) =>
        ({
          name: n.name.value,
          type: {
            name: n.name.value
          },
          data: {
            type: Instances.Directive
          },
          args: n.arguments ? TypeResolver.iterateArgumentFields(n.arguments) : []
        } as ParserField)
    );
  }
  static iterateArgumentFields(fields: ReadonlyArray<ArgumentNode>): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          type: {
            name: n.name.value,
            options: TypeResolver.resolveInputValueOptions(n.value)
          },
          data: {
            type: Instances.Argument
          },
          args: TypeResolver.resolveValue(n.value)
        } as ParserField)
    );
  }
  static iterateInputValueFields(fields: ReadonlyArray<InputValueDefinitionNode>): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          description: n.description && n.description.value,
          directives: n.directives && TypeResolver.iterateDirectives(n.directives),
          type: TypeResolver.resolveSingleField(n.type),
          data: {
            type: ValueDefinition.InputValueDefinition
          },
          args: n.defaultValue ? TypeResolver.resolveValue(n.defaultValue) : []
        } as ParserField)
    );
  }
  static resolveInterfaces(n: TypeDefinitionNode) {
    if (n.kind !== 'ObjectTypeDefinition' || !n.interfaces) {
      return;
    }
    return n.interfaces.map((i) => i.name.value);
  }
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
            directives: v.directives && TypeResolver.iterateDirectives(v.directives),
            type: { name: ValueDefinition.EnumValueDefinition },
            data: {
              type: ValueDefinition.EnumValueDefinition
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
            data: {
              type: TypeSystemDefinition.UnionMemberDefinition
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
