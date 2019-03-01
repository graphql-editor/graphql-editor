import { Cloud, fakerUserApi } from '../../Container';
import { Project } from '../../types/project';
import { State } from '../../types/faker';

export class FakerCalls {
  static createProject = (instance: typeof Cloud) => async (name: string, is_public: boolean) =>
    fakerUserApi(instance.state.token).Mutation.createProject({
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
    return fakerUserApi(instance.state.token).Query.getProject({
      project: project.id
    })({
      id: true,
      name: true,
      slug: true,
      public: true,
      description: true,
      tags: true,
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
  static findProjectByEndpoint = (instance: typeof Cloud) => async (endpoint: string) => {
    const result = await fakerUserApi(instance.state.token).Query.findProjects({
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
  static removeProject = (instance: typeof Cloud) => async (project: State<Project>) =>
    fakerUserApi(instance.state.token).Mutation.removeProject({
      project: project.id
    })();
  static getUser = (instance: typeof Cloud) =>
    fakerUserApi(instance.state.token).Query.getUser({
      username: instance.state.user.id
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
  static createUser = (instance: typeof Cloud) => async (namespace: string) => {
    return fakerUserApi(instance.state.token).Mutation.createUser({
      namespace,
      public: true
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
  };
}
