import { TypeDefinition, TypeSystemDefinition } from "graphql-js-tree";

export interface OmitNodes {
  [TypeDefinition.ObjectTypeDefinition]?: boolean;
  [TypeDefinition.EnumTypeDefinition]?: boolean;
  [TypeDefinition.InputObjectTypeDefinition]?: boolean;
  [TypeDefinition.InterfaceTypeDefinition]?: boolean;
  [TypeDefinition.ScalarTypeDefinition]?: boolean;
  [TypeDefinition.UnionTypeDefinition]?: boolean;
  [TypeSystemDefinition.DirectiveDefinition]?: boolean;
}
