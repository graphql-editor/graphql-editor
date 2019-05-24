import {
  Options,
  ParserTree,
  ScalarTypes,
  TypeDefinition,
  TypeSystemDefinition
} from '../../Models';
import { Parser, ParserUtils } from '../../Parser';

describe('Fields tests on parser', () => {
  test(`Built in ScalarTypes - ${Object.keys(ScalarTypes).join(', ')}`, () => {
    const schema = `type Person{
        id: ${ScalarTypes.ID}
        name: ${ScalarTypes.String}
        age: ${ScalarTypes.Int}
        weight: ${ScalarTypes.Float}
        verified: ${ScalarTypes.Boolean}
    }`;
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
          args: [
            {
              name: 'id',
              type: {
                name: ScalarTypes.ID
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'name',
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'age',
              type: {
                name: ScalarTypes.Int
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'weight',
              type: {
                name: ScalarTypes.Float
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'verified',
              type: {
                name: ScalarTypes.Boolean
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
  test('Type objects', () => {
    const schema = `
    type Car
    type Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinition.ObjectTypeDefinition
          },
          data: {
            type: TypeDefinition.ObjectTypeDefinition
          },
          interfaces: [],
          directives: [],
          args: []
        },
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
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
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
  test('Interface objects', () => {
    const schema = `
    interface Car
    type Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinition.InterfaceTypeDefinition
          },
          data: {
            type: TypeDefinition.InterfaceTypeDefinition
          },
          directives: [],
          args: []
        },
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
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
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
  test('Enum objects', () => {
    const schema = `
    enum Car
    type Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinition.EnumTypeDefinition
          },
          data: {
            type: TypeDefinition.EnumTypeDefinition
          },
          directives: [],
          args: []
        },
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
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
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
  test('Custom scalar objects', () => {
    const schema = `
    scalar Car
    type Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinition.ScalarTypeDefinition
          },
          data: {
            type: TypeDefinition.ScalarTypeDefinition
          },
          directives: []
        },
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
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
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
  test('Union objects', () => {
    const schema = `
    type Car
    type Plane
    union Machine = Car | Plane
    type Person{
        machine: Machine
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinition.ObjectTypeDefinition
          },
          data: {
            type: TypeDefinition.ObjectTypeDefinition
          },
          interfaces: [],
          directives: [],
          args: []
        },
        {
          name: 'Plane',
          type: {
            name: TypeDefinition.ObjectTypeDefinition
          },
          data: {
            type: TypeDefinition.ObjectTypeDefinition
          },
          interfaces: [],
          directives: [],
          args: []
        },
        {
          name: 'Machine',
          type: {
            name: TypeDefinition.UnionTypeDefinition
          },
          data: {
            type: TypeDefinition.UnionTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'Car',
              type: {
                name: 'Car'
              },
              data: {
                type: TypeSystemDefinition.UnionMemberDefinition
              }
            },
            {
              name: 'Plane',
              type: {
                name: 'Plane'
              },
              data: {
                type: TypeSystemDefinition.UnionMemberDefinition
              }
            }
          ]
        },
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
          args: [
            {
              name: 'machine',
              type: {
                name: 'Machine'
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
  test(`Required fields`, () => {
    const schema = `type Person{
        id: ${ScalarTypes.ID}!
        name: ${ScalarTypes.String}
    }`;
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
          args: [
            {
              name: 'id',
              type: {
                name: ScalarTypes.ID,
                options: [Options.required]
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'name',
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
  test(`ListType fields`, () => {
    const schema = `type Person{
        id: ${ScalarTypes.ID}!
        name: [${ScalarTypes.String}]
        friends: [Person!]!
    }`;
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
          args: [
            {
              name: 'id',
              type: {
                name: ScalarTypes.ID,
                options: [Options.required]
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'name',
              type: {
                name: ScalarTypes.String,
                options: [Options.array]
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: [],
              args: []
            },
            {
              name: 'friends',
              type: {
                name: 'Person',
                options: [Options.array, Options.arrayRequired, Options.required]
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
});
