import { ActionCategory, Item, PortType, AcceptedConnection } from '@slothking-online/diagram';
import { argumentTypes, nodeTypes, SubTypes, Macros } from '../nodeTypes';
import { GraphQLNodeType } from '../livegen/gens';
import { getFakerMethods } from '../livegen/gens/faker';
export const noPort = [];
export const singlePortOutput: PortType[] = [
  {
    name: '',
    output: true
  }
];
export const accepted: AcceptedConnection[] = [
  {
    node: {
      subType: SubTypes.field
    }
  },
  {
    node: {
      subType: SubTypes.faker
    }
  },
  {
    node: {
      type: nodeTypes.query
    }
  },
  {
    node: {
      type: nodeTypes.mutation
    }
  },
  {
    node: {
      type: nodeTypes.subscription
    }
  },
  {
    node: {
      subType: SubTypes.clone
    }
  }
];
//Accepted inputs
export const inputs: PortType[] = [
  {
    name: '',
    accepted
  }
];
export const outputs:PortType[] = [
  {
    name:''
  }
]
const baseNode = (
  subType: GraphQLNodeType['subType'],
  type: GraphQLNodeType['type']
): GraphQLNodeType => ({
  type,
  name: type,
  subType,
  editable: true,
  outputs: noPort,
  inputs: noPort
});
const baseDefinitionNode = (type: GraphQLNodeType['type']): GraphQLNodeType => ({
  ...baseNode('definition', type),
  editable: true,
  outputs: noPort,
  inputs: noPort
});
const baseFieldNode = (type: GraphQLNodeType['type']): GraphQLNodeType => ({
  ...baseNode('field', type),
  editable: true,
  inputs,
  outputs: [
    {
      name: ''
    }
  ]
});

const getFakerNodes = (): ActionCategory => {
  const fkNodes = getFakerMethods();
  return {
    name: 'faker',
    items: Object.keys(fkNodes).map(
      (k: keyof typeof fkNodes) =>
        ({
          name: k,
          items: fkNodes[k].items.map(
            (i) =>
              ({
                name: i.name,
                node: {
                  ...baseNode('faker', argumentTypes.String),
                  name: i.name,
                  editable: true,
                  kind: `${k}.${i.name}`,
                  inputs,
                  outputs: [
                    {
                      name: ''
                    }
                  ]
                }
              } as Item)
          )
        } as Item)
    )
  };
};

export const categories: ActionCategory[] = [
  {
    name: 'arguments',
    items: []
  },
  {
    name: 'scalars',
    items: Object.keys(argumentTypes).map(
      (name) =>
        ({
          name,
          node: baseFieldNode(name as GraphQLNodeType['type'])
        } as Item)
    )
  },
  {
    name: 'graph',
    items: [
      {
        name: nodeTypes.type,
        node: {
          ...baseDefinitionNode(nodeTypes.type),
          inputs
        }
      },
      {
        name: nodeTypes.input,
        node: {
          ...baseDefinitionNode(nodeTypes.input),
          inputs
        }
      },
      {
        name: nodeTypes.interface,
        node: {
          ...baseDefinitionNode(nodeTypes.interface),
          inputs
        }
      },
      {
        name: nodeTypes.enum,
        node: {
          ...baseDefinitionNode(nodeTypes.enum),
          inputs: [
            {
              name: '',
              accepted: [
                {
                  node: {
                    subType: SubTypes.field,
                    type: argumentTypes.String
                  }
                }
              ]
            }
          ]
        }
      },
      {
        name: nodeTypes.scalar,
        node: {
          ...baseDefinitionNode(nodeTypes.scalar),
          inputs: noPort
        }
      },
      {
        name: nodeTypes.union,
        node: {
          ...baseDefinitionNode(nodeTypes.union),
          inputs:[
            {
              name:'',
              accepted:[
                {
                  node:{
                    type:nodeTypes.type,
                    subType:SubTypes.clone
                  }
                }
              ]
            }
          ]
        }
      },
      {
        name: nodeTypes.array,
        node: baseFieldNode(nodeTypes.array)
      },
      {
        name: nodeTypes.query,
        node: {
          ...baseDefinitionNode(nodeTypes.query),
          inputs,
          outputs,
        }
      },
      {
        name: nodeTypes.mutation,
        node: {
          ...baseDefinitionNode(nodeTypes.mutation),
          inputs,
          outputs,
        }
      },
      {
        name: nodeTypes.subscription,
        node: {
          ...baseDefinitionNode(nodeTypes.subscription),
          inputs,
          outputs,
        }
      }
    ]
  },
  {
    name: 'cloud',
    items: [
      {
        name: Macros.crud,
        node: {
          ...baseDefinitionNode(Macros.crud),
          inputs: [
            {
              name: '',
              accepted: [
                {
                  node: {
                    type: nodeTypes.type
                  }
                }
              ]
            }
          ],
          outputs: noPort
        }
      }
    ]
  },
  getFakerNodes()
];
