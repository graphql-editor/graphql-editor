import { GraphQLSchema, buildASTSchema, parse, GraphQLNamedType } from 'graphql';
import { TypeResolver } from './typeResolver';
import { ParserTree, ParserRoot } from '../Models';
export class Parser {
  private schema?: GraphQLSchema;
  static importSchema = (schema: string): GraphQLSchema => buildASTSchema(parse(schema));
  namedTypeToSerializedNodeTree = (n: GraphQLNamedType): ParserRoot => {
    const { name } = n;
    const type = TypeResolver.resolveRootNode(n.astNode!.kind);
    return {
      name,
      type,
      description: n.description ? n.description : undefined,
      interfaces: TypeResolver.resolveInterfaces(n.astNode!),
      fields: TypeResolver.resolveFields(n.astNode!)
    };
  };
  parse = (schema: string) => {
    this.schema = Parser.importSchema(schema);
    const typeMap = this.schema!.getTypeMap();
    const operations = {
      Query: this.schema.getQueryType(),
      Mutation: this.schema.getMutationType(),
      Subscription: this.schema.getSubscriptionType()
    };
    if (!operations.Query) {
      throw new Error('Query is required for schema to work. INVALID SCHEMA');
    }
    const rootNodes = Object.keys(typeMap)
      .map((t) => ({
        key: t,
        value: typeMap[t]
      }))
      .filter((t) => t.value.astNode)
      .map((t) => t.value);

    const nodeTree: ParserTree = {
      nodes: rootNodes.map(this.namedTypeToSerializedNodeTree)
    };
    return nodeTree;
  };
}
