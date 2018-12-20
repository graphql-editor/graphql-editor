import { Cloud, userApi } from '../Container';
import { State, Project } from '../types/project';

export const loadProject = (instance: typeof Cloud) => (project: State<Project>) => {
  const sm = `Loading project...`;
  instance.upStack(sm);
  return userApi(instance.state.token)
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
        await instance.setState((state) => ({ loaded: { nodes, links, tabs } }));
      } else {
        await instance.resetProject();
      }
      await instance.setState((state) => ({
        cloud: {
          ...instance.state.cloud,
          currentProject: project
        }
      }));
      return instance.deStack(sm);
    });
};
