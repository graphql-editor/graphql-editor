import { Cloud, userApi } from '../../Container';
import { State, Project, Role } from '../../types/project';

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
  private static _teamOps = (instance: typeof Cloud) => async (id: string) => {
    return userApi(instance.state.token).Mutation.team({
      id
    });
  };
  static myTeams = (instance: typeof Cloud) => async () => {
    return userApi(instance.state.token).Query.myTeams()({
      teams: {
        name: true,
        id: true,
        namespace: {
          slug: true
        },
        members: [
          {},
          {
            members: {
              role: true,
              username: true
            }
          }
        ]
      }
    });
  };
  static getTeam = (instance: typeof Cloud) => async (id: string) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
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
    return response.namespace;
  };
  static createTeamProject = (instance: typeof Cloud) => async (
    id: string,
    name: string,
    is_public: boolean
  ) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      createProject: [
        { name, public: is_public },
        {
          id: true,
          name: true,
          public: true,
          slug: true,
          endpoint: { uri: true }
        }
      ]
    });
    return response.createProject;
  };
  static createTeam = (instance: typeof Cloud) => async (name: string, namespace: string) => {
    return userApi(instance.state.token).Mutation.createTeam({
      name,
      namespace
    })({
      name: true,
      namespace: {
        slug: true
      }
    });
  };
  static addMember = (instance: typeof Cloud) => async (
    id: string,
    role: Role,
    username: string
  ) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      addMember: [
        { role, username },
        {
          role: true,
          username: true
        }
      ]
    });
    return response.addMember;
  };
  static members = (instance: typeof Cloud) => async (id: string) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      members: [
        {},
        {
          members: {
            username: true,
            role: true
          }
        }
      ]
    });
    return response.members;
  };
  static updateMember = (instance: typeof Cloud) => async (
    id: string,
    username: string,
    role: Role
  ) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      member: [
        {
          username
        },
        {
          update: [
            {
              role
            }
          ]
        }
      ]
    });
    return response.member.update;
  };
  static deleteMember = (instance: typeof Cloud) => async (id: string, username: string) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      member: [
        {
          username
        },
        {
          delete: true
        }
      ]
    });
    return response.member.delete;
  };
  static updateTeamProject = (instance: typeof Cloud) => async (
    id: string,
    project: State<Project>
  ) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      project: [
        {
          id: project.id
        },
        {
          update: [
            {
              in: {
                description: project.description,
                project: project.id,
                public: project.public,
                tags: project.tags
              }
            }
          ]
        }
      ]
    });
    return response.project.update;
  };
  static deleteTeamProject = (instance: typeof Cloud) => async (
    id: string,
    project: State<Project>
  ) => {
    const ops = await ProjectCalls._teamOps(instance)(id);
    const response = await ops({
      project: [
        {
          id: project.id
        },
        {
          delete: true
        }
      ]
    });
    return response.project.delete;
  };
}
