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
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
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
import { GraphQLNodeType, TransformedInput } from '../livegen/gens';
import * as cx from 'classnames';
import { crudMacroTemplate } from '../livegen/gens/graphql/macros/crud';
import { generateFakerResolver } from '../livegen/gens/faker';
import { getDefinitionInputs } from '../livegen/gens/utils';

export type ModelState = {
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  loaded?: LoadedFile;
  projectId?: string;
  liveCode: string;
  editor?: boolean;
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
    const addType = (nodes: NodeType[], type: keyof typeof nodeTypes): Item[] =>
      nodes
        .filter((n: NodeType) => n.type === type && n.subType === SubTypes.definition)
        .map((n: NodeType) => ({
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
                      subType: SubTypes.clone
                    }
                  }
                ]
              }
            ],
            editable: true
          }
        }));
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
        <div
          className={cx({
            [styles.HideEditor]: this.state.editor,
            [styles.ShowEditor]: !this.state.editor,
            [styles.Editor]: true
          })}
          onDoubleClick={() => {
            this.setState({
              editor: !this.state.editor
            });
          }}
        >
          <SyntaxHighlighter
            PreTag={({ children }) => <div className={styles.Pre}>{children}</div>}
            language="graphql"
            style={xonokai}
          >
            {this.state.liveCode}
          </SyntaxHighlighter>
        </div>
        <Graph
          categories={allCategories}
          loaded={this.state.loaded}
          serialize={(node, links, tabs) => {
            let nodes = node as GraphQLNodeType[];
            nodes = [...nodes];
            const crudMacroNodes = crudMacroTemplate(nodes, links);
            const nodeInputs: {
              node: GraphQLNodeType;
              inputs: TransformedInput[];
            }[] = nodes
              .filter((n) => n.subType === SubTypes.definition)
              .map((n) => ({
                node: n,
                inputs: getDefinitionInputs(links, nodes, n)
              }))
              .concat(crudMacroNodes.reduce((a, b) => [...a, ...b], []));
            const generator = (
              type: keyof typeof nodeTypes,
              template: (props: TemplateProps) => string
            ) => nodeInputs.filter((n) => n.node.type === type).map(template).join('\n');
            const typesCode = generator(nodeTypes.type, typeTemplate);
            const enumsCode = generator(nodeTypes.enum, enumTemplate);
            const interfacesCode = generator(nodeTypes.interface, interfaceTemplate);
            const inputsCode = generator(nodeTypes.input, inputTemplate);
            const queriesCode = rootQueryTemplate(generator(nodeTypes.query, queryTemplate));
            const mutationsCode = rootMutationTemplate(generator(nodeTypes.mutation, queryTemplate));
            generateFakerResolver(nodes, links);
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
