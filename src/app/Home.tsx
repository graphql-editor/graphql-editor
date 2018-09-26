import * as React from 'react';
import {
  Graph,
  LoadedFile,
  NodeType,
  LinkType,
  ActionCategory,
  Item
} from '@slothking-online/diagram';
import { categories, singlePortOutput } from '../categories';
import * as styles from '../style/Home';
import {
  typeTemplate,
  interfaceTemplate,
  enumTemplate,
  inputTemplate,
  queryTemplate,
  rootQueryTemplate,
  rootMutationTemplate,
  TemplateProps
} from '../livegen/gens/graphql/template';
import { nodeTypes, SubTypes } from '../nodeTypes';
import { GraphQLNodeType } from '../livegen/gens';
import { crudMacroTemplate } from '../livegen/gens/graphql/macros/crud';
import { generateFakerResolver } from '../livegen/gens/faker';
import { getDefinitionInputs, getDefinitionOutputs } from '../livegen/gens/utils';
import { CodeEditor } from './Code';

export type ModelState = {
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  loaded?: LoadedFile;
  projectId?: string;
  liveCode: string;
};

class Home extends React.Component<{}, ModelState> {
  state: ModelState = {
    nodes: [],
    links: [],
    loaded: null,
    projectId: null,
    liveCode: ''
  };
  componentDidMount() {}
  render() {
    const filterDefinitions = (nodes: NodeType[], type: keyof typeof nodeTypes) =>
      nodes.filter((n: NodeType) => n.type === type && n.subType === SubTypes.definition);
    const mapToNode = (type: keyof typeof nodeTypes) => (n: NodeType) => ({
      name: n.name,
      node: {
        name: n.name,
        type,
        subType: SubTypes.clone,
        kind: n.name,
        clone: n.id,
        outputs: singlePortOutput,
        inputs: [
          {
            name: '',
            accepted: [
              {
                node: {
                  subType: SubTypes.field
                }
              },
              {
                node: {
                  subType: SubTypes.definition,
                  type: nodeTypes.query
                }
              },
              {
                node: {
                  subType: SubTypes.clone
                }
              }
            ]
          }
        ],
        editable: true
      }
    });
    const addType = (nodes: NodeType[], type: keyof typeof nodeTypes): Item[] =>
      filterDefinitions(nodes, type).map(mapToNode(type));
    const addImplements = (nodes: NodeType[]): Item[] =>
      filterDefinitions(nodes, nodeTypes.interface).map(mapToNode(nodeTypes.implements));
    const allCategories: ActionCategory[] = [
      ...categories.map(
        (c) =>
          c.name === 'arguments'
            ? {
                ...c,
                items: [
                  ...[
                    {
                      name: nodeTypes.type,
                      items: addType(this.state.nodes, nodeTypes.type)
                    },
                    // {
                    //   name: nodeTypes.interface,
                    //   items: addType(this.state.nodes, nodeTypes.interface)
                    // }, SOON
                    {
                      name: nodeTypes.implements,
                      items: addImplements(this.state.nodes)
                    },
                    {
                      name: nodeTypes.input,
                      items: addType(this.state.nodes, nodeTypes.input)
                    },
                    {
                      name: nodeTypes.enum,
                      items: addType(this.state.nodes, nodeTypes.enum)
                    }
                  ],
                  ...c.items
                ]
              }
            : c
      )
    ];
    return (
      <div className={styles.Full}>
        <CodeEditor liveCode={this.state.liveCode} />
        <Graph
          categories={allCategories}
          loaded={this.state.loaded}
          serialize={(node, links, tabs) => {
            let nodes = node as GraphQLNodeType[];
            nodes = [...nodes];
            let nodeInputs: TemplateProps[] = nodes
              .filter((n) => n.subType === SubTypes.definition)
              .map((n) => ({
                node: n,
                inputs: getDefinitionInputs(links, nodes, n),
                outputs: getDefinitionOutputs(links, nodes, n)
              }));
            nodeInputs = nodeInputs.map(
              (n) =>
                n.node.type === nodeTypes.type
                  ? {
                      ...n,
                      inputs: [
                        ...n.inputs,
                        ...n.inputs
                          .filter((ni) => ni.type === nodeTypes.implements)
                          .map(
                            (interfaceTypeInput) =>
                              nodeInputs.find((ni) => ni.node.id === interfaceTypeInput.clone)
                                .inputs
                          )
                          .reduce((a, b) => [...a, ...b], [])
                      ]
                    }
                  : n
            );
            const crudMacroNodes = crudMacroTemplate(nodes, links, nodeInputs);
            nodeInputs = [...nodeInputs, ...crudMacroNodes];
            const generator = (
              type: keyof typeof nodeTypes,
              template: (props: TemplateProps) => string
            ) =>
              nodeInputs
                .filter((n) => n.node.type === type)
                .map(template)
                .join('\n');
            const typesCode = generator(nodeTypes.type, typeTemplate);
            const enumsCode = generator(nodeTypes.enum, enumTemplate);
            const interfacesCode = generator(nodeTypes.interface, interfaceTemplate);
            const inputsCode = generator(nodeTypes.input, inputTemplate);
            const queriesCode = rootQueryTemplate(generator(nodeTypes.query, queryTemplate));
            const mutationsCode = rootMutationTemplate(
              generator(nodeTypes.mutation, queryTemplate)
            );
            const resolverCode = nodeInputs.map(generateFakerResolver).join('\n');
            resolverCode;
            const mainCode = `schema{
  query: Query,
  mutation: Mutation
}`;
            const liveCode = [
              enumsCode,
              inputsCode,
              interfacesCode,
              typesCode,
              queriesCode,
              mutationsCode,
              mainCode
            ].join('\n');
            this.setState({
              liveCode,
              nodes,
              links,
              tabs
            });
          }}
        />
      </div>
    );
  }
}
export default Home;
