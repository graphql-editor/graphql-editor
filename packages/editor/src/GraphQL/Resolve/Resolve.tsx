import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
  ValueDefinition,
  Directive,
  ScalarTypes,
  Instances,
  TypeExtension,
  getTypeName,
  Options,
  createParserField,
  Value,
  FieldType,
} from 'graphql-js-tree';
import { BuiltInScalars } from '@/GraphQL/Resolve/BuiltInNodes';

export const ResolveCreateField = (
  field: ParserField,
  actualFields: ParserField[],
): ParserField[] | undefined => {
  const typeName = getTypeName(field.type.fieldType);
  if (
    field.data.type === TypeDefinition.ObjectTypeDefinition ||
    field.data.type === TypeDefinition.InterfaceTypeDefinition ||
    field.data.type === TypeExtension.InterfaceTypeExtension ||
    field.data.type === TypeExtension.ObjectTypeExtension
  ) {
    return BuiltInScalars.concat(actualFields)
      .filter(
        (f) =>
          f.data.type === TypeDefinition.ObjectTypeDefinition ||
          f.data.type === TypeDefinition.EnumTypeDefinition ||
          f.data.type === TypeDefinition.ScalarTypeDefinition ||
          f.data.type === TypeDefinition.UnionTypeDefinition ||
          f.data.type === TypeDefinition.InterfaceTypeDefinition,
      )
      .map((n) => ({
        ...n,
        data: {
          type: TypeSystemDefinition.FieldDefinition,
        },
      }));
  }
  if (
    field.data.type === TypeDefinition.InputObjectTypeDefinition ||
    field.data.type === TypeExtension.InputObjectTypeExtension ||
    field.data.type === TypeSystemDefinition.FieldDefinition ||
    field.data.type === TypeSystemDefinition.DirectiveDefinition
  ) {
    return actualFields
      .filter(
        (f) =>
          f.data.type === TypeDefinition.InputObjectTypeDefinition ||
          f.data.type === TypeDefinition.EnumTypeDefinition ||
          f.data.type === TypeDefinition.ScalarTypeDefinition,
      )
      .concat(BuiltInScalars)
      .map((n) => ({
        ...n,
        data: {
          type: ValueDefinition.InputValueDefinition,
        },
      }));
  }
  if (field.data.type === TypeDefinition.EnumTypeDefinition) {
    return [
      createParserField({
        data: {
          type: ValueDefinition.EnumValueDefinition,
        },
        type: {
          fieldType: {
            name: ValueDefinition.EnumValueDefinition,
            type: Options.name,
          },
        },
        name: '',
      }),
    ];
  }
  if (
    field.data.type === TypeDefinition.UnionTypeDefinition ||
    field.data.type === TypeExtension.UnionTypeExtension
  ) {
    return actualFields
      .filter((f) => f.data.type === TypeDefinition.ObjectTypeDefinition)
      .map((n) => ({
        ...n,
        data: {
          type: TypeSystemDefinition.UnionMemberDefinition,
        },
      }));
  }
  if (field.data.type === TypeDefinition.ScalarTypeDefinition) {
    return undefined;
  }
  if (field.data.type === TypeSystemDefinition.UnionMemberDefinition) {
    return undefined;
  }
  if (field.data.type === Instances.Directive) {
    return actualFields
      .find((a) => a.name === typeName)!
      .args?.filter((a) => !field.args?.map((el) => el.name).includes(a.name))
      .map((a) => {
        return {
          ...a,
          data: {
            type: Instances.Argument,
          },
          type: {
            fieldType: {
              name: a.name,
              type: Options.name,
            },
          },
          value: {
            value: '',
            type: checkValueType(a, actualFields),
          },
          args: [],
        };
      });
  }
  return [];
};

export const ResolveImplementInterface = (
  field: ParserField,
  actualFields: ParserField[],
): ParserField[] | undefined => {
  if (
    field.data.type === TypeDefinition.ObjectTypeDefinition ||
    field.data.type === TypeDefinition.InterfaceTypeDefinition
  ) {
    return actualFields.filter(
      (f) => f.data.type === TypeDefinition.InterfaceTypeDefinition,
    );
  }
  return [];
};

