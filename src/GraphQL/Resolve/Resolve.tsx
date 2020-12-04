import {
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
  ValueDefinition,
  Directive,
  ScalarTypes,
  Value,
  Instances,
  TypeExtension,
} from 'graphql-zeus';
import { BuiltInScalars } from '@/GraphQL/Resolve/BuiltInNodes';

export const ResolveCreateField = (field: ParserField, actualFields: ParserField[]): ParserField[] | undefined => {
  if (
    field.data.type === TypeDefinition.ObjectTypeDefinition ||
    field.data.type === TypeDefinition.InterfaceTypeDefinition ||
    field.data.type === TypeExtension.InterfaceTypeExtension ||
    field.data.type === TypeExtension.ObjectTypeExtension
  ) {
    return actualFields
      .filter(
        (f) =>
          f.data.type === TypeDefinition.ObjectTypeDefinition ||
          f.data.type === TypeDefinition.EnumTypeDefinition ||
          f.data.type === TypeDefinition.ScalarTypeDefinition ||
          f.data.type === TypeDefinition.UnionTypeDefinition ||
          f.data.type === TypeDefinition.InterfaceTypeDefinition,
      )
      .concat(BuiltInScalars)
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
    return [];
  }
  if (field.data.type === TypeDefinition.UnionTypeDefinition || field.data.type === TypeExtension.UnionTypeExtension) {
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
      .find((a) => a.name === field.type.name)!
      .args?.filter((a) => !field.args?.map((el) => el.name).includes(a.name))
      .map((a) => {
        return {
          ...a,
          data: {
            type: Instances.Argument,
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
    return actualFields.filter((f) => f.data.type === TypeDefinition.InterfaceTypeDefinition);
  }
  return [];
};

const getAcceptedDirectives = (f: ParserField): Directive[] => {
  const {
    data: { type },
  } = f;
  if (type === TypeDefinition.ObjectTypeDefinition) {
    return [Directive.OBJECT];
  }
  if (type === TypeDefinition.EnumTypeDefinition) {
    return [Directive.ENUM];
  }
  if (type === TypeDefinition.InputObjectTypeDefinition) {
    return [Directive.INPUT_OBJECT];
  }
  if (type === TypeDefinition.InterfaceTypeDefinition) {
    return [Directive.INTERFACE];
  }
  if (type === TypeDefinition.ScalarTypeDefinition) {
    return [Directive.SCALAR];
  }
  if (type === TypeDefinition.UnionTypeDefinition) {
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
export const ResolveDirectives = (field: ParserField, actualFields: ParserField[]): ParserField[] => {
  const acceptedDirectives = getAcceptedDirectives(field);
  return actualFields
    .filter((f) => f.data.type === TypeSystemDefinition.DirectiveDefinition)
    .filter((f) => !!f.type.directiveOptions?.find((dO) => acceptedDirectives.includes(dO)));
};

export const isScalarArgument = (field: ParserField) => {
  if (field.type.name === ScalarTypes.Boolean) {
    return Value.BooleanValue;
  }
  if (field.type.name === ScalarTypes.Float) {
    return Value.FloatValue;
  }
  if (field.type.name === ScalarTypes.ID) {
    return Value.StringValue;
  }
  if (field.type.name === ScalarTypes.Int) {
    return Value.IntValue;
  }
  if (field.type.name === ScalarTypes.String) {
    return Value.StringValue;
  }
  return;
};
