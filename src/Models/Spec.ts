export enum ScalarTypes {
  Boolean = 'Boolean',
  Float = 'Float',
  ID = 'ID',
  Int = 'Int',
  String = 'String'
}

export enum Directive {
  SCHEMA = 'SCHEMA',
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  FIELD_DEFINITION = 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION = 'ARGUMENT_DEFINITION',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  ENUM_VALUE = 'ENUM_VALUE',
  INPUT_OBJECT = 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION = 'INPUT_FIELD_DEFINITION'
}
export enum Value {
  Variable = 'Variable',
  IntValue = 'IntValue',
  FloatValue = 'FloatValue',
  StringValue = 'StringValue',
  BooleanValue = 'BooleanValue',
  NullValue = 'NullValue',
  EnumValue = 'EnumValue',
  ListValue = 'ListValue',
  ObjectValue = 'ObjectValue'
}
export enum Type {
  NamedType = 'NamedType',
  ListType = 'ListType',
  NonNullType = 'NonNullType'
}

export enum TypeSystemDefinition {
  SchemaDefinition = 'SchemaDefinition',
  TypeDefinition = 'TypeDefinition',
  DirectiveDefinition = 'DirectiveDefinition',
  FieldDefinition = 'FieldDefinition',
  UnionMemberDefinition = 'UnionMemberDefinition' // NOT IN SPEC
}

export enum TypeSystemExtension {
  SchemaExtension = 'SchemaExtension',
  TypeExtension = 'TypeExtension'
}

export enum TypeDefinition {
  ScalarTypeDefinition = 'ScalarTypeDefinition',
  ObjectTypeDefinition = 'ObjectTypeDefinition',
  InterfaceTypeDefinition = 'InterfaceTypeDefinition',
  UnionTypeDefinition = 'UnionTypeDefinition',
  EnumTypeDefinition = 'EnumTypeDefinition',
  InputObjectTypeDefinition = 'InputObjectTypeDefinition'
}

export enum ValueDefinition {
  EnumValueDefinition = 'EnumValueDefinition',
  InputValueDefinition = 'InputValueDefinition'
}

export enum TypeExtension {
  TypeExtension = 'TypeExtension',
  ScalarTypeExtension = 'ScalarTypeExtension',
  ObjectTypeExtension = 'ObjectTypeExtension',
  InterfaceTypeExtension = 'InterfaceTypeExtension',
  UnionTypeExtension = 'UnionTypeExtension',
  EnumTypeExtension = 'EnumTypeExtension',
  InputObjectTypeExtension = 'InputObjectTypeExtension'
}

export enum OperationType {
  query = 'query',
  mutation = 'mutation',
  subscription = 'subscription'
}

// below this line this is out of spec

export enum Instances {
  Argument = 'Argument',
  Directive = 'Directive'
}
export enum Helpers {
  Directives = 'Directives',
  Implements = 'Implements'
}
