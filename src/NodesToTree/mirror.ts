import { TypeDefinition, TypeSystemDefinition } from '../Models/Spec';

export enum TypeDefinitionName {
  type = 'type',
  directive = 'directive',
  enum = 'enum',
  input = 'input',
  interface = 'interface',
  scalar = 'scalar',
  union = 'union'
}

export const TypeDefinitionMirror = {
  [TypeSystemDefinition.DirectiveDefinition]: TypeDefinitionName.directive,
  [TypeDefinition.ObjectTypeDefinition]: TypeDefinitionName.type,
  [TypeDefinition.EnumTypeDefinition]: TypeDefinitionName.enum,
  [TypeDefinition.InputObjectTypeDefinition]: TypeDefinitionName.input,
  [TypeDefinition.InterfaceTypeDefinition]: TypeDefinitionName.interface,
  [TypeDefinition.ScalarTypeDefinition]: TypeDefinitionName.scalar,
  [TypeDefinition.UnionTypeDefinition]: TypeDefinitionName.union
};
