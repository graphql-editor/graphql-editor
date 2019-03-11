import { Cloud } from '../Container';
import { State, Project } from '../types/project';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const loadProject = (instance: typeof Cloud) => async (p: State<Project>) => {
  const sm = `Loading project...`;
  await instance.upStack(sm);
  Analytics.events.project({
    action: 'load'
  });
  const [project, fakerProject] = await Calls.getProject(instance)(p);
  if(!project){
    instance.errStack(`Project does'nt exist or you don't have proper rights to view it`)
  }
  const { sources } = project.sources;
  if (sources.length > 0) {
    const projectURL = sources.find((s) => s.filename === 'schema.graphql').getUrl;
    const project = await (await fetch(projectURL)).text();
    instance.controller.loadGraphQL(project);
  } else {
    instance.controller.resetGraph();
  }
  await instance.setState((state) => ({
    currentProject: {
      cloud: project,
      faker: fakerProject
    }
  }));
  return instance.deStack(sm);
};
