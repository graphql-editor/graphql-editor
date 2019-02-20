import { Cloud } from '../Container';
import { State, Project } from '../types/project';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const loadProject = (instance: typeof Cloud) => (project: State<Project>) => {
  const sm = `Loading project...`;
  instance.upStack(sm);
  Analytics.events.project({
    action: 'load'
  });
  return Calls.getProject(instance)(project).then(async (project) => {
    const { sources } = project.sources;
    if (sources.length > 0) {
      const projectURL = sources.find((s) => s.filename === 'schema.graphql').getUrl;
      const project = await (await fetch(projectURL)).text();
      instance.controller.loadGraphQL(project);
    } else {
      await instance.resetWorkspace();
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
