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
import { OverlayMenu } from '../cloud/Components/OverlayMenu';
import { Cloud } from '../cloud/Container';

export type ModelState = {
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  loaded?: LoadedFile;
  projectId?: string;
  code: string;
  sidebarPinned: boolean;
  sidebarHidden: boolean;
  serializeFunction: keyof typeof serialize;
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
    code: '',
    sidebarPinned: false,
    serializeFunction: 'graphql',
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
      code: ''
    });
  };

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
      <React.Fragment>
        <div className={cx(styles.Full, { [styles.Pinned]: this.state.sidebarPinned })}>
          <Graph
            categories={allCategories}
            loaded={this.state.loaded}
            dataSerialize={(nodes, links, tabs) => {
              this.setState(serialize[this.state.serializeFunction].fn(nodes, links, tabs));
            }}
          />
          <CodeEditor
            schema={this.state.code}
            onTabChange={(e) => {
              const { nodes, links, tabs } = this.state;
              this.setState({
                serializeFunction: e
              });
              this.setState(serialize[e].fn(nodes, links, tabs));
            }}
            onPinChange={(pinned) => this.setState({ sidebarPinned: pinned })}
            onHide={(hidden) => this.setState({ sidebarHidden: hidden })}
            onReset={this.resetCode}
            hidden={this.state.sidebarHidden}
            pinned={this.state.sidebarPinned}
            language={this.state.serializeFunction}
            loadNodes={(props) => {
              this.setState({
                loaded: {
                  ...this.state.loaded,
                  ...props
                }
              });
            }}
          />
        </div>
        <OverlayMenu
          deployFaker={(project) => {
            Cloud.fakerDeployProject({
              project,
              links: this.state.links,
              nodes: this.state.nodes,
              tabs: this.state.tabs
            });
          }}
          deployProject={(project) => {
            Cloud.saveProject({
              project,
              links: this.state.links,
              nodes: this.state.nodes,
              tabs: this.state.tabs
            });
          }}
          removeProject={(project) => {
            Cloud.removeProject(project)
          }}
          loadProject={async (project) => {
            await Cloud.loadProject(project);
            const { sources } = Cloud.state.cloud.currentProject.sources;
            if (sources.length > 0) {
              const projectURL = sources.find((s) => s.filename === 'project.json').getUrl;
              const { nodes, links, tabs } = await (await fetch(projectURL)).json();
              this.setState({ loaded: { nodes, links, tabs } });
            } else {
              this.resetCode();
            }
          }}
        />
      </React.Fragment>
    );
  }
}
export default Home;
