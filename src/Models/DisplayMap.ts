import { TypeDefinition, TypeSystemDefinition } from './Spec';

export enum TypeDefinitionDisplayStrings {
  type = 'type',
  enum = 'enum',
  interface = 'interface',
  input = 'input',
  scalar = 'scalar',
  union = 'union'
}
export enum TypeSystemDefinitionDisplayStrings {
  directive = 'directive',
  schema = 'schema',
  definition = 'definition',
  field = 'field',
  member = 'member'
}

export const TypeDefinitionDisplayMap: Record<TypeDefinition, TypeDefinitionDisplayStrings> = {
  [TypeDefinition.ObjectTypeDefinition]: TypeDefinitionDisplayStrings.type,
  [TypeDefinition.EnumTypeDefinition]: TypeDefinitionDisplayStrings.enum,
  [TypeDefinition.InterfaceTypeDefinition]: TypeDefinitionDisplayStrings.interface,
  [TypeDefinition.InputObjectTypeDefinition]: TypeDefinitionDisplayStrings.input,
  [TypeDefinition.ScalarTypeDefinition]: TypeDefinitionDisplayStrings.scalar,
  [TypeDefinition.UnionTypeDefinition]: TypeDefinitionDisplayStrings.union
};

export const TypeSystemDefinitionDisplayMap: Record<
  TypeSystemDefinition,
  TypeSystemDefinitionDisplayStrings
> = {
  [TypeSystemDefinition.DirectiveDefinition]: TypeSystemDefinitionDisplayStrings.directive,
  [TypeSystemDefinition.FieldDefinition]: TypeSystemDefinitionDisplayStrings.field,
  [TypeSystemDefinition.SchemaDefinition]: TypeSystemDefinitionDisplayStrings.schema,
  [TypeSystemDefinition.TypeDefinition]: TypeSystemDefinitionDisplayStrings.definition,
  [TypeSystemDefinition.UnionMemberDefinition]: TypeSystemDefinitionDisplayStrings.member
};
