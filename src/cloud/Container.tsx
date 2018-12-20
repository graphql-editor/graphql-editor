// faker.com
import { Container } from 'unstated';
import { User, Project, Api, Namespace, State } from './types/project';
import { WebAuth } from 'auth0-js';
import { NodeType, LinkType, LoadedFile } from '@slothking-online/diagram';
import { saveProjectTemplate } from './funcs/saveProject';
import { loadProject } from './funcs/loadProject';
import { fakerDeployProject } from './funcs/fakerDeploy';
import { loadExamples } from './funcs/loadExamples';
import { listPublicProjects } from './funcs/listPublicProjects';
import { createProject } from './funcs/createProject';
import { removeProject } from './funcs/removeProject';
import { loadFromURL } from './funcs/loadFromURL';
import { createUser } from './funcs/createUser';
import { afterLogin } from './funcs/afterLogin';
const DEV_HOSTNAME = 'http://localhost:1569/';
const PRODUCTION_HOSTNAME = 'https://app.graphqleditor.com/';

export const redirectUri =
  process.env.NODE_ENV === 'development' ? DEV_HOSTNAME : PRODUCTION_HOSTNAME;

const auth = new WebAuth({
  audience: 'https://graphqleditor.com/',
  clientID: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
  domain: 'auth.graphqleditor.com',
  responseType: 'id_token',
  redirectUri,
  scope: 'openid profile'
});

const projectApiURL = `https://project-api.graphqleditor.com/graphql`;
const fakerApiURL = `https://faker-api.graphqleditor.com/graphql`;

const prefix = (k: string) => `GraphQLEditor-${k}`;
const ls = {
  get: (key: string) => window.localStorage.getItem(prefix(key)),
  set: (key: string, value: string) => window.localStorage.setItem(prefix(key), value)
};

type CloudFakerMirror = {
  projects?: State<Project>[];
  searchProjects?: State<Project>[];
  exampleProjects?: State<Project>[];
  user?: State<User>;
  namespace?: State<Namespace>;
};
export type CloudState = {
  loadingStack: string[];
  errorStack: string[];
  token?: string;
  expire?: number;
  popup:
    | null
    | 'createProject'
    | 'createUser'
    | 'notYourProject'
    | 'notYetProject'
    | 'notYetDeploy'
    | 'loginToContinue'
    | 'onBoarding'
    | 'loadURL'
    | 'fakerDeployed'
    | 'deleteProject';
  loaded: LoadedFile;
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  code: string;
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
  removedProject?: State<Project>;
  cloud: CloudFakerMirror & {
    currentProject?: State<Project>;
  };
  faker: CloudFakerMirror;
  user?: State<User>;
};

export const api = Api(projectApiURL, {});
export const fakerApi = Api(fakerApiURL, {});
export const userApi = (token: string) =>
  Api(projectApiURL, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });
export const fakerUserApi = (token: string) =>
  Api(fakerApiURL, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });

