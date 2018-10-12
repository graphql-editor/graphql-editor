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
import cx from 'classnames';
import { nodeTypes, SubTypes } from '../nodeTypes';
import { CodeEditor } from './Code';
import { serialize } from '../livegen/serialize';

export type ModelState = {
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  loaded?: LoadedFile;
  projectId?: string;
  liveCode: string;
  sidebarPinned: boolean;
  sidebarHidden: boolean;
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
    liveCode: '',
    sidebarPinned: false,
    sidebarHidden: false
  };
  componentDidMount() {}

  resetCode = () => {
    this.setState({
      nodes: [],
      links: [],
      loaded: {
        nodes: [],
        links: [],
        tabs: []
      },
      liveCode: '',
    })
  }

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
            items: addType(this.state.nodes, n)
          })),
          {
            name: nodeTypes.implements,
            items: addImplements(this.state.nodes)
          }
        ]
      ].filter((n) => n.items.length > 0)
    };
    let allCategories: ActionCategory[] = [...categories];
    if (mirrorNodes.items.length > 0) {
      allCategories = [mirrorNodes, ...allCategories];
    }
    return (
      <div className={cx(styles.Full, { [styles.Pinned]: this.state.sidebarPinned })}>
        <CodeEditor
          liveCode={this.state.liveCode}
          onPinChange={(pinned) => this.setState({ sidebarPinned: pinned })}
          onHide={(hidden) => this.setState({ sidebarHidden: hidden })}
          onReset={this.resetCode}
          hidden={this.state.sidebarHidden}
          pinned={this.state.sidebarPinned}
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
          serialize={(nodes, links, tabs) => {
            this.setState(serialize(nodes, links, tabs));
          }}
        />
      </div>
    );
  }
}
export default Home;