const getAcceptedDirectives = (f: ParserField): Directive[] => {
  const {
    data: { type },
  } = f;
  if (
    type === TypeDefinition.ObjectTypeDefinition ||
    type === TypeExtension.ObjectTypeExtension
  ) {
    return [Directive.OBJECT];
  }
  if (
    type === TypeDefinition.EnumTypeDefinition ||
    type === TypeExtension.EnumTypeExtension
  ) {
    return [Directive.ENUM];
  }
  if (
    type === TypeDefinition.InputObjectTypeDefinition ||
    type === TypeExtension.InputObjectTypeExtension
  ) {
    return [Directive.INPUT_OBJECT];
  }
  if (
    type === TypeDefinition.InterfaceTypeDefinition ||
    type === TypeExtension.InterfaceTypeExtension
  ) {
    return [Directive.INTERFACE];
  }
  if (
    type === TypeDefinition.ScalarTypeDefinition ||
    type === TypeExtension.ScalarTypeExtension
  ) {
    return [Directive.SCALAR];
  }
  if (
    type === TypeDefinition.UnionTypeDefinition ||
    type === TypeExtension.UnionTypeExtension
  ) {
    return [Directive.UNION];
  }
  if (type === TypeSystemDefinition.FieldDefinition) {
    return [Directive.FIELD_DEFINITION];
  }
  if (type === ValueDefinition.EnumValueDefinition) {
    return [Directive.ENUM_VALUE];
  }
  if (type === ValueDefinition.InputValueDefinition) {
    return [Directive.INPUT_FIELD_DEFINITION];
  }
  return [];
};
export const ResolveDirectives = (
  field: ParserField,
  actualFields: ParserField[],
): ParserField[] => {
  const acceptedDirectives = getAcceptedDirectives(field);
  return actualFields
    .filter((f) => f.data.type === TypeSystemDefinition.DirectiveDefinition)
    .filter(
      (f) =>
        !!f.type.directiveOptions?.find((dO) =>
          acceptedDirectives.includes(dO),
        ),
    );
};

export const isScalarArgument = (field: ParserField, scalarTypes: string[]) => {
  const typeName = getTypeName(field.type.fieldType);
  if (typeName === ScalarTypes.Boolean) {
    return true;
  }
  if (typeName === ScalarTypes.Float) {
    return true;
  }
  if (typeName === ScalarTypes.ID) {
    return true;
  }
  if (typeName === ScalarTypes.Int) {
    return true;
  }
  if (typeName === ScalarTypes.String) {
    return true;
  }
  return scalarTypes.includes(typeName);
};

const checkValueType = (node: ParserField, nodes: ParserField[]) => {
  const isArray = isArrayType(node.type.fieldType);
  if (isArray) return Value.ListValue;
  const tName = getTypeName(node.type.fieldType);
  const scalarTypes = nodes
    .filter((n) => n.data.type === TypeDefinition.ScalarTypeDefinition)
    .map((n) => n.name);
  if (isScalarArgument(node, scalarTypes)) {
    if (tName === ScalarTypes.Boolean) {
      return Value.BooleanValue;
    }
    if (tName === ScalarTypes.Float) {
      return Value.FloatValue;
    }
    if (tName === ScalarTypes.ID) {
      return Value.IDValue;
    }
    if (tName === ScalarTypes.Int) {
      return Value.IntValue;
    }
    if (tName === ScalarTypes.String) {
      return Value.StringValue;
    }
    return Value.ScalarValue;
  }
  const parentNode = nodes.find((n) => n.name === tName);
  if (
    parentNode?.data.type === TypeDefinition.InputObjectTypeDefinition ||
    parentNode?.data.type === TypeExtension.InputObjectTypeExtension
  ) {
    return Value.ObjectValue;
  }
  if (
    parentNode?.data.type === TypeDefinition.EnumTypeDefinition ||
    parentNode?.data.type === TypeExtension.EnumTypeExtension
  ) {
    return Value.EnumValue;
  }
  return Value.Variable;
};

export const isArrayType = (f: FieldType) =>
  f.type === Options.required
    ? f.nest.type === Options.array
    : f.type === Options.array;
