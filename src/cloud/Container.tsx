// faker.com
import { Container } from 'unstated';
import { User, Project, Api, Namespace, State } from './types/project';
import { WebAuth } from 'auth0-js';
import { NewSource } from './types';
import { NodeType, LinkType, LoadedFile } from '@slothking-online/diagram';
import { serializeSchema } from '../livegen/gens/graphql/serialize';
import { serializeFaker } from '../livegen/gens/faker/serialize';
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
  popup: null | 'createProject' | 'onBoarding' | 'loadURL';
  loaded: LoadedFile;
  nodes: Array<NodeType>;
  tabs?: Array<string>;
  links: Array<LinkType>;
  code: string;
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
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
  onMount() {
    return this.storageToState().then(() => {
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
      this.afterLoginTemplate(userApi, 'cloud');
      this.afterLoginTemplate(fakerUserApi, 'faker');
    });
  }
  removeProject = (project: State<Project>) => {
    if (this.state.cloud.currentProject && project.id === this.state.cloud.currentProject.id) {
      this.setState((state) => ({
        cloud: {
          ...state.cloud,
          currentProject: null
        }
      }));
    }
    const fakerProject = this.state.faker.projects.find((p) => p.slug === project.slug);
    return userApi(this.state.token)
      .Mutation.removeProject({
        project: project.id
      })({})
      .then(() => {
        if (fakerProject) {
          return fakerUserApi(this.state.token).Mutation.removeProject({
            project: fakerProject.id
          })({});
        }
      })
      .then(() => {
        if (fakerProject) {
          this.setState((state) => ({
            faker: {
              ...state.faker,
              projects: state.faker.projects.filter((p) => p.id !== fakerProject.id)
            }
          }));
        }
        this.setState((state) => ({
          cloud: {
            ...state.cloud,
            projects: state.cloud.projects.filter((p) => p.id !== project.id)
          }
        }));
      });
  };
  resetProject = () => {
    this.setState((state) => ({
      cloud: {
        ...state.cloud,
        currentProject: null
      },
      loaded: {
        links: [],
        nodes: [],
        tabs: []
      }
    }));
  };
  loadProject = (project: State<Project>) => {
    const sm = `Loading project...`;
    this.upStack(sm);
    return userApi(this.state.token)
      .Query.getProject({
        project: project.id
      })({
        id: true,
        name: true,
        slug: true,
        public: true,
        endpoint: {
          uri: true
        },
        sources: [
          {},
          {
            sources: {
              getUrl: true,
              filename: true
            }
          }
        ]
      })
      .then(async (project) => {
        const { sources } = project.sources;
        if (sources.length > 0) {
          const projectURL = sources.find((s) => s.filename === 'project.json').getUrl;
          const { nodes, links, tabs } = await (await fetch(projectURL)).json();
          this.setState((state) => ({ loaded: { nodes, links, tabs } }));
        } else {
          this.resetProject();
        }
        this.setState((state) => ({
          cloud: {
            ...this.state.cloud,
            currentProject: project
          }
        })).then(() => this.deStack(sm));
      });
  };
  loadExamples = () => {
    if (!this.state.cloud.exampleProjects) {
      return api.Query.listProjects()({
        projects: {
          id: true,
          name: true,
          public: true,
          slug: true,
          endpoint: {
            uri: true
          }
        }
      })
        .then((response) =>
          this.setState((state) => ({
            cloud: {
              ...state.cloud,
              exampleProjects: response.projects.filter(
                (p) => p.endpoint.uri.split('/')[0] === 'showcase'
              )
            }
          }))
        )
        .then(() =>
          fakerApi.Query.listProjects()({
            projects: {
              id: true,
              name: true,
              public: true,
              slug: true,
              endpoint: {
                uri: true
              }
            }
          })
        )
        .then((response) => {
          this.setState((state) => ({
            faker: {
              ...state.faker,
              exampleProjects: response.projects.filter(
                (p) => p.endpoint.uri.split('/')[0] === 'showcase'
              )
            }
          }));
        });
    }
  };
  saveProject = () =>
    this.saveProjectTemplate(userApi, {
      nodes: this.state.nodes,
      links: this.state.links,
      tabs: this.state.tabs,
      project: this.state.cloud.currentProject
    });
  fakerDeployProject = async ({
    nodes,
    links,
    tabs,
    project
  }: {
    project: State<Project>;
    nodes: NodeType[];
    links: LinkType[];
    tabs: string[];
  }) => {
    const sm = `deploying faker...`;
    this.upStack(sm);
    const fakerNamespace = this.state.faker.namespace;
    if (!(fakerNamespace && fakerNamespace.slug)) {
      const response = await fakerUserApi(this.state.token).Mutation.createUser({
        namespace: this.state.cloud.namespace.slug,
        public: !!this.state.cloud.namespace.public
      })({
        id: true,
        username: true,
        namespace: {
          public: true,
          slug: true,
          projects: [
            {},
            {
              projects: {
                public: true,
                name: true,
                id: true,
                slug: true,
                endpoint: {
                  uri: true
                }
              }
            }
          ]
        }
      });
      await this.setState({
        faker: {
          namespace: {
            public: response.namespace.public,
            slug: response.namespace.slug
          },
          user: {
            id: response.id
          },
          projects: response.namespace.projects.projects
        }
      });
    }
    let correspondingFakerProject = this.state.faker.projects.find(
      (fp) => fp.name === project.name
    );
    if (!correspondingFakerProject) {
      correspondingFakerProject = await fakerUserApi(this.state.token).Mutation.createProject({
        name: project.name,
        public: true
      })({
        name: true,
        id: true,
        slug: true,
        public: true,
        endpoint: {
          uri: true
        }
      });
      this.setState({
        faker: {
          projects: [...this.state.faker.projects, correspondingFakerProject]
        }
      });
    }
    this.deStack(sm);
    return this.saveProjectTemplate(fakerUserApi, {
      project: correspondingFakerProject,
      nodes,
      links,
      tabs
    });
  };
  saveProjectTemplate = (
    apiFunc: typeof userApi,
    {
      project,
      nodes,
      links,
      tabs
    }: {
      project: State<Project>;
      nodes: NodeType[];
      links: LinkType[];
      tabs: string[];
    }
  ) => {
    const sm = 'Saving...';
    this.upStack(sm);
    const projectSchema = JSON.stringify({
      nodes,
      links,
      tabs
    });
    const graphQLSchema = serializeSchema(nodes, links, tabs).code;
    const fakerSchema = serializeFaker(nodes, links, tabs).code;
    const files = [
      new File(
        [
          new Blob([projectSchema], {
            type: 'application/json'
          })
        ],
        'project.json'
      ),
      new File(
        [
          new Blob([graphQLSchema], {
            type: 'application/graphql'
          })
        ],
        'schema.graphql'
      ),
      new File(
        [
          new Blob([fakerSchema], {
            type: 'application/json'
          })
        ],
        'faker.json'
      )
    ];
    const sources: {
      file: File;
      source: NewSource;
    }[] = [
      {
        file: files[0],
        source: {
          filename: 'project.json',
          contentLength: files[0].size,
          contentType: 'application/json'
        }
      },
      {
        file: files[1],
        source: {
          filename: 'schema.graphql',
          contentLength: files[1].size,
          contentType: 'application/graphql'
        }
      },
      {
        file: files[2],
        source: {
          filename: 'faker.json',
          contentLength: files[2].size,
          contentType: 'application/json'
        }
      }
    ];
    return apiFunc(this.state.token)
      .Mutation.updateSources({
        project: project.id,
        sources: sources.map((s) => s.source)
      })({
        filename: true,
        headers: {
          key: true,
          value: true
        },
        putUrl: true
      })
      .then(async (response) => {
        for (const { putUrl, headers, filename } of response) {
          await fetch(putUrl, {
            method: 'PUT',
            mode: 'cors',
            headers: headers.reduce((a, b) => {
              a[b.key] = b.value;
              return a;
            }, {}),
            body: sources.find((s) => s.source.filename === filename).file
          });
        }
        return this.deStack(sm);
      });
  };
  setStorage(state: Partial<CloudState>) {
    return this.setState(state).then(() => {
      ls.set('faker', JSON.stringify(state));
    });
  }
  storageToState() {
    return this.setState(JSON.parse(ls.get('faker')));
  }
  createProject = (name: string, is_public: boolean) =>
    userApi(this.state.token)
      .Mutation.createProject({
        name,
        public: is_public
      })({
        id: true,
        name: true,
        public: true,
        slug: true,
        endpoint: { uri: true }
      })
      .then((p) =>
        this.setState((state) => ({
          ...state,
          cloud: {
            ...state.cloud,
            currentProject: p,
            projects: [...state.cloud.projects, p]
          }
        }))
      );
  listPublicProjects = () => {
    return api.Query.listProjects()({
      projects: {
        id: true,
        name: true,
        public: true,
        slug: true,
        endpoint: {
          uri: true
        }
      }
    }).then((response) => {
      this.setState((state) => ({
        cloud: {
          ...state.cloud,
          searchProjects: response.projects
        }
      }));
    });
  };
  afterLoginTemplate = (apiFunction: typeof userApi, fakerCloud: 'faker' | 'cloud') => {
    if (!this.state.token) {
      return;
    }
    const sm = `Logging ${fakerCloud}  in...`;
    this.upStack(sm);
    return apiFunction(this.state.token)
      .Query.getUser({ username: this.state.user.id })({
        id: true,
        namespace: {
          slug: true,
          public: true,
          projects: [
            {},
            {
              projects: {
                id: true,
                public: true,
                name: true,
                slug: true,
                endpoint: {
                  uri: true
                }
              }
            }
          ]
        }
      })
      .then((res) => {
        if (res === null) {
          return this.deStack(sm);
        }
        const { namespace, id } = res;
        const {
          projects: { projects },
          ...restNamespace
        } = namespace;
        this.setState({
          [fakerCloud]: {
            namespace: restNamespace,
            projects,
            user: {
              id
            }
          }
        }).then(() => {
          return this.deStack(sm);
        });
      })
      .catch((res) => {
        console.log(res);
        if (res === null) {
          this.deStack(sm);
        } else {
          this.errStack(res.errors[0].message);
        }
      });
  };
  setToken() {
    auth.parseHash((error, result) => {
      console.log(result);
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
        }).then(() => {
          this.afterLoginTemplate(userApi, 'cloud');
        });
      }
    });
  }
  logout = () =>
    this.setStorage({
      user: null,
      token: null,
      expire: null,
      cloud: {},
      faker: {}
    }).then(() =>
      auth.logout({
        returnTo: redirectUri
      })
    );
  userApi = () => userApi(this.state.token);
  login = () => auth.authorize();
}

export const Cloud = new CloudContainer();
