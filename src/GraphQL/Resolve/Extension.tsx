import { AllTypes, TypeDefinition, TypeExtension } from 'graphql-zeus';

export const ResolveExtension = (t: AllTypes) => {
  switch (t) {
    case TypeDefinition.EnumTypeDefinition:
      return TypeExtension.EnumTypeExtension;
    case TypeDefinition.InputObjectTypeDefinition:
      return TypeExtension.InputObjectTypeExtension;
    case TypeDefinition.InterfaceTypeDefinition:
      return TypeExtension.InterfaceTypeExtension;
    case TypeDefinition.ObjectTypeDefinition:
      return TypeExtension.ObjectTypeExtension;
    case TypeDefinition.ScalarTypeDefinition:
      return TypeExtension.ScalarTypeExtension;
    case TypeDefinition.UnionTypeDefinition:
      return TypeExtension.UnionTypeExtension;

    default:
      break;
  }
};
export const isExtensionNode = (t: AllTypes) =>
  !![
    TypeExtension.EnumTypeExtension,
    TypeExtension.InputObjectTypeExtension,
    TypeExtension.InterfaceTypeExtension,
    TypeExtension.ObjectTypeExtension,
    TypeExtension.ScalarTypeExtension,
    TypeExtension.UnionTypeExtension,
  ].find((o) => o === t);
