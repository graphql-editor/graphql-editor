export const help = {
  directives: 'Connect directives to use them',
  directive:
    'A GraphQL schema describes directives which are used to annotate various parts of a GraphQL document as an indicator that they should be evaluated differently by a validator, executor, or client tool such as a code generator.',
  type:
    'The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. ',
  interface:
    'Like many type systems, GraphQL supports interfaces. An Interface is an abstract type that includes a certain set of fields that a type must include to implement the interface.',
  input:
    'This is particularly valuable in the case of mutations, where you might want to pass in a whole object to be created. In the GraphQL schema language, input types look exactly the same as regular object types, but with the keyword input instead of type.',
  union: 'Union is a field which says this is type A, type B or type C. Union nodes can have only type instance inputs',
  scalar: 'Custom scalar type',
  enum:
    'Enumeration types are a special kind of scalar that is restricted to a particular set of allowed string values',
  EnumValue: 'Value of Enum',
  NullValue: 'Set value to null',
  String: "Character sequence like 'Hello' or 'person' etc.",
  Int: 'Integer value like 1 or -2 or 0 or 1234',
  Float: 'Floating point value like 2.345, 3334.1, -11.2, 0, 1.0',
  Boolean: 'true or false value',
  ID:
    'The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable',
  implements: 'Connect interface nodes to make type implements them',
  extend: 'Extend type,input,union,interface,enum with this node',
  required: 'Check this if this node is required for creation of the type or is required in input | interface',
  array:
    "Check this if you want a list here for example 'Hello' is a String however ['Hello', 'Me', 'World', 'Sloth'] its an array of strings",
  arrayRequired: 'Check this if you want a list here and you dont want null',
  query: 'This is your endpoint where you serve your data out of your server.',
  mutation: 'Mutation is the same as query but here you also mutate data in your database',
  subscription: 'Subscribe to some real-time event in your database',
};
