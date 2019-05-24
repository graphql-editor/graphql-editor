import {
  Directive,
  Instances,
  ParserTree,
  ScalarTypes,
  TypeDefinition,
  TypeSystemDefinition,
  ValueDefinition
} from '../../Models';
import { Parser, ParserUtils } from '../../Parser';

// TODO: Add schema directive test
// TODO: Add directive with arguments test

describe('Directive tests on parser', () => {
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.OBJECT
  }`, () => {
    const schema = `
    directive @model on ${Directive.OBJECT}
    type Person @model
    `;
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
          args: [],
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ]
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.OBJECT]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.FIELD_DEFINITION
  }`, () => {
    const schema = `
    directive @model on ${Directive.FIELD_DEFINITION}
    type Person {
      name: String @model
    }
    `;
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
          args: [
            {
              name: 'name',
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              args: [],
              directives: [
                {
                  name: 'model',
                  data: {
                    type: Instances.Directive
                  },
                  type: {
                    name: 'model'
                  },
                  args: []
                }
              ]
            }
          ],
          directives: []
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.FIELD_DEFINITION]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.ARGUMENT_DEFINITION
  }`, () => {
    const schema = `
    directive @model on ${Directive.ARGUMENT_DEFINITION}
    type Person {
      name(override:String @model): String
    }
    `;
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
          args: [
            {
              name: 'name',
              args: [
                {
                  name: 'override',
                  type: {
                    name: ScalarTypes.String
                  },
                  data: {
                    type: ValueDefinition.InputValueDefinition
                  },
                  args: [],
                  directives: [
                    {
                      name: 'model',
                      data: {
                        type: Instances.Directive
                      },
                      type: {
                        name: 'model'
                      },
                      args: []
                    }
                  ]
                }
              ],
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: TypeSystemDefinition.FieldDefinition
              },
              directives: []
            }
          ],
          directives: []
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.ARGUMENT_DEFINITION]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.INTERFACE
  }`, () => {
    const schema = `
    directive @model on ${Directive.INTERFACE}
    interface Person @model
    `;
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
          interfaces: [],
          args: [],
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ]
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.INTERFACE]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.UNION
  }`, () => {
    const schema = `
    directive @model on ${Directive.UNION}
    type Car
    type Plane
    union Machine @model = Car | Plane
    `;
    const tree = Parser.parse(schema);
    const treeMock: ParserTree = {
      nodes: [
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.UNION]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        },
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
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ],
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
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.ENUM
  }`, () => {
    const schema = `
    directive @model on ${Directive.ENUM}
    enum Person @model
    `;
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
          args: [],
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ]
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.ENUM]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.ENUM_VALUE
  }`, () => {
    const schema = `
    directive @model on ${Directive.ENUM_VALUE}
    enum Person{
      SMART @model
      DUMB
    }
    `;
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
          args: [
            {
              name: 'SMART',
              type: {
                name: ValueDefinition.EnumValueDefinition
              },
              data: {
                type: ValueDefinition.EnumValueDefinition
              },
              directives: [
                {
                  name: 'model',
                  data: {
                    type: Instances.Directive
                  },
                  type: {
                    name: 'model'
                  },
                  args: []
                }
              ]
            },
            {
              name: 'DUMB',
              type: {
                name: ValueDefinition.EnumValueDefinition
              },
              data: {
                type: ValueDefinition.EnumValueDefinition
              },
              directives: []
            }
          ],
          directives: []
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.ENUM_VALUE]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.INPUT_OBJECT
  }`, () => {
    const schema = `
    directive @model on ${Directive.INPUT_OBJECT}
    input Person @model
    `;
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
          args: [],
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ]
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.INPUT_OBJECT]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.INPUT_FIELD_DEFINITION
  }`, () => {
    const schema = `
    directive @model on ${Directive.INPUT_FIELD_DEFINITION}
    input Person{
      name: String
    }
    `;
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
          args: [
            {
              name: 'name',
              type: {
                name: ScalarTypes.String
              },
              data: {
                type: ValueDefinition.InputValueDefinition
              },
              args: [],
              directives: [
                {
                  name: 'model',
                  data: {
                    type: Instances.Directive
                  },
                  type: {
                    name: 'model'
                  },
                  args: []
                }
              ]
            }
          ],
          directives: []
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.INPUT_FIELD_DEFINITION]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
  test(`${TypeSystemDefinition.DirectiveDefinition} - directive keyword on ${
    Directive.SCALAR
  }`, () => {
    const schema = `
    directive @model on ${Directive.SCALAR}
    scalar Person @model
    `;
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
          directives: [
            {
              name: 'model',
              data: {
                type: Instances.Directive
              },
              type: {
                name: 'model'
              },
              args: []
            }
          ]
        },
        {
          name: 'model',
          type: {
            name: TypeSystemDefinition.DirectiveDefinition,
            directiveOptions: [Directive.SCALAR]
          },
          data: {
            type: TypeSystemDefinition.DirectiveDefinition
          },
          args: []
        }
      ]
    };
    expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
  });
});
