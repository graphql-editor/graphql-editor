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
import { getDefinitionInputs, find } from '../livegen/gens/utils';
import {
  typeTemplate,
  interfaceTemplate,
  enumTemplate,
  inputTemplate,
  queryTemplate,
  rootQueryTemplate
} from '../livegen/gens/graphql/template';
import { nodeTypes, SubTypes } from '../nodeTypes';
import { GraphQLNodeType } from '../livegen/gens';
import * as cx from 'classnames';

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
            const nodes = node as GraphQLNodeType[];
            const typesCode = find(nodes, nodeTypes.type)
              .map((t) => typeTemplate(t, getDefinitionInputs(links, nodes, t)))
              .join('\n\n');
            const enumsCode = find(nodes, nodeTypes.enum)
              .map((t) => enumTemplate(t, getDefinitionInputs(links, nodes, t)))
              .join('\n\n');
            const interfacesCode = find(nodes, nodeTypes.interface)
              .map((t) => interfaceTemplate(t, getDefinitionInputs(links, nodes, t)))
              .join('\n\n');
            const inputsCode = find(nodes, nodeTypes.input)
              .map((t) => inputTemplate(t, getDefinitionInputs(links, nodes, t)))
              .join('\n\n');
            const queriesCode = rootQueryTemplate(
              find(nodes, nodeTypes.query)
                .map((t) => queryTemplate(t, getDefinitionInputs(links, nodes, t)))
                .join('\n')
            );
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
