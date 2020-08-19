import { ParserField, TypeDefinition, TypeSystemDefinition } from 'graphql-zeus';

export const ResolveCreateField = (field: ParserField, actualFields: ParserField[]): ParserField[] | undefined => {
  if (
    field.data.type === TypeDefinition.ObjectTypeDefinition ||
    field.data.type === TypeDefinition.InterfaceTypeDefinition
  ) {
    return actualFields.filter(
      (f) =>
        f.data.type === TypeDefinition.ObjectTypeDefinition ||
        f.data.type === TypeDefinition.EnumTypeDefinition ||
        f.data.type === TypeDefinition.ScalarTypeDefinition ||
        f.data.type === TypeDefinition.UnionTypeDefinition ||
        f.data.type === TypeDefinition.InterfaceTypeDefinition,
    );
  }
  if (field.data.type === TypeDefinition.InputObjectTypeDefinition) {
    return actualFields.filter(
      (f) =>
        f.data.type === TypeDefinition.InputObjectTypeDefinition ||
        f.data.type === TypeDefinition.EnumTypeDefinition ||
        f.data.type === TypeDefinition.ScalarTypeDefinition,
    );
  }
  if (field.data.type === TypeDefinition.EnumTypeDefinition) {
    return [];
  }
  if (field.data.type === TypeDefinition.UnionTypeDefinition) {
    return actualFields.filter((f) => f.data.type === TypeDefinition.ObjectTypeDefinition);
  }
  if (field.data.type === TypeDefinition.ScalarTypeDefinition) {
    return undefined;
  }
  if (field.data.type === TypeSystemDefinition.FieldDefinition) {
    return [];
  }
  if (field.data.type === TypeSystemDefinition.UnionMemberDefinition) {
    return undefined;
  }
  return [];
};
