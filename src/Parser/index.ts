import { GraphQLSchema, buildASTSchema, parse, GraphQLNamedType } from 'graphql';
import { testSchemaComplicated } from './testSchema';
import { TypeResolver } from './typeResolver';
import { Colors } from '../Colors';
import { ParserTree, ParserRoot } from '../Models';
export class Parser {
  private schema?: GraphQLSchema;
  importSchema = (schema: string): GraphQLSchema => (this.schema = buildASTSchema(parse(schema)));
  namedTypeToSerializedNodeTree = (n: GraphQLNamedType):ParserRoot => {
    const { name } = n;
    const type = TypeResolver.resolveRootNode(n.astNode!.kind);
    console.log(`%c${type} %c${name}`, `color:${Colors.main[0]}`, `color:${Colors.green[0]}`);
    return {
      name,
      type,
      fields: TypeResolver.resolveFields(n.astNode!)
    };
  };
  parse = () => {
    console.log(this.schema);
    const typeMap = this.schema!.getTypeMap();
    // const operations = {
    //   Query: this.schema.getQueryType(),
    //   Mutation: this.schema.getMutationType(),
    //   Subscription: this.schema.getSubscriptionType()
    // };
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
    console.log(nodeTree);
    return nodeTree;
  };
  parserTest = () => {
    this.importSchema(testSchemaComplicated);
    this.parse();
  };
}
