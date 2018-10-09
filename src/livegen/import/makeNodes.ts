import { getTypes } from '.';
import { GraphQLNodeType } from '../gens';
import { nodeTypes, SubTypes, allTypes } from '../../nodeTypes';
import { noPort, accepted } from '../../categories';
import { MAIN_TAB_NAME, generateId, LinkType } from '@slothking-online/diagram';
import {
  EditorSchemaBasicType,
  EditorSchemaType,
  EditorSchemaImport,
  EditorSchemaField
} from './import';
import { GraphQLSchema } from 'graphql';

const isNotCircularReferenceType = (disallowedTypes: string[]) => (fieldType: string) => {
  return !disallowedTypes.includes(fieldType);
};

const makeCustomNode = (
  node: PartialPick<GraphQLNodeType, 'subType' | 'type' | 'name'>
): GraphQLNodeType => ({
  id: generateId(),
  outputs: noPort,
  inputs: [
    {
      name: '',
      accepted,
      id: generateId()
    }
  ],
  tab: MAIN_TAB_NAME,
  editable: true,
  nodes: [],
  x: window.innerWidth * Math.random(),
  y: window.innerHeight * Math.random(),
  ...node
});

export const makeNodes = (
  schema: GraphQLSchema
): {
  nodes: GraphQLNodeType[];
  links: LinkType[];
} => {
  const types: EditorSchemaImport = getTypes(schema);
  const allowType = isNotCircularReferenceType([
    ...(types.query ? [types.query[0].name] : []),
    ...(types.mutation ? [types.mutation[0].name] : []),
    ...(types.subscription ? [types.subscription[0].name] : [])
  ]);
  const makeCustomDefinitionNode = (t: EditorSchemaType) =>
    makeCustomNode({
      name: t.name,
      type: t.type,
      subType: t.subType
    });
  const makeCustomScalarDefinitionNode = (t: EditorSchemaType): GraphQLNodeType => ({
    ...makeCustomDefinitionNode(t),
    inputs: []
  });
  const makeCustomOperationNode = (
    name: string,
    operationType: nodeTypes.query | nodeTypes.mutation | nodeTypes.subscription
  ) =>
    makeCustomNode({
      name,
      type: operationType,
      subType: SubTypes.definition,
      outputs: [{ name: '' }]
    });
  const makeCustomArrayNode = (props: {
    arrayFieldNodeId: string;
    arrayInputId: string;
    arrayOutputId: string;
    x: number;
    y: number;
    arrayRequired: boolean;
  }) =>
    makeCustomNode({
      id: props.arrayFieldNodeId,
      name: 'array',
      type: nodeTypes.array,
      subType: SubTypes.field,
      required: props.arrayRequired,
      editable: false,
      inputs: [{ name: '', id: props.arrayInputId }],
      outputs: [{ name: '', id: props.arrayOutputId }],
      x: props.x,
      y: props.y
    });

  const makeCustomFieldNode = (
    f: EditorSchemaField,
    props: {
      x: number;
      y: number;
      clone?: string;
      fieldNodeId: string;
      outputId: string;
      fieldInputId: string;
    }
  ) =>
    makeCustomNode({
      id: props.fieldNodeId,
      name: f.name,
      type: f.type,
      subType: f.subType,
      required: f.required,
      kind: f.kind,
      clone: props.clone,
      inputs: [
        {
          id: props.fieldInputId,
          accepted,
          name: ''
        }
      ],
      outputs: [{ name: '', id: props.outputId }],
      x: props.x,
      y: props.y
    });
  let nodes: GraphQLNodeType[] = [types.interface, types.type, types.input, types.enum, types.union]
    .map((t) => t.map(makeCustomDefinitionNode))
    .reduce((a, b) => [...a, ...b], []);
  nodes = [
    ...types.scalar.map(makeCustomScalarDefinitionNode),
    ...nodes,
    ...(types.query
      ? types.query[0].fields
          .filter((f) => allowType(f.name))
          .map((f) => makeCustomOperationNode(f.name, nodeTypes.query))
      : []),
    ...(types.mutation
      ? types.mutation[0].fields
          .filter((f) => allowType(f.name))
          .map((f) => makeCustomOperationNode(f.name, nodeTypes.mutation))
      : []),
    ...(types.subscription
      ? types.subscription[0].fields
          .filter((f) => allowType(f.name))
          .map((f) => makeCustomOperationNode(f.name, nodeTypes.subscription))
      : [])
  ];

  const links: LinkType[] = [];
  const flowHeight = window.innerHeight || 1000;
  let nowY = 0;
  let nowX = 0;
  const nodeHeight = 100;
  const nodeWidth = 180;
  const fieldNodesCreation = (f: EditorSchemaBasicType[], type: allTypes): GraphQLNodeType[] =>
    f
      .filter((f) => allowType(f.name))
      .map((t, i) => {
        if (nowY > flowHeight) {
          (nowY = 0), (nowX += nodeWidth * 3);
        }
        const originalNode = nodes.find((n) => n.name === t.name && n.type === type);
        originalNode.x = nowX;
        originalNode.y = nowY + (t.fields.length * nodeHeight) / 2.0;
        return t.fields
          .map((f) => {
            const outputId = generateId();
            const fieldNodeId = generateId();
            const fieldInputId = generateId();
            const returnNodes = [];
            if (f.array) {
              const arrayFieldNodeId = generateId();
              const arrayInputId = generateId();
              const arrayOutputId = generateId();
              const customArrayNode = makeCustomArrayNode({
                arrayFieldNodeId,
                arrayInputId,
                arrayOutputId,
                arrayRequired: f.arrayRequired,
                x: nowX - nodeWidth,
                y: nowY
              });
              links.push({
                from: {
                  nodeId: arrayFieldNodeId,
                  portId: arrayOutputId
                },
                to: {
                  nodeId: originalNode.id,
                  portId: originalNode.inputs[0].id
                }
              });
              links.push({
                from: {
                  nodeId: fieldNodeId,
                  portId: outputId
                },
                to: {
                  nodeId: arrayFieldNodeId,
                  portId: arrayInputId
                }
              });
              returnNodes.push(customArrayNode);
            } else {
              links.push({
                from: {
                  nodeId: fieldNodeId,
                  portId: outputId
                },
                to: {
                  nodeId: originalNode.id,
                  portId: originalNode.inputs[0].id
                }
              });
            }
            if (f.args && f.args.length > 0) {
              f.args.map((arg) => {
                const argOutputId = generateId();
                const argFieldNodeId = generateId();
                const argFieldInputId = generateId();
                if (arg.array) {
                  const argArrayFieldNodeId = generateId();
                  const argArrayInputId = generateId();
                  const argArrayOutputId = generateId();
                  const customArrayNode = makeCustomArrayNode({
                    arrayFieldNodeId: argArrayFieldNodeId,
                    arrayInputId: argArrayInputId,
                    arrayOutputId: argArrayOutputId,
                    arrayRequired: f.arrayRequired,
                    x: nowX - nodeWidth,
                    y: nowY
                  });

                  links.push({
                    from: {
                      nodeId: argArrayFieldNodeId,
                      portId: argArrayOutputId
                    },
                    to: {
                      nodeId: fieldNodeId,
                      portId: fieldInputId
                    }
                  });
                  links.push({
                    from: {
                      nodeId: argFieldNodeId,
                      portId: argOutputId
                    },
                    to: {
                      nodeId: argArrayFieldNodeId,
                      portId: argArrayInputId
                    }
                  });
                  returnNodes.push(customArrayNode);
                } else {
                  links.push({
                    from: {
                      nodeId: argFieldNodeId,
                      portId: argOutputId
                    },
                    to: {
                      nodeId: fieldNodeId,
                      portId: fieldInputId
                    }
                  });
                }
                const customFieldNode = makeCustomFieldNode(arg, {
                  fieldNodeId: argFieldNodeId,
                  clone: arg.kind && nodes.find((n) => n.name === arg.kind).id,
                  x: f.array
                    ? arg.array
                      ? nowX - nodeWidth * 4
                      : nowX - nodeWidth * 3
                    : arg.array
                      ? nowX - nodeWidth * 3
                      : nowX - nodeWidth * 2,
                  y: nowY,
                  fieldInputId: argFieldInputId,
                  outputId: argOutputId
                });
                returnNodes.push(customFieldNode);
              });
            }
            const customFieldNode = makeCustomFieldNode(f, {
              fieldNodeId,
              clone: f.kind && nodes.find((n) => n.name === f.kind).id,
              x: f.array ? nowX - nodeWidth * 2 : nowX - nodeWidth,
              y: nowY,
              fieldInputId,
              outputId
            });
            returnNodes.push(customFieldNode);
            nowY += nodeHeight;
            return returnNodes;
          })
          .reduce((a, b) => [...a, ...b], []);
      })
      .reduce((a, b) => [...a, ...b], []);
  const operationNodesCreation = (f: EditorSchemaBasicType, type: allTypes): GraphQLNodeType[] => {
    return f.fields
      .filter((f) => allowType(f.kind || 'allowed'))
      .map((f) => {
        if (nowY > flowHeight) {
          (nowY = 0), (nowX += nodeWidth * 3);
        }
        const originalNode = nodes.find((n) => n.name === f.name && n.type === type);
        originalNode.x = nowX;
        originalNode.y = nowY + (f.args.length * nodeHeight) / 2.0;
        const outputId = generateId();
        const fieldNodeId = generateId();
        const fieldInputId = generateId();
        const returnNodes = [];
        if (f.array) {
          const arrayFieldNodeId = generateId();
          const arrayInputId = generateId();
          const arrayOutputId = generateId();
          const customArrayNode = makeCustomArrayNode({
            arrayFieldNodeId,
            arrayInputId,
            arrayOutputId,
            arrayRequired: f.arrayRequired,
            x: nowX + nodeWidth,
            y: nowY
          });
          links.push({
            from: {
              nodeId: originalNode.id,
              portId: originalNode.outputs[0].id
            },
            to: {
              nodeId: arrayFieldNodeId,
              portId: arrayInputId
            }
          });
          links.push({
            from: {
              nodeId: arrayFieldNodeId,
              portId: arrayOutputId
            },
            to: {
              nodeId: fieldNodeId,
              portId: fieldInputId
            }
          });
          returnNodes.push(customArrayNode);
        } else {
          links.push({
            from: {
              nodeId: originalNode.id,
              portId: originalNode.outputs[0].id
            },
            to: {
              nodeId: fieldNodeId,
              portId: fieldInputId
            }
          });
        }
        if (f.args && f.args.length > 0) {
          f.args.map((arg) => {
            const argOutputId = generateId();
            const argFieldNodeId = generateId();
            const argFieldInputId = generateId();
            if (arg.array) {
              const argArrayFieldNodeId = generateId();
              const argArrayInputId = generateId();
              const argArrayOutputId = generateId();
              const customArrayNode = makeCustomArrayNode({
                arrayFieldNodeId: argArrayFieldNodeId,
                arrayInputId: argArrayInputId,
                arrayOutputId: argArrayOutputId,
                arrayRequired: f.arrayRequired,
                x: nowX - nodeWidth,
                y: nowY
              });

              links.push({
                from: {
                  nodeId: argArrayFieldNodeId,
                  portId: argArrayOutputId
                },
                to: {
                  nodeId: originalNode.id,
                  portId: originalNode.inputs[0].id
                }
              });
              links.push({
                from: {
                  nodeId: argFieldNodeId,
                  portId: argOutputId
                },
                to: {
                  nodeId: argArrayFieldNodeId,
                  portId: argArrayInputId
                }
              });
              returnNodes.push(customArrayNode);
            } else {
              links.push({
                from: {
                  nodeId: argFieldNodeId,
                  portId: argOutputId
                },
                to: {
                  nodeId: originalNode.id,
                  portId: originalNode.inputs[0].id
                }
              });
            }
            const customFieldNode = makeCustomFieldNode(arg, {
              fieldNodeId: argFieldNodeId,
              clone: arg.kind && nodes.find((n) => n.name === arg.kind).id,
              x: arg.array ? nowX - nodeWidth * 2 : nowX - nodeWidth,
              y: nowY,
              fieldInputId: argFieldInputId,
              outputId: argOutputId
            });
            returnNodes.push(customFieldNode);
          });
        }
        const customFieldNode = makeCustomFieldNode(f, {
          fieldNodeId,
          clone: f.kind && nodes.find((n) => n.name === f.kind).id,
          x: f.array ? nowX + nodeWidth * 2 : nowX + nodeWidth,
          y: nowY,
          fieldInputId,
          outputId
        });
        returnNodes.push(customFieldNode);
        nowY += nodeHeight;
        return returnNodes;
      })
      .reduce((a, b) => [...a, ...b], []);
  };
  operationNodesCreation;
  nodes = [
    ...nodes,
    ...fieldNodesCreation(types.enum, nodeTypes.enum),
    ...fieldNodesCreation(types.union, nodeTypes.union),
    ...fieldNodesCreation(types.type, nodeTypes.type),
    ...fieldNodesCreation(types.interface, nodeTypes.interface),
    ...fieldNodesCreation(types.input, nodeTypes.input),
    ...(types.query ? operationNodesCreation(types.query[0], nodeTypes.query) : []),
    ...(types.mutation ? operationNodesCreation(types.mutation[0], nodeTypes.mutation) : []),
    ...(types.subscription
      ? operationNodesCreation(types.subscription[0], nodeTypes.subscription)
      : [])
  ];
  return {
    nodes,
    links
  };
};
