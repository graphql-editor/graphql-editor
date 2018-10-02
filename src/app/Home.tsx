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
  TemplateProps,
  rootSubscriptionTemplate,
  scalarTemplate,
  unionTemplate
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
    loaded: {
      nodes: [],
      links: [],
      tabs: []
    },
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
                    {
                      name: nodeTypes.interface,
                      items: addType(this.state.nodes, nodeTypes.interface)
                    },
                    {
                      name: nodeTypes.implements,
                      items: addImplements(this.state.nodes)
                    },
                    {
                      name: nodeTypes.input,
                      items: addType(this.state.nodes, nodeTypes.input)
                    },
                    {
                      name: nodeTypes.scalar,
                      items: addType(this.state.nodes, nodeTypes.scalar)
                    },
                    {
                      name: nodeTypes.union,
                      items: addType(this.state.nodes, nodeTypes.union)
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
        <CodeEditor
          liveCode={this.state.liveCode}
          loadNodes={(props) => {
            this.setState({
              loaded: {
                ...this.state.loaded,
                ...props
              }
            });
          }}
        />
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
              template: (props: TemplateProps) => string,
              joinString = '\n\n'
            ) =>
              nodeInputs
                .filter((n) => n.node.type === type)
                .map(template)
                .join(joinString);
            const scalarsCode = generator(nodeTypes.scalar, scalarTemplate);
            const typesCode = generator(nodeTypes.type, typeTemplate);
            const enumsCode = generator(nodeTypes.enum, enumTemplate);
            const interfacesCode = generator(nodeTypes.interface, interfaceTemplate);
            const inputsCode = generator(nodeTypes.input, inputTemplate);
            const unionsCode = generator(nodeTypes.union, unionTemplate);
            const queriesCode = rootQueryTemplate(generator(nodeTypes.query, queryTemplate, '\n'));
            const mutationsCode = rootMutationTemplate(
              generator(nodeTypes.mutation, queryTemplate, '\n')
            );
            const subscriptionsCode = rootSubscriptionTemplate(
              generator(nodeTypes.subscription, queryTemplate, '\n')
            );
            const resolverCode = nodeInputs.map(generateFakerResolver).join('\n');
            resolverCode;
            let mainCode = 'schema{';
            if (queriesCode) {
              mainCode += '\n\tquery: Query';
            }
            if (mutationsCode) {
              mainCode += '\n\tmutation: Mutation';
            }
            if (subscriptionsCode) {
              mainCode += '\n\tsubscription: Subscription';
            }
            mainCode += '\n}';
            const liveCode = [
              scalarsCode,
              enumsCode,
              inputsCode,
              interfacesCode,
              typesCode,
              unionsCode,
              queriesCode,
              mutationsCode,
              subscriptionsCode,
              mainCode
            ]
              .filter((c) => c.length > 0)
              .join('\n\n');
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