export class CloudContainer extends Container<CloudState> {
  state: CloudState = {
    cloud: {},
    faker: {},
    loadingStack: [],
    errorStack: [],
    category: 'my',
    code: '',
    popup: 'onBoarding',
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
  get allProjects() {
    return [
      ...(this.state.faker.exampleProjects || []),
      ...(this.state.faker.searchProjects || []),
      ...(this.state.faker.projects || [])
    ];
  }
  findInAllFakerProjects = (p: State<Project>) =>
    this.allProjects.find((pr) => pr.endpoint.uri === p.endpoint.uri);
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
  setStorage = (state: Pick<CloudState, 'user' | 'token' | 'expire'>) => {
    return this.setState(state).then(() => {
      ls.set('faker', JSON.stringify(state));
    });
  };
  storageToState = () => {
    return this.setState(JSON.parse(ls.get('faker')));
  };
  setCloud = () => {
    ls.set(
      'cloud',
      JSON.stringify({
        cloud: this.state.cloud,
        faker: this.state.faker
      } as Pick<CloudState, 'cloud' | 'faker'>)
    );
  };
  clearCloud = () => {
    ls.set(
      'cloud',
      JSON.stringify({
        cloud: {},
        faker: {}
      } as Pick<CloudState, 'cloud' | 'faker'>)
    );
  };
  cloudToState = () => {
    return this.setState(JSON.parse(ls.get('cloud')));
  };
  errStack = (s: string) =>
    this.setState((state) => ({
      errorStack: [...state.errorStack, s]
    }));
  upStack = (s: string) =>
    this.setState((state) => ({
      loadingStack: [...state.loadingStack, s]
    }));
  deStack = (s: string) =>
    this.setState((state) => ({
      loadingStack: state.loadingStack.filter((ls) => ls !== s)
    }));
  unStackAll = () => {
    this.setState((state) => ({
      loadingStack: [],
      errorStack: []
    }));
  };
  onMount = async () => {
    await this.nodesToState();
    await this.storageToState();
    await this.cloudToState();
    console.log(this.state);
    if (!this.state.expire) {
      return this.setState({
        token: null
      });
    }
    const dateExp = new Date(0).setUTCSeconds(this.state.expire) - new Date().valueOf();
    if (dateExp < 0) {
      return this.setState({
        token: null
      });
    }
    await this.afterLoginTemplate(userApi, 'cloud');
    return this.afterLoginTemplate(fakerUserApi, 'faker');
  };
  closePopup = () =>
    this.setState({
      popup: null
    });
  createUser = async (name: string) => {
    await createUser(this)(userApi, 'cloud')(name);
    return createUser(this)(fakerUserApi, 'faker')(name);
  };
  removeProject = (project: State<Project>) => removeProject(this)(project).then(this.setCloud);
  resetProject = () =>
    this.setState((state) => ({
      cloud: {
        ...state.cloud,
        currentProject: null
      },
      loaded: {
        links: [],
        nodes: [],
        tabs: []
      },
      nodes: [],
      links: [],
      tabs: []
    })).then(this.setCloud);
  canCreateProject = (name: string) =>
    !this.allProjects.find((p) => p.name.toLowerCase() === name.toLowerCase());
  loadProject = (project: State<Project>) => loadProject(this)(project).then(this.setCloud);
  loadExamples = loadExamples(this);
  loadFromURL = loadFromURL(this);
  saveProject = () =>
    saveProjectTemplate(this)(userApi, {
      nodes: this.state.nodes,
      links: this.state.links,
      tabs: this.state.tabs,
      project: this.state.cloud.currentProject
    });
  fakerDeployProject = async () =>
    fakerDeployProject(this)({
      links: this.state.links,
      nodes: this.state.nodes,
      project: this.state.cloud.currentProject,
      tabs: this.state.tabs
    });
  createProject = (name: string, is_public: boolean) =>
    createProject(this)(name, is_public).then(this.setCloud);
  listPublicProjects = listPublicProjects(this);
  getFakerURL = () =>
    this.state.cloud.currentProject
      ? `https://faker.graphqleditor.com/${this.state.cloud.currentProject.endpoint.uri}/graphql`
      : null;
  afterLoginTemplate = afterLogin(this);
  setToken() {
    auth.parseHash((error, result) => {
      if (
        result &&
        result.idToken &&
        result.idTokenPayload &&
        result.idTokenPayload.sub &&
        result.idTokenPayload.exp &&
        result.idTokenPayload.nickname
      ) {
        this.setStorage({
          token: result.idToken,
          expire: result.idTokenPayload.exp,
          user: {
            username: result.idTokenPayload.nickname,
            id: result.idTokenPayload.sub
          }
        }).then(async () => {
          await this.afterLoginTemplate(userApi, 'cloud');
          return this.afterLoginTemplate(fakerUserApi, 'faker');
        });
      }
    });
  }
  logout = async () => {
    await this.setStorage({
      user: null,
      token: null,
      expire: null
    });
    await this.clearCloud();
    auth.logout({
      returnTo: redirectUri
    });
  };
  userApi = () => userApi(this.state.token);
  login = () => auth.authorize();
}

export const Cloud = new CloudContainer();
