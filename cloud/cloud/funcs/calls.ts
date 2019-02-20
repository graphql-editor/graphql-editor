import { Cloud, userApi, fakerApi, api, fakerUserApi } from '../Container';
import { State, Project } from '../types/project';

export class Calls {
  static findProjectByEndpoint = (instance: typeof Cloud) => async (endpoint: string) => {
    const result = await userApi(instance.state.token).Query.findProjects({
      query: endpoint,
      limit: 1
    })({
      projects: {
        id: true,
        endpoint: {
          uri: true
        }
      }
    });
    return result.projects.length === 1 ? result.projects[0] : undefined;
  };
  static searchProjects = async (query: string) =>
    Promise.all([
      api.Query.findProjects({ query, limit: 30 })({
        projects: {
          id: true,
          name: true,
          public: true,
          slug: true,
          endpoint: {
            uri: true
          },
          sources: [
            {},
            {
              sources: {
                getUrl: true
              }
            }
          ]
        }
      }),
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
    ]);
  static createProject = (instance: typeof Cloud) => (apiFunction: typeof userApi) => async (
    name: string,
    is_public: boolean
  ) =>
    apiFunction(instance.state.token).Mutation.createProject({
      name,
      public: is_public
    })({
      id: true,
      name: true,
      public: true,
      slug: true,
      endpoint: { uri: true }
    });
  static getProject = (instance: typeof Cloud) => (project: State<Project>) => {
    return userApi(instance.state.token).Query.getProject({
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
    });
  };
  static removeProject = (instance: typeof Cloud) => async (project: State<Project>) => {
    const fakerProject =
      instance.state.faker.projects &&
      instance.state.faker.projects.find((p) => p.slug === project.slug);
    const actions = [
      userApi(instance.state.token).Mutation.removeProject({
        project: project.id
      })({})
    ];
    if (fakerProject) {
      actions.push(
        fakerUserApi(instance.state.token).Mutation.removeProject({
          project: fakerProject.id
        })({})
      );
    }
    await Promise.all(actions);
    return [project, fakerProject];
  };
  static createUser =  (instance: typeof Cloud) => (
    apiFunction: typeof userApi,
  ) => async (namespace: string) => {
    return apiFunction(instance.state.token).Mutation.createUser({
      namespace
    })({
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
    });
  }
}
