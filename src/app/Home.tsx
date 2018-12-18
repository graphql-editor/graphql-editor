import * as React from 'react';
import { Graph, NodeType, ActionCategory, Item } from '@slothking-online/diagram';
import { categories, singlePortOutput } from '../categories';
import * as styles from '../style/Home';
import cx from 'classnames';
import { nodeTypes, SubTypes } from '../nodeTypes';
import { CodeEditor } from './Code';
import { serialize } from '../livegen/serialize';
import { Cloud } from '../cloud/Container';
import { UI } from '../ui/UI';
import { Projects } from '../ui/Projects';
import { Subscribe } from 'unstated';

export type ModelState = {
  projectId?: string;
  code: string;
  serializeFunction: keyof typeof serialize;
  visibleMenu: null | 'code' | 'projects';
};

class Home extends React.Component<{}, ModelState> {
  state: ModelState = {
    projectId: null,
    code: '',
    visibleMenu: null,
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
            items: addType(Cloud.state.nodes, n)
          })),
          {
            name: nodeTypes.implements,
            items: addImplements(Cloud.state.nodes)
          }
        ]
      ].filter((n) => n.items.length > 0)
    };
    let allCategories: ActionCategory[] = [...categories];
    if (mirrorNodes.items.length > 0) {
      allCategories = [mirrorNodes, ...allCategories];
    }
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <React.Fragment>
              <div className={cx(styles.Full)}>
                <UI
                  code={{
                    active: this.state.visibleMenu === 'code',
                    click: () =>
                      this.setState({
                        visibleMenu: this.state.visibleMenu === 'code' ? null : 'code'
                      })
                  }}
                  projects={{
                    active: this.state.visibleMenu === 'projects',
                    click: () => {
                      this.setState({
                        visibleMenu: this.state.visibleMenu === 'projects' ? null : 'projects'
                      });
                      cloud
                        .setState((state) => ({
                          category: 'my'
                        }))
                        .then(() => {
                          cloud.loadExamples();
                        });
                    }
                  }}
                  examples={{
                    active: true,
                    click: () => {
                      this.setState({
                        visibleMenu: 'projects'
                      });
                      cloud
                        .setState((state) => ({
                          category: 'examples'
                        }))
                        .then(() => {
                          cloud.loadExamples();
                        });
                    }
                  }}
                >
                  {this.state.visibleMenu === 'code' && (
                    <CodeEditor
                      schema={cloud.state.code}
                      onTabChange={(e) => {
                        const { nodes, links, tabs } = cloud.state;
                        this.setState({
                          serializeFunction: e
                        });
                        cloud.setState(serialize[e].fn(nodes, links, tabs));
                      }}
                      language={this.state.serializeFunction}
                      loadNodes={(props) => {
                        cloud.setState((state) => ({
                          loaded: {
                            ...state.loaded,
                            ...props
                          }
                        }));
                      }}
                    />
                  )}
                  {this.state.visibleMenu === 'projects' && <Projects />}
                  <div style={{ position: 'absolute' }}>
                    <Graph
                      categories={allCategories}
                      loaded={cloud.state.loaded}
                      dataSerialize={(nodes, links, tabs) => {
                        cloud.setState(
                          serialize[this.state.serializeFunction].fn(nodes, links, tabs)
                        );
                      }}
                    />
                  </div>
                </UI>
              </div>
            </React.Fragment>
          );
        }}
      </Subscribe>
    );
  }
}
export default Home;
