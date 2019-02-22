// faker.com
import { Container } from 'unstated';
import { User, Project, Api, Namespace, State } from './types/project';
import { WebAuth } from 'auth0-js';
import { saveProjectTemplate } from './funcs/saveProject';
import { loadProject } from './funcs/loadProject';
import { fakerDeployProject } from './funcs/fakerDeploy';
import { loadExamples } from './funcs/loadExamples';
import { listPublicProjects } from './funcs/listPublicProjects';
import { createProjectProject } from './funcs/project/createProject';
import { removeProject } from './funcs/removeProject';
import { loadFromURL } from './funcs/loadFromURL';
import { createUser } from './funcs/createUser';
import { afterLogin } from './funcs/afterLogin';
import { findProjectByEndpoint } from './funcs/findProjectByEndpoint';
import { History, Location } from 'history';
import { GraphController } from '../../src/Graph';
import { Calls } from './funcs/calls';
import { autoSaveProject } from './funcs/autoSaveProject';
import * as moment from 'moment';
const DEV_HOSTNAME = 'http://localhost:1569/';
const PRODUCTION_HOSTNAME = 'https://nightly.graphqleditor.com/';

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
type AutoSave = {
  uri?: string;
  schema: string;
};
export type CloudState = {
  visibleMenu: null | 'code' | 'projects';
  loadingStack: string[];
  errorStack: string[];
  projectEndpoint?: string;
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
  code: string;
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
  autosavedSchema?: AutoSave;
  removedProject?: State<Project>;
  pushHistory?: History['push'];
  location?: Location;
  currentProject?: State<Project>;
  cloud: CloudFakerMirror;
  faker: CloudFakerMirror;
  user?: State<User>;
};
export type SerializedCloudState = Pick<
  CloudState,
  'cloud' | 'faker' | 'user' | 'token' | 'autosavedSchema' | 'currentProject' | 'expire'
>;
export const api = Api(projectApiURL, {});
export const fakerApi = Api(fakerApiURL, {});
export const userApi = (token: string = '') =>
  Api(projectApiURL, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });
export const fakerUserApi = (token: string = '') =>
  Api(fakerApiURL, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });

export class CloudContainer extends Container<CloudState> {
  controller?: GraphController;
  lastAutoSave = moment.now() - 15000;
  plannedAutoSave?: number;
  state: CloudState = {
    visibleMenu: null,
    cloud: {},
    faker: {},
    loadingStack: [],
    errorStack: [],
    category: 'my',
    code: '',
    popup: 'onBoarding'
  };
  constructor() {
    super();
    this.onMount().then(() => {
      const { projectEndpoint } = this.state;
      if (projectEndpoint) {
        if (this.state.autosavedSchema && this.state.autosavedSchema.uri === projectEndpoint) {
          this.controller!.loadGraphQL(this.state.autosavedSchema.schema);
          return;
        }
        this.findProjectByEndpoint(projectEndpoint);
      } else {
        if (this.state.user) {
          if (this.state.autosavedSchema) {
            return Calls.findProjectByEndpoint(this)(this.state.autosavedSchema.uri).then(
              (project) => {
                this.moveToCurrentProject();
              }
            );
          }
          if (this.state.currentProject) {
            this.findProjectByEndpoint(this.state.currentProject.endpoint.uri);
          }
        }
      }
    });
  }
  get allProjects() {
    return [
      ...(this.state.faker.exampleProjects || []),
      ...(this.state.faker.searchProjects || []),
      ...(this.state.faker.projects || [])
    ];
  }
  clearAutoSaveTrigger = () => {
    this.plannedAutoSave && clearTimeout(this.plannedAutoSave);
  };
  autoSaveFunction = async () => {
    if (
      this.state.user &&
      this.state.cloud.namespace &&
      this.state.currentProject &&
      this.state.autosavedSchema &&
      this.state.autosavedSchema.uri === this.state.currentProject.endpoint.uri &&
      this.state.cloud.projects.find((p) => this.state.currentProject.id === p.id)
    ) {
      this.plannedAutoSave = null;
      this.lastAutoSave = moment.now();
      return autoSaveProject(this)({
        project: this.state.currentProject,
        schemas: {
          graphql: this.state.autosavedSchema.schema
        }
      });
    }
  };
  autoSaveTrigger = () => {
    const DELTA_MAX = 30000;
    const now = moment.now();
    const delta = now - this.lastAutoSave;
    if (delta < DELTA_MAX) {
      if (!this.plannedAutoSave) {
        this.plannedAutoSave = setTimeout(this.autoSaveTrigger, DELTA_MAX - delta + 100) as any;
      }
      return;
    }
    return this.autoSaveFunction();
  };
  autoSaveOnController = async (graphql: string) => {
    console.log('AUTOSAVING');
    await this.autosave({
      schema: graphql,
      uri: this.getCurrentProjectName()
    });
    this.autoSaveTrigger();
  };

