import {
  GraphQLSchema,
  buildSchema,
  GraphQLType,
  isInterfaceType,
  GraphQLInterfaceType,
  isScalarType,
  isObjectType,
  GraphQLObjectType,
  isInputObjectType,
  GraphQLInputObjectType,
  isEnumType,
  GraphQLEnumType,
  isListType,
  GraphQLFieldMap,
  GraphQLInputFieldMap,
  isNonNullType,
  GraphQLField
} from 'graphql';
import { TypeMap } from 'graphql/type/schema';
import { nodeTypes, SubTypes, allTypes, argumentTypes } from '../../nodeTypes';

export const importSchema = (schema: string): GraphQLSchema => buildSchema(schema);

export const getBuiltInTypes = () =>
  Object.keys(
    importSchema(`
type Querys{
    ID:ID,
    name:String,
    ist:Boolean,
    number:Int,
    float:Float
}
type Mutations{
    mutate:String
}
schema{query:Querys,mutation:Mutations}
`).getTypeMap()
  );

export const resolveGraphQLType = (
  name: string,
  t: GraphQLType,
  required?: boolean
): EditorSchemaField => ({
  name,
  required,
  ...(isScalarType(t)
    ? {
        type: argumentTypes[t.name],
        subType: SubTypes.field
      }
    : isObjectType(t)
      ? {
          type: nodeTypes.type,
          subType: SubTypes.clone,
          kind: t.name
        }
      : isListType(t)
        ? {
            array: true,
            arrayRequired: required,
            ...resolveGraphQLType(name, t.ofType, false)
          }
        : isEnumType(t)
          ? {
              type: nodeTypes.enum,
              subType: SubTypes.clone,
              kind: t.name
            }
          : isInterfaceType(t)
            ? {
                type: nodeTypes.interface,
                subType: SubTypes.clone,
                kind: t.name
              }
            : isInputObjectType(t)
              ? {
                  type: nodeTypes.input,
                  subType: SubTypes.clone,
                  kind: t.name
                }
              : isNonNullType(t)
                ? { ...resolveGraphQLType(name, t.ofType, true) }
                : {
                    type: nodeTypes.union,
                    subType: SubTypes.clone,
                    kind: t.name
                  })
});

export type GraphQLAllTypes = GraphQLType[];

export type EditorSchemaField = {
  name: string;
  type: allTypes;
  subType: keyof typeof SubTypes;
  kind?: string;
  array?: boolean;
  arrayRequired?: boolean;
  required?: boolean;
  args?: EditorSchemaField[];
};

export type EditorSchemaBasicType = {
  name: string;
  type: allTypes;
  subType: keyof typeof SubTypes;
  fields: EditorSchemaField[];
};

export type EditorSchemaType = EditorSchemaBasicType & {
  interfaces: string[];
};
export type EditorSchemaImport = {
  type: EditorSchemaType[];
  input: EditorSchemaBasicType[];
  interface: EditorSchemaBasicType[];
  query: [EditorSchemaBasicType];
  mutation: [EditorSchemaBasicType];
  subscription?: [EditorSchemaBasicType];
};

export const getTypes = (schema: GraphQLSchema): EditorSchemaImport => {
  const queryType = schema.getQueryType().name;
  const mutationType = schema.getMutationType().name;
  const typeMap: TypeMap = schema.getTypeMap();
  const builtIns = getBuiltInTypes();
  const legitInterfaces: GraphQLInterfaceType[] = [];
  const legitInputs: GraphQLInputObjectType[] = [];
  const legitEnums: GraphQLEnumType[] = [];
  let legitQueries: GraphQLObjectType;
  let legitMutations: GraphQLObjectType;
  const legitTypes = Object.keys(typeMap)
    .filter((t) => !builtIns.includes(t))
    .reduce((a, b) => {
      if (isInterfaceType(typeMap[b])) {
        legitInterfaces.push(typeMap[b] as GraphQLInterfaceType);
        return a;
      }
      if (isInputObjectType(typeMap[b])) {
        legitInputs.push(typeMap[b] as GraphQLInputObjectType);
        return a;
      }
      if (isEnumType(typeMap[b])) {
        legitEnums.push(typeMap[b] as GraphQLEnumType);
        return a;
      }
      if (b === queryType) {
        legitQueries = typeMap[b] as GraphQLObjectType;
        return a;
      }
      if (b === mutationType) {
        legitMutations = typeMap[b] as GraphQLObjectType;
        return a;
      }
      a = [typeMap[b], ...a];
      return a;
    }, []) as GraphQLObjectType[];
  const mapFields = (fieldMap: GraphQLFieldMap<any, any>) => {
    return Object.keys(fieldMap)
      .reduce((a, b) => {
        return [...a, fieldMap[b] as GraphQLField<any, any>];
      }, [])
      .map((n) => ({
        ...resolveGraphQLType(n.name, n.type),
        args: n.args.map((a) => resolveGraphQLType(a.name, a.type))
      }));
  };
  const mapInputFields = (fieldMap: GraphQLInputFieldMap) => {
    return Object.keys(fieldMap)
      .reduce((a, b) => {
        return [...a, fieldMap[b]];
      }, [])
      .map((n) => ({
        ...resolveGraphQLType(n.name, n.type),
        args: []
      }));
  };
  const legitTypeNodes: EditorSchemaType[] = legitTypes.map((typeNode) => ({
    type: nodeTypes.type,
    subType: SubTypes.definition,
    name: typeNode.name,
    fields: mapFields(typeNode.getFields()),
    interfaces: typeNode.getInterfaces().map((i) => i.name)
  }));
  const legitInputNodes: EditorSchemaBasicType[] = legitInputs.map((inputNode) => ({
    name: inputNode.name,
    type: nodeTypes.input,
    subType: SubTypes.definition,
    fields: mapInputFields(inputNode.getFields())
  }));
  const legitInterfaceNodes: EditorSchemaBasicType[] = legitInterfaces.map((interfaceNode) => ({
    type: nodeTypes.interface,
    subType: SubTypes.definition,
    name: interfaceNode.name,
    fields: mapFields(interfaceNode.getFields())
  }));
  const legitQueryNode: EditorSchemaBasicType = {
    type: nodeTypes.query,
    subType: SubTypes.definition,
    name: legitQueries.name,
    fields: mapFields(legitQueries.getFields())
  };
  const legitMutationNode: EditorSchemaBasicType = {
    type: nodeTypes.mutation,
    subType: SubTypes.definition,
    name: legitMutations.name,
    fields: mapFields(legitMutations.getFields())
  };
  console.log(legitQueryNode)
  return {
    mutation: [legitMutationNode],
    query: [legitQueryNode],
    interface: legitInterfaceNodes,
    type: legitTypeNodes,
    input: legitInputNodes
  };
};
