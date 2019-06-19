import { buildASTSchema, GraphQLDirective, GraphQLNamedType, GraphQLSchema, parse } from 'graphql';
import {
  AllTypes,
  BuiltInDirectives,
  ParserField,
  ParserTree,
  TypeDefinitionDisplayMap,
  TypeSystemDefinitionDisplayStrings
} from '../Models';
import { Directive, OperationType, TypeDefinition, TypeSystemDefinition } from '../Models/Spec';
import { TypeResolver } from './typeResolver';
export class Parser {
  static importSchema = (schema: string): GraphQLSchema => buildASTSchema(parse(schema));
  static namedTypeToSerializedNodeTree = (n: GraphQLNamedType): ParserField => {
    const { name } = n;
    return {
      name,
      type: {
        name: TypeDefinitionDisplayMap[n.astNode!.kind]
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
  static directiveToSerializedNodeTree = (n: GraphQLDirective): ParserField => {
    const { name } = n;
    return {
      name,
      type: {
        name: TypeSystemDefinitionDisplayStrings.directive,
        directiveOptions: n.locations as Directive[]
      },
      data: {
        type: TypeSystemDefinition.DirectiveDefinition
      },
      description: n.description ? n.description : undefined,
      args: TypeResolver.iterateInputValueFields(n.args.map((a) => a.astNode!))
    };
  }
  static parse = (schema: string, excludeRoots: string[] = []) => {
    let parsedSchema: GraphQLSchema;
    try {
      parsedSchema = Parser.importSchema(schema);
    } catch (error) {
      /* tslint:disable */ console.log(schema); /* tslint:disable */
    }
    const typeMap = parsedSchema!.getTypeMap();
    const directives = parsedSchema!
      .getDirectives()
      .filter((d) => !Object.keys(BuiltInDirectives).includes(d.name))
      .filter((t) => !excludeRoots.includes(t.name));
    const operations = {
      Query: parsedSchema!.getQueryType(),
      Mutation: parsedSchema!.getMutationType(),
      Subscription: parsedSchema!.getSubscriptionType()
    };

    const rootNodes = Object.keys(typeMap)
      .map((t) => ({
        key: t,
        value: typeMap[t]
      }))
      .filter((t) => t.value.astNode)
      .filter((t) => !excludeRoots.includes(t.value.name))
      .map((t) => t.value);
    const nodeTree: ParserTree = {
      nodes: rootNodes.map(Parser.namedTypeToSerializedNodeTree)
    };
    nodeTree.nodes = nodeTree.nodes.concat(directives.map(Parser.directiveToSerializedNodeTree));
    nodeTree.nodes.forEach((n) => {
      if (n.data!.type! === TypeDefinition.ObjectTypeDefinition) {
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
  };
}
export * from './ParserUtils';
