import {
  TypeDefinition,
  TypeExtension,
  TypeSystemDefinition,
} from "graphql-js-tree";

export interface OmitNodes {
  [TypeDefinition.ObjectTypeDefinition]?: boolean;
  [TypeExtension.ObjectTypeExtension]?: boolean;
  [TypeDefinition.EnumTypeDefinition]?: boolean;
  [TypeExtension.EnumTypeExtension]?: boolean;
  [TypeDefinition.InputObjectTypeDefinition]?: boolean;
  [TypeExtension.InputObjectTypeExtension]?: boolean;
  [TypeDefinition.InterfaceTypeDefinition]?: boolean;
  [TypeExtension.InterfaceTypeExtension]?: boolean;
  [TypeDefinition.ScalarTypeDefinition]?: boolean;
  [TypeExtension.ScalarTypeExtension]?: boolean;
  [TypeDefinition.UnionTypeDefinition]?: boolean;
  [TypeExtension.UnionTypeExtension]?: boolean;
  [TypeSystemDefinition.DirectiveDefinition]?: boolean;
}