  setController = (controller: GraphController) => {
    this.controller = controller;
    this.controller.setOnSerialise(this.autoSaveOnController);
  };
  getCurrentProjectName = (): string => {
    const { currentProject, cloud } = this.state;
    if (currentProject) return currentProject.endpoint.uri;
    if (cloud.namespace) return `${cloud.namespace.slug}/NewProject`;
    return 'Untitled';
  };
  findInAllFakerProjects = (p: State<Project>) =>
    this.allProjects.find((pr) => pr.endpoint.uri === p.endpoint.uri);
  autosave = (autosavedSchema: AutoSave) => {
    return this.setState({ autosavedSchema }).then(() => {
      ls.set('autosave', JSON.stringify(autosavedSchema));
    });
  };
  loadAutosave = () => {
    try {
      const autosavedSchema = JSON.parse(ls.get('autosave')) as AutoSave;
      if (autosavedSchema && autosavedSchema.schema) {
        return this.setState({
          autosavedSchema
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };
  setCloud = () => {
    ls.set(
      'storage',
      JSON.stringify({
        cloud: this.state.cloud,
        faker: this.state.faker,
        user: this.state.user,
        token: this.state.token,
        autosavedSchema: this.state.autosavedSchema,
        currentProject: this.state.currentProject,
        expire: this.state.expire
      } as SerializedCloudState)
    );
  };
  clearCloud = () =>
    ls.set(
      'storage',
      JSON.stringify({
        cloud: {},
        faker: {},
        user: null,
        token: null,
        autosavedSchema: null,
        currentProject: null,
        expire: null
      } as SerializedCloudState)
    );
  cloudToState = () => {
    return this.setState(JSON.parse(ls.get('storage')));
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
    await this.cloudToState();
    await this.loadAutosave();
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
    await this.afterLogin();
  };
  closePopup = () =>
    this.setState({
      popup: null
    });
  createUser = async (name: string) => {
    await createUser(this)(userApi, 'cloud')(name);
    return createUser(this)(fakerUserApi, 'faker')(name);
  };
  moveToCurrentProject = () =>
    this.state.pushHistory &&
    this.state.currentProject &&
    this.state.pushHistory(`/${this.state.currentProject.endpoint.uri}`);
  removeProject = (project: State<Project>) => {
    this.clearAutoSaveTrigger();
    return removeProject(this)(project).then(this.setCloud);
  };
  canCreateProject = (name: string) =>
    !this.allProjects.find((p) => p.name.toLowerCase() === name.toLowerCase());
  loadProject = (project: State<Project>) => {
    return this.autoSaveFunction().then(() => {
      loadProject(this)(project)
        .then(this.setCloud)
        .then(this.moveToCurrentProject)
        .then(() => {
          this.setState({
            visibleMenu: 'code'
          });
        });
    });
  };
  loadExamples = loadExamples(this);
  loadFromURL = loadFromURL(this);
  saveProject = () =>
    saveProjectTemplate(this)(userApi, {
      project: this.state.currentProject,
      schemas: this.controller!.generateFromAllParsingFunctions()
    });
  fakerDeployProject = async () =>
    fakerDeployProject(this)({
      project: this.state.currentProject,
      schemas: this.controller!.generateFromAllParsingFunctions()
    });
  createProject = (name: string, is_public: boolean) => {
    return this.autoSaveFunction().then(() =>
      createProjectProject(this)(name, is_public)
        .then((currentProject) => this.setState({ currentProject }))
        .then(this.setCloud)
        .then(this.moveToCurrentProject)
    );
  };
  listPublicProjects = listPublicProjects(this);
  getFakerURL = () =>
    this.state.currentProject
      ? `https://faker.graphqleditor.com/${this.state.currentProject.endpoint.uri}/graphql`
      : null;
  afterLoginTemplate = afterLogin(this);
  afterLogin = () =>
    Promise.all([
      this.afterLoginTemplate(userApi, 'cloud'),
      this.afterLoginTemplate(fakerUserApi, 'faker')
    ]);
  findProjectByEndpoint = (endpoint: string) =>
    findProjectByEndpoint(this)(endpoint)
      .then(this.setCloud)
      .then(this.moveToCurrentProject);
  setToken = () =>
    new Promise((resolve) => {
      auth.parseHash((error, result) => {
        if (
          result &&
          result.idToken &&
          result.idTokenPayload &&
          result.idTokenPayload.sub &&
          result.idTokenPayload.exp &&
          result.idTokenPayload.nickname
        ) {
          this.setState({
            token: result.idToken,
            expire: result.idTokenPayload.exp,
            user: {
              username: result.idTokenPayload.nickname,
              id: result.idTokenPayload.sub
            }
          })
            .then(this.setCloud)
            .then(async () => {
              await this.afterLogin();
              resolve();
            });
        }
      });
    });
  logout = async () => {
    await this.clearCloud();
    auth.logout({
      returnTo: redirectUri
    });
  };
  userApi = () => userApi(this.state.token);
  login = () => auth.authorize();
}

export const Cloud = new CloudContainer();
