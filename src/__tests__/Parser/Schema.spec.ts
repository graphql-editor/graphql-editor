import {
  OperationType,
  ParserTree,
  ScalarTypes,
  TypeDefinition,
  TypeDefinitionDisplayStrings,
  TypeSystemDefinition
} from '../../Models';
import { Parser, ParserUtils } from '../../Parser';

describe('Schema base operations', () => {
  test(`query`, () => {
    const schema = `type Query{
          status: ${ScalarTypes.String}
      }
      schema{
          query: Query
      }
      `;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Query',
          type: {
            name: TypeDefinitionDisplayStrings.type,
            operations: [OperationType.query]
          },
          data: {
            type: TypeDefinition.ObjectTypeDefinition
          },
          interfaces: [],
          directives: [],
          args: [
            {
              name: 'status',
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            }
          ]
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`empty query`, () => {
    const schema = `
      type Query
      schema{
          query: Query
      }
      `;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Query',
          type: {
            name: TypeDefinitionDisplayStrings.type,
            operations: [OperationType.query]
          },
          data: {
            type: TypeDefinition.ObjectTypeDefinition
          },
          interfaces: [],
          directives: [],
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
});
