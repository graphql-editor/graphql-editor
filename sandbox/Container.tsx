// faker.com
import { Container } from 'unstated';
import { NodeType, LinkType, LoadedFile } from '@slothking-online/diagram';

const prefix = (k: string) => `GraphQLEditor-Sandbox-${k}`;
const ls = {
  get: (key: string) => window.localStorage.getItem(prefix(key)),
  set: (key: string, value: string) => window.localStorage.setItem(prefix(key), value)
};

export type CloudState = {
  visibleMenu: null | 'code' | 'projects';
  loaded: LoadedFile;
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  code: string;
};

export class CloudContainer extends Container<CloudState> {
  state: CloudState = {
    visibleMenu: null,
    code: '',
    nodes: [],
    links: [],
    loaded: {
      nodes: [],
      links: [],
      tabs: []
    }
  };
  constructor() {
    super();
    this.onMount();
  }
  setNodes = (state: Pick<CloudState, 'nodes' | 'code' | 'links'>) => {
    return this.setState(state).then(() => {
      ls.set('nodes', JSON.stringify(state));
    });
  };
  nodesToState = () => {
    const loadedState = JSON.parse(ls.get('nodes'));
    if (!loadedState) {
      return;
    }
    const { nodes, links } = loadedState;
    return this.setState({ ...loadedState, loaded: { nodes, links } });
  };
  onMount = async () => {
    await this.nodesToState();
  };
  resetWorkspace = () =>
    this.setState((state) => ({
      loaded: {
        links: [],
        nodes: [],
        tabs: []
      },
      nodes: [],
      links: [],
      tabs: []
    }));
}

export const Cloud = new CloudContainer();
