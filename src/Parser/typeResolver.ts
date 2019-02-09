import {
  TypeDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  TypeNode
} from 'graphql';
import { ParserField, ScalarTypes, Options } from '../Models';

export class TypeResolver {
  static resolveRootNode(n: TypeDefinitionNode['kind']): string {
    const map: Record<TypeDefinitionNode['kind'], string> = {
      EnumTypeDefinition: 'enum',
      InputObjectTypeDefinition: 'input',
      InterfaceTypeDefinition: 'interface',
      ObjectTypeDefinition: 'type',
      ScalarTypeDefinition: 'scalar',
      UnionTypeDefinition: 'union'
    };
    return map[n];
  }
  static resolveSingleField(n: TypeNode, options: Options[] = []): ParserField['type'] {
    if (n.kind === 'ListType') {
      let opts = [...options, Options.array];
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
          type: TypeResolver.resolveSingleField(n.type)
        } as ParserField)
    );
  }
  static iterateInputValueFields(fields: ReadonlyArray<InputValueDefinitionNode>): ParserField[] {
    return fields.map(
      (n) =>
        ({
          name: n.name.value,
          description: n.description && n.description.value,
          type: TypeResolver.resolveSingleField(n.type)
        } as ParserField)
    );
  }
  static resolveInterfaces(n: TypeDefinitionNode) {
    if (n.kind !== 'ObjectTypeDefinition' || !n.interfaces) return;
    return n.interfaces.map((i) => i.name.value);
  }
  static resolveFields(n: TypeDefinitionNode): ParserField[] | null {
    if (n.kind === 'EnumTypeDefinition') {
      if (!n.values) return null;
      return n.values.map(
        (v) =>
          ({
            name: v.name.value,
            description:v.description && v.description.value,
            type: { name: ScalarTypes.EnumValue }
          } as ParserField)
      );
    }
    if (n.kind === 'ScalarTypeDefinition') {
      return null;
    }
    if (n.kind === 'UnionTypeDefinition') {
      if (!n.types) return null;
      return n.types.map(
        (t) =>
          ({
            name: t.name.value,
            type: { name: t.name.value }
          } as ParserField)
      );
    }
    if (n.kind === 'InputObjectTypeDefinition') {
      if (!n.fields) return null;
      const fields = TypeResolver.iterateInputValueFields(n.fields);
      return fields;
    }
    if (!n.fields) return null;
    const fields = TypeResolver.iterateObjectTypeFields(n.fields);
    return fields;
  }
}
