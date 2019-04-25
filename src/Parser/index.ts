import { buildASTSchema, GraphQLNamedType, GraphQLSchema, parse } from 'graphql';
import { ObjectTypes, Operations, ParserRoot, ParserTree } from '../Models';
import { TypeResolver } from './typeResolver';
export class Parser {
  static importSchema = (schema: string): GraphQLSchema => buildASTSchema(parse(schema));
  private schema?: GraphQLSchema;
  namedTypeToSerializedNodeTree = (n: GraphQLNamedType): ParserRoot => {
    const { name } = n;
    const type = TypeResolver.resolveRootNode(n.astNode!.kind);
    return {
      name,
      type: {
        name: type
      },
      description: n.description ? n.description : undefined,
      interfaces: TypeResolver.resolveInterfaces(n.astNode!),
      fields: TypeResolver.resolveFields(n.astNode!)
    };
  }
  parse = (schema: string, excludeRoots: string[] = []) => {
    try {
      this.schema = Parser.importSchema(schema);
    } catch (error) {
      console.log(schema);
    }

    const typeMap = this.schema!.getTypeMap();

    const operations = {
      Query: this.schema!.getQueryType(),
      Mutation: this.schema!.getMutationType(),
      Subscription: this.schema!.getSubscriptionType()
    };

    if (!operations.Query) {
      console.warn('Query is required for schema to work. INVALID SCHEMA');
    }

    const rootNodes = Object.keys(typeMap)
      .map((t) => ({
        key: t,
        value: typeMap[t]
      }))
      .filter((t) => t.value.astNode)
      .filter((t) => !excludeRoots.includes(t.value.name))
      .map((t) => t.value);

    const nodeTree: ParserTree = {
      nodes: rootNodes.map(this.namedTypeToSerializedNodeTree)
    };

    nodeTree.nodes.forEach((n) => {
      if (n.type.name === ObjectTypes.type) {
        if (operations.Query && operations.Query.name === n.name) {
          n.type.options = [Operations.query];
        }
        if (operations.Mutation && operations.Mutation.name === n.name) {
          n.type.options = [Operations.mutation];
        }
        if (operations.Subscription && operations.Subscription.name === n.name) {
          n.type.options = [Operations.subscription];
        }
      }
    });

    return nodeTree;
  }
}
