import { GraphQLSchema, buildSchema, buildClientSchema, introspectionFromSchema } from 'graphql';
import { TypeMap } from 'graphql/type/schema';

export const importSchema = (schema: string): GraphQLSchema =>
  buildClientSchema(introspectionFromSchema(buildSchema(schema)));


export const getBuiltInTypes = () => Object.keys(importSchema(`
type Query{
    ID:ID,
    name:String,
    ist:Boolean,
    number:Int,
    float:Float
}
type Mutation{
    mutate:String
}
schema{query:Query,mutation:Mutation}
`).getTypeMap())
export const getTypes = (schema: GraphQLSchema) =>{
    const typeMap:TypeMap = schema.getTypeMap()
    const builtIns = getBuiltInTypes()
    const legitTypes = Object.keys(typeMap).filter(t => !builtIns.includes(t))
    return legitTypes
}
