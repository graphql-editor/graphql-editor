import { buildASTSchema, GraphQLDirective, GraphQLNamedType, GraphQLSchema, parse } from 'graphql';
import { AllTypes, BuiltInDirectives, ParserField, ParserTree } from '../Models';
import { Directive, OperationType, TypeDefinition, TypeSystemDefinition } from '../Models/Spec';
import { TypeResolver } from './typeResolver';
export class Parser {
  static importSchema = (schema: string): GraphQLSchema => buildASTSchema(parse(schema));
  private schema?: GraphQLSchema;
  namedTypeToSerializedNodeTree = (n: GraphQLNamedType): ParserField => {
    const { name } = n;
    return {
      name,
      type: {
        name: n.astNode!.kind
      },
      data: {
        type: n.astNode!.kind as AllTypes
      },
      description: n.description ? n.description : undefined,
      interfaces: TypeResolver.resolveInterfaces(n.astNode!),
      directives: n.astNode!.directives && TypeResolver.iterateDirectives(n.astNode!.directives),
      args: TypeResolver.resolveFields(n.astNode!)
    };
  }
  directiveToSerializedNodeTree = (n: GraphQLDirective): ParserField => {
    const { name } = n;
    return {
      name,
      type: {
        name: TypeSystemDefinition.DirectiveDefinition,
        directiveOptions: n.locations as Directive[]
      },
      description: n.description ? n.description : undefined,
      args: TypeResolver.iterateInputValueFields(n.args.map((a) => a.astNode!))
    };
  }
  parse = (schema: string, excludeRoots: string[] = []) => {
    try {
      this.schema = Parser.importSchema(schema);
    } catch (error) {
      console.log(schema);
    }
    const typeMap = this.schema!.getTypeMap();
    const directives = this.schema!.getDirectives()
      .filter((d) => !Object.keys(BuiltInDirectives).includes(d.name))
      .filter((t) => !excludeRoots.includes(t.name));
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
    nodeTree.nodes = nodeTree.nodes.concat(directives.map(this.directiveToSerializedNodeTree));
    nodeTree.nodes.forEach((n) => {
      if (n.type.name === TypeDefinition.ObjectTypeDefinition) {
        if (operations.Query && operations.Query.name === n.name) {
          n.type.operations = [OperationType.query];
        }
        if (operations.Mutation && operations.Mutation.name === n.name) {
          n.type.operations = [OperationType.mutation];
        }
        if (operations.Subscription && operations.Subscription.name === n.name) {
          n.type.operations = [OperationType.subscription];
        }
      }
    });
    return nodeTree;
  }
}
