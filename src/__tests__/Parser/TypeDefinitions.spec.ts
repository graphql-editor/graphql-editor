import { ParserTree, TypeDefinition } from '../../Models';
import { Parser, ParserUtils } from '../../Parser';

describe('TypeDefintion declarations tests on parser', () => {
  test('ObjectTypeDefinition - type keyword', () => {
    const schema = 'type Person';
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Person',
          type: {
            name: TypeDefinition.ObjectTypeDefinition
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
            name: TypeDefinition.InterfaceTypeDefinition
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
            name: TypeDefinition.InputObjectTypeDefinition
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
            name: TypeDefinition.EnumTypeDefinition
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
            name: TypeDefinition.UnionTypeDefinition
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
            name: TypeDefinition.ScalarTypeDefinition
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
