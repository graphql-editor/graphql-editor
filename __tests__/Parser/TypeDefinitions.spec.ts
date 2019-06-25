import { ParserTree, TypeDefinition, TypeDefinitionDisplayStrings } from '../../src/Models';
import { Parser, ParserUtils } from '../../src/Parser';

describe('TypeDefintion declarations tests on parser', () => {
  test('ObjectTypeDefinition - type keyword', () => {
    const schema = 'type Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.type
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
  test('InterfaceTypeDefinition - interface keyword', () => {
    const schema = 'interface Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.interface
          },
          data: {
            type: TypeDefinition.InterfaceTypeDefinition
          },
          directives: [],
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test('InputObjectTypeDefinition - input keyword', () => {
    const schema = 'input Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test('EnumTypeDefinition - enum keyword', () => {
    const schema = 'enum Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.enum
          },
          data: {
            type: TypeDefinition.EnumTypeDefinition
          },
          directives: [],
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test('UnionTypeDefinition - union keyword', () => {
    const schema = 'union Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.union
          },
          data: {
            type: TypeDefinition.UnionTypeDefinition
          },
          directives: [],
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test('ScalarTypeDefinition - scalar keyword', () => {
    const schema = 'scalar Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.scalar
          },
          data: {
            type: TypeDefinition.ScalarTypeDefinition
          },
          directives: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
});
