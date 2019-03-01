import { Cloud, userApi } from '../../Container';
import { State, Project } from '../../types/project';

export class ProjectCalls {
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
  static createProject = (instance: typeof Cloud) => async (name: string, is_public: boolean) =>
    userApi(instance.state.token).Mutation.createProject({
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
  static updateProject = (instance: typeof Cloud) => async (project: State<Project>) =>
    userApi(instance.state.token).Mutation.updateProject({
      in: {
        project: project.id,
        description: project.description,
        public: project.public,
        tags: project.tags
      }
    })();
  static removeProject = (instance: typeof Cloud) => async (project: State<Project>) =>
    userApi(instance.state.token).Mutation.removeProject({
      project: project.id
    })();
  static getUser = (instance: typeof Cloud) =>
    userApi(instance.state.token).Query.getUser({
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
              description: true,
              tags: true,
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
    return userApi(instance.state.token).Mutation.createUser({
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
