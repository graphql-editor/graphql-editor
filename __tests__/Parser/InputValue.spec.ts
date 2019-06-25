import {
  Instances,
  ParserTree,
  ScalarTypes,
  TypeDefinition,
  TypeDefinitionDisplayStrings,
  Value,
  ValueDefinition
} from '../../src/Models';
import { Parser, ParserUtils } from '../../src/Parser';

describe('Input Values tests on parser', () => {
  test(`Built in ScalarTypes - ${Object.keys(ScalarTypes).join(', ')}`, () => {
    const schema = `input Person{
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
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'id',
              type: {
                name: ScalarTypes.ID
              },
              data: {
                type: ValueDefinition.InputValueDefinition
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
                type: ValueDefinition.InputValueDefinition
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
                type: ValueDefinition.InputValueDefinition
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
                type: ValueDefinition.InputValueDefinition
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
                type: ValueDefinition.InputValueDefinition
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
    input Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinitionDisplayStrings.enum
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
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
              },
              data: {
                type: ValueDefinition.InputValueDefinition
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
  test('Input objects', () => {
    const schema = `
    input Car{
        year:Int
    }
    input Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'year',
              type: {
                name: ScalarTypes.Int
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: []
            }
          ]
        },
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
              },
              data: {
                type: ValueDefinition.InputValueDefinition
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
    input Person{
        car: Car
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinitionDisplayStrings.scalar
          },
          data: {
            type: TypeDefinition.ScalarTypeDefinition
          },
          directives: []
        },
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
              },
              data: {
                type: ValueDefinition.InputValueDefinition
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
  test(`Default ScalarTypes values - ${Object.keys(ScalarTypes).join(', ')}`, () => {
    const schema = `input Person{
        id: ${ScalarTypes.ID} = "abcdef"
        name: ${ScalarTypes.String} = "Artur"
        age: ${ScalarTypes.Int} = 28
        weight: ${ScalarTypes.Float} = 73.0
        verified: ${ScalarTypes.Boolean} = true
    }`;
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
          args: [
            {
              name: 'id',
              type: {
                name: ScalarTypes.ID
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: 'abcdef',
                  type: {
                    name: Value.StringValue
                  },
                  data: {
                    type: Value.StringValue
                  }
                }
              ]
            },
            {
              name: 'name',
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: 'Artur',
                  type: {
                    name: Value.StringValue
                  },
                  data: {
                    type: Value.StringValue
                  }
                }
              ]
            },
            {
              name: 'age',
              type: {
                name: ScalarTypes.Int
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: '28',
                  type: {
                    name: Value.IntValue
                  },
                  data: {
                    type: Value.IntValue
                  }
                }
              ]
            },
            {
              name: 'weight',
              type: {
                name: ScalarTypes.Float
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: '73.0',
                  type: {
                    name: Value.FloatValue
                  },
                  data: {
                    type: Value.FloatValue
                  }
                }
              ]
            },
            {
              name: 'verified',
              type: {
                name: ScalarTypes.Boolean
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: 'true',
                  type: {
                    name: Value.BooleanValue
                  },
                  data: {
                    type: Value.BooleanValue
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });

  test('Default Input objects', () => {
    const schema = `
    input Car{
        year:Int
    }
    input Person{
        car: Car = {
            year: 2010
        }
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'year',
              type: {
                name: ScalarTypes.Int
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: []
            }
          ]
        },
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: Value.ObjectValue,
                  type: {
                    name: Value.ObjectValue
                  },
                  data: {
                    type: Value.ObjectValue
                  },
                  args: [
                    {
                      name: 'year',
                      type: {
                        name: 'year',
                        options: []
                      },
                      data: {
                        type: Instances.Argument
                      },
                      args: [
                        {
                          name: '2010',
                          type: {
                            name: Value.IntValue
                          },
                          data: {
                            type: Value.IntValue
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test('Default Enum objects', () => {
    const schema = `
    enum Car {
        HONDA
        YAMAHA
    }
    input Person{
        car: Car = HONDA
    }`;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'Car',
          type: {
            name: TypeDefinitionDisplayStrings.enum
          },
          data: {
            type: TypeDefinition.EnumTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'HONDA',
              data: {
                type: ValueDefinition.EnumValueDefinition
              },
              type: {
                name: ValueDefinition.EnumValueDefinition
              },
              directives: []
            },
            {
              name: 'YAMAHA',
              data: {
                type: ValueDefinition.EnumValueDefinition
              },
              type: {
                name: ValueDefinition.EnumValueDefinition
              },
              directives: []
            }
          ]
        },
        {
          name: 'Person',
          type: {
            name: TypeDefinitionDisplayStrings.input
          },
          data: {
            type: TypeDefinition.InputObjectTypeDefinition
          },
          directives: [],
          args: [
            {
              name: 'car',
              type: {
                name: 'Car'
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              directives: [],
              args: [
                {
                  name: 'HONDA',
                  type: {
                    name: 'HONDA'
                  },
                  data: {
                    type: Value.EnumValue
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
});
