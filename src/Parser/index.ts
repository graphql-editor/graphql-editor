import {
  buildASTSchema,
  GraphQLDirective,
  GraphQLNamedType,
  GraphQLSchema,
  isEnumType,
  isInputObjectType,
  isScalarType,
  parse
} from 'graphql';
import {
  BuiltInDirectives,
  Directive,
  NodeData,
  Operations,
  ParserRoot,
  ParserTree
} from '../Models';
import { TypeDefinition, TypeSystemDefinition } from '../Models/Spec';
import { TypeResolver } from './typeResolver';
export class Parser {
  static importSchema = (schema: string): GraphQLSchema => buildASTSchema(parse(schema));
  private schema?: GraphQLSchema;
  namedTypeToSerializedNodeTree = (n: GraphQLNamedType): ParserRoot => {
    const { name } = n;
    return {
      name,
      type: {
        name: n.astNode!.kind
      },
      description: n.description ? n.description : undefined,
      interfaces: TypeResolver.resolveInterfaces(n.astNode!),
      directives: [],
      fields: TypeResolver.resolveFields(n.astNode!)
    };
  }
  directiveToSerializedNodeTree = (n: GraphQLDirective): ParserRoot => {
    const { name } = n;
    const argsByType = (fn: (t: any) => boolean, d: NodeData) =>
      TypeResolver.iterateDirectiveArguments(
        n.args.filter((a) => fn(a.type)).map((a) => a.astNode!),
        d
      );
    const fields = argsByType(isScalarType, NodeData.directiveScalarField)
      .concat(argsByType(isEnumType, NodeData.directiveScalarField))
      .concat(argsByType(isInputObjectType, NodeData.directiveInputField));
    return {
      name,
      type: {
        name: TypeSystemDefinition.DirectiveDefinition,
        directiveOptions: n.locations as Directive[]
      },
      description: n.description ? n.description : undefined,
      fields
    };
  }
  parse = (schema: string, excludeRoots: string[] = []) => {
    try {
      this.schema = Parser.importSchema(schema);
    } catch (error) {
      console.log(schema);
    }

    const typeMap = this.schema!.getTypeMap();
    const directives = this.schema!.getDirectives().filter(
      (d) => !Object.keys(BuiltInDirectives).includes(d.name)
    );
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
