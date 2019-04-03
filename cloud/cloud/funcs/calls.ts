import { Cloud, userApi, api, fakerUserApi } from '../Container';
import { State, Project } from '../types/project';
import { ProjectCalls } from './project/calls';
import { FakerCalls } from './faker/calls';

export class Calls {
  static getUser = (instance: typeof Cloud) =>
    Promise.all([ProjectCalls.getUser(instance), FakerCalls.getUser(instance)]);
  static createUser = (instance: typeof Cloud) => async (namespace: string) =>
    Promise.all([
      ProjectCalls.createUser(instance)(namespace),
      FakerCalls.createUser(instance)(namespace)
    ]);
  static findProjectByEndpoint = (instance: typeof Cloud) => async (endpoint: string) => {
    return Promise.all([
      ProjectCalls.findProjectByEndpoint(instance)(endpoint),
      FakerCalls.findProjectByEndpoint(instance)(endpoint)
    ]);
  };
  static searchProjects = async (query: string) =>
    api.Query.findProjects({ query, limit: 30 })({
      projects: {
        id: true,
        name: true,
        public: true,
        slug: true,
        description: true,
        tags: true,
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
    });
  static searchProjectsByTag = async (tag: string) =>
    api.Query.findProjectsByTag({
      tag,
      limit: 20
    })({
      projects: {
        id: true,
        name: true,
        public: true,
        slug: true,
        description: true,
        tags: true,
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
    });

  static createProject = (instance: typeof Cloud) => async (name: string, is_public: boolean) =>
    Promise.all([
      ProjectCalls.createProject(instance)(name, is_public),
      FakerCalls.createProject(instance)(name, is_public)
    ]);
  static createTeamProject = (instance: typeof Cloud) => async (
    id: string,
    name: string,
    is_public: boolean
  ) =>
    Promise.all([
      ProjectCalls.createTeamProject(instance)(id, name, is_public),
      FakerCalls.createProject(instance)(name, is_public)
    ]);

  static getProject = (instance: typeof Cloud) => (project: State<Project>) =>
    Promise.all([
      ProjectCalls.getProject(instance)(project),
      FakerCalls.findProjectByEndpoint(instance)(project.endpoint.uri)
    ]);
  static removeProject = (instance: typeof Cloud) => async (project: State<Project>) => {
    const actions = [
      userApi(instance.state.token).Mutation.removeProject({
        project: project.id
      })()
    ];

    const fakerProject = await FakerCalls.findProjectByEndpoint(instance)(project.endpoint.uri);
    if (fakerProject) {
      actions.push(
        fakerUserApi(instance.state.token).Mutation.removeProject({
          project: fakerProject.id
        })()
      );
    }
    return Promise.all(actions);
  };
}
