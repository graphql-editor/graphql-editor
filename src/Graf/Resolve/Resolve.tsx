import { ParserField, TypeDefinition, TypeSystemDefinition, ValueDefinition } from 'graphql-zeus';
import { BuiltInScalars } from '@Graf/Resolve/BuiltInNodes';

export const ResolveCreateField = (field: ParserField, actualFields: ParserField[]): ParserField[] | undefined => {
  if (
    field.data.type === TypeDefinition.ObjectTypeDefinition ||
    field.data.type === TypeDefinition.InterfaceTypeDefinition
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
  if (field.data.type === TypeDefinition.UnionTypeDefinition) {
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
  return [];
};

export const ResolveImplementInterface = (
  field: ParserField,
  actualFields: ParserField[],
): ParserField[] | undefined => {
  if (field.data.type === TypeDefinition.ObjectTypeDefinition) {
    return actualFields.filter((f) => f.data.type === TypeDefinition.InterfaceTypeDefinition);
  }
  return [];
};
