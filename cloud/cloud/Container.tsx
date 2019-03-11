// faker.com
import { Container } from 'unstated';
import { User, Project, Api, Namespace, State } from './types/project';
import { WebAuth } from 'auth0-js';
import { saveProjectTemplate } from './funcs/saveProject';
import { loadProject } from './funcs/loadProject';
import { fakerDeployProject } from './funcs/fakerDeploy';
import { loadExamples } from './funcs/loadExamples';
import { searchPublicProjects } from './funcs/searchPublicProjects';
import { removeProject } from './funcs/removeProject';
import { loadFromURL } from './funcs/loadFromURL';
import { createUser } from './funcs/createUser';
import { afterLogin } from './funcs/afterLogin';
import { findProjectByEndpoint } from './funcs/findProjectByEndpoint';
import { History, Location } from 'history';
import { GraphController } from '../../src/Graph';
import { autoSaveProject } from './funcs/autoSaveProject';
import * as moment from 'moment';
import { ProjectCalls } from './funcs/project/calls';
import { createProject } from './funcs/createProject';
import * as FileSaver from 'file-saver';
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

type FakerMirror = {
  user?: State<User>;
  namespace?: State<Namespace>;
};
type CloudMirror = {
  projects?: State<Project>[];
  searchProjects?: State<Project>[];
  exampleProjects?: State<Project>[];
  user?: State<User>;
  namespace?: State<Namespace>;
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
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
  removedProject?: State<Project>;
  editedProject?: State<Project>;
  pushHistory?: History['push'];
  location?: Location;
  currentProject?: {
    cloud: State<Project>;
    faker?: State<Project>;
  };
  cloud: CloudMirror;
  faker: FakerMirror;
  user?: State<User>;
  topMenuOpen?: 'open' | 'url';
};
let autosave: {
  schema: string;
  projectId: string;
};
export type SerializedCloudState = Pick<
  CloudState,
  'cloud' | 'faker' | 'user' | 'token' | 'currentProject' | 'expire'
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
    popup: 'onBoarding'
  };
  constructor() {
    super();
    this.onMount().then(this.resolveProjectPath);
  }
  resolveProjectPath = () => {
    const { projectEndpoint } = this.state;
    if (projectEndpoint) {
      this.findProjectByEndpoint(projectEndpoint);
    } else {
      if (this.state.currentProject && this.state.currentProject.cloud) {
        this.findProjectByEndpoint(this.state.currentProject.cloud.endpoint.uri);
      }
    }
  };
  clearAutoSaveTrigger = () => {
    this.lastAutoSave = moment.now();
    if (this.plannedAutoSave) clearTimeout(this.plannedAutoSave);
  };
  canIEditCurrentProject = () => {
    if (this.state.currentProject && this.state.currentProject.cloud) {
      return this.canIEditProject(this.state.currentProject.cloud);
    }
    return false;
  };
  canIEditProject = (project: State<Project>) => {
    if (this.state.cloud && this.state.cloud.projects) {
      return !!this.state.cloud.projects.find((pr) => pr.id === project.id);
    }
    return false;
  };
  forceAutoSaveFunction = async (project?: State<Project>, autoSaveString?: string) => {
    if (this.canIEditCurrentProject() && project && autoSaveString) {
      this.clearAutoSaveTrigger();
      return autoSaveProject(this)({
        project,
        schemas: {
          graphql: autoSaveString
        }
      });
    }
    return;
  };
  autoSaveFunction = async () => {
    if (
      this.canIEditCurrentProject() &&
      autosave &&
      autosave.projectId === this.state.currentProject.cloud.id
    ) {
      this.plannedAutoSave = null;
      this.lastAutoSave = moment.now();
      return autoSaveProject(this)({
        project: this.state.currentProject.cloud,
        schemas: {
          graphql: autosave.schema
        }
      });
    }
  };
  autoSaveTrigger = () => {
    const DELTA_MAX = 20000;
    const now = moment.now();
    const delta = now - this.lastAutoSave;
    console.log('AutosaveTrigger fired', delta);
    if (delta < DELTA_MAX) {
      if (!this.plannedAutoSave) {
        this.plannedAutoSave = setTimeout(this.autoSaveTrigger, DELTA_MAX - delta + 100) as any;
      }
      return;
    }
    console.log('AutosaveTrigger Saving');
    return this.autoSaveFunction();
  };
  autoSaveOnController = async (graphql: string) => {
    if (this.canIEditCurrentProject()) {
      autosave = {
        schema: graphql,
        projectId: this.state.currentProject.cloud.id
      };
      this.autoSaveTrigger();
    }
  };

  setController = (controller: GraphController) => {
    this.controller = controller;
    this.controller.setOnSerialise(this.autoSaveOnController);
  };
  getCurrentProjectName = (): string => {
    const { currentProject, cloud } = this.state;
    if (currentProject && currentProject.cloud) return currentProject.cloud.endpoint.uri;
    if (cloud.namespace) return `${cloud.namespace.slug}/NewProject`;
    return 'Untitled';
  };
  setCloud = () => {
    ls.set(
      'storage',
      JSON.stringify({
        cloud: this.state.cloud,
        faker: this.state.faker,
        user: this.state.user,
        token: this.state.token,
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
        currentProject: this.canIEditCurrentProject() ? null : this.state.currentProject,
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
    if(!this.state.cloud.searchProjects){
      await searchPublicProjects(this)('')
    }
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
    return this.afterLogin();
  };
  closePopup = () =>
    this.setState({
      popup: null
    });
  createUser = async (name: string) => createUser(this)(name);
  moveToCurrentProject = () =>
    this.state.pushHistory &&
    this.state.currentProject &&
    this.state.pushHistory(`/${this.state.currentProject.cloud.endpoint.uri}`);
  removeProject = () => {
    this.clearAutoSaveTrigger();
    return removeProject(this).then(this.setCloud);
  };
  canCreateProject = (name: string) =>
    !this.state.cloud.projects.find((p) => p.name.toLowerCase() === name.toLowerCase());
  _loadProject = (project: State<Project>) => {
    return loadProject(this)(project)
      .then(this.setCloud)
      .then(this.moveToCurrentProject)
      .then(() => {
        this.setState({
          visibleMenu: 'code'
        });
      });
  };
  loadProject = async (project: State<Project>) => {
    if (this.state.currentProject) {
      return Promise.all([
        this.forceAutoSaveFunction(
          this.state.currentProject.cloud,
          this.controller!.generateFromAllParsingFunctions().graphql
        ),
        this._loadProject(project)
      ]);
    }
    return this._loadProject(project);
  };
  forkProject = async (project: State<Project>) => {
    await this.loadProject(project);
    const p = await createProject(this)(project.name, project.public, true);
    const newProject = {
      ...project,
      ...p
    };
    await this.editProject(newProject);
    this.moveToCurrentProject();
    return this.saveProject();
  };
  loadExamples = loadExamples(this);
  loadFromURL = loadFromURL(this);
  saveProject = () =>
    saveProjectTemplate(this)(userApi, {
      project: this.state.currentProject.cloud,
      schemas: this.controller!.generateFromAllParsingFunctions()
    });
  fakerDeployProject = async () =>
    fakerDeployProject(this)({
      project: this.state.currentProject.cloud,
      schemas: this.controller!.generateFromAllParsingFunctions()
    });
  createProject = async (project: State<Project>) => {
    const [p] = await Promise.all([
      createProject(this)(project.name, project.public),
      this.forceAutoSaveFunction(this.state.currentProject.cloud)
    ]);
    const newProject = {
      ...project,
      ...p
    };
    await this.editProject(newProject);
    return this.moveToCurrentProject();
  };
  editProject = (project: State<Project>) => {
    return ProjectCalls.updateProject(this)(project)
      .then(() =>
        this.setState((state) => ({
          cloud: {
            ...state.cloud,
            projects: state.cloud.projects.map((p) =>
              p.id === project.id ? { ...p, ...project } : p
            )
          }
        }))
      )
      .then(this.setCloud);
  };
  searchPublicProjects = searchPublicProjects(this);
  getFakerURL = () =>
    this.state.currentProject && this.state.currentProject.faker
      ? `https://faker.graphqleditor.com/${this.state.currentProject.faker.endpoint.uri}/graphql`
      : null;
  afterLogin = () => afterLogin(this);
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
              this.onMount();
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
  loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    const reader = new FileReader();
    console.log(file);
    reader.onload = (f) => {
      console.log((f.target! as any).result);
      this.controller!.loadGraphQL((f.target! as any).result);
    };
    reader.readAsText(file);
  };
  saveToFile = () => {
    const filename = `${this.getCurrentProjectName()!.replace('/', '--')}.gql`;
    const schema = this.controller.generateFromAllParsingFunctions().graphql;
    var file = new File([schema], filename, {
      type: 'application/json'
    });
    FileSaver.saveAs(file, filename);
  };
  saveAutocompleteTypeScript = () => {
    const filename = `${this.getCurrentProjectName()!.replace('/', '-')}.ts`;
    const content = this.controller.getAutocompletelibrary();
    var file = new File([content], filename, {
      type: 'text/x.typescript'
    });
    FileSaver.saveAs(file, filename);
  };
}

export const Cloud = new CloudContainer();
