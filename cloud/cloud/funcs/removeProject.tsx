import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const removeProject = async (instance: typeof Cloud) => {
  const project = instance.state.removedProject
  const sm = `Removing project...`;
  await instance.upStack(sm);
  if (!instance.canIEditProject(project)) {
    throw new Error(`You can't remove this project`);
  }
  Analytics.events.project({
    action: 'remove'
  });
  if (instance.state.currentProject && project.id === instance.state.currentProject.cloud.id) {
    await instance.setState((state) => ({
      currentProject: null
    }));
    instance.controller.resetGraph();
  }
  await Calls.removeProject(instance)(project);
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      projects: state.cloud.projects.filter((p) => p.id !== project.id)
    }
  }));
  await instance.deStack(sm);
  return;
};
