import { Cloud } from '../Container';
import { State, Project } from '../types/project';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const removeProject = (instance: typeof Cloud) => async (project: State<Project>) => {
  const sm = `Removing project...`;
  Analytics.events.project({
    action: 'remove'
  });

  await instance.upStack(sm);
  if (instance.state.currentProject && project.id === instance.state.currentProject.id) {
    instance.setState((state) => ({
      currentProject: null,
      cloud: {
        ...state.cloud
      }
    }));
  }
  const [projectProject, fakerProject] = await Calls.removeProject(instance)(project);
  if (fakerProject) {
    await instance.setState((state) => ({
      faker: {
        ...state.faker,
        projects: state.faker.projects.filter((p) => p.id !== fakerProject.id)
      }
    }));
  }
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      projects: state.cloud.projects.filter((p) => p.id !== projectProject.id)
    }
  }));
  await instance.deStack(sm);
  return [projectProject, fakerProject];
};
