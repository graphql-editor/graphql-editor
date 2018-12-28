import {
  ActionCategory,
  Graph,
  Item,
  NodeType,
  LinkType,
  LoadedFile
} from '@slothking-online/diagram';
import * as React from 'react';
import { CodeEditor, TABS, CodeEditorOuterProps } from './Code';
import { categories, singlePortOutput } from './categories';
import { nodeTypes, SubTypes } from './nodeTypes';
import { GraphQLNodeType, frontend, graphql, faker } from './livegen/code-generators';

export type EditorState = {
  projectId?: string;
  serializeFunction: keyof typeof TABS;
};
export type EditorProps = {
  nodes?: NodeType[];
  links?: LinkType[];
  tabs?: string[];
  loaded: LoadedFile;
  code: string;
  editorVisible: boolean;
  result: (
    props: {
      code: string;
      nodes: GraphQLNodeType[];
      links: LinkType[];
    }
  ) => void;
} & CodeEditorOuterProps;

export class Editor extends React.Component<EditorProps, EditorState> {
  state: EditorState = {
    projectId: null,
    serializeFunction: 'graphql'
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
                  type: nodeTypes.Query
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

    const mirrorNodes: ActionCategory = {
      name: 'mirror',
      items: [
        ...[
          ...[
            nodeTypes.type,
            nodeTypes.interface,
            nodeTypes.input,
            nodeTypes.scalar,
            nodeTypes.union,
            nodeTypes.enum
          ].map((n) => ({
            name: n,
            items: addType(this.props.nodes, n)
          })),
          {
            name: nodeTypes.implements,
            items: addImplements(this.props.nodes)
          }
        ]
      ].filter((n) => n.items.length > 0)
    };
    let allCategories: ActionCategory[] = [...categories];
    if (mirrorNodes.items.length > 0) {
      allCategories = [mirrorNodes, ...allCategories];
    }
    const serializeFunction = {
      graphql: graphql.serializeSchema,
      typescript: frontend.serializeFrontend,
      json: faker.serializeFaker
    };

    return (
      <>
        {this.props.editorVisible === true && (
          <CodeEditor
            schema={this.props.code}
            schemaChanged={this.props.schemaChanged}
            copiedToClipboard={this.props.copiedToClipboard}
            remakeNodes={this.props.remakeNodes}
            onTabChange={(e) => {
              const { nodes, links, tabs } = this.props;
              this.setState({
                serializeFunction: e
              });
              this.props.result(serializeFunction[e](nodes, links, tabs));
            }}
            language={this.state.serializeFunction}
          />
        )}
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
          <Graph
            categories={allCategories}
            loaded={this.props.loaded}
            serialize={(nodes, links, tabs) => {
              if (nodes.length < 500) {
                this.props.result(
                  serializeFunction[this.state.serializeFunction](nodes, links, tabs)
                );
              }
            }}
            dataSerialize={(nodes, links, tabs) => {
              this.props.result(
                serializeFunction[this.state.serializeFunction](nodes, links, tabs)
              );
            }}
          />
        </div>
      </>
    );
  }
}
