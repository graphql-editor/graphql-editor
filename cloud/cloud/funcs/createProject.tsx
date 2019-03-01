import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const createProject = (instance: typeof Cloud) => async (
  name: string,
  is_public: boolean
) => {
  const sm = 'Creating project...';
  Analytics.events.project({
    action: 'create'
  });
  await instance.upStack(sm);
  const [project, fakerProject] = await Calls.createProject(instance)(name, is_public);
  await instance.setState((state) => ({
    ...state,
    cloud: {
      ...state.cloud,
      projects: [...state.cloud.projects, project]
    },
    faker: {
      ...state.faker
    },
    currentProject: {
      cloud: project,
      faker: fakerProject
    }
  }));
  await instance.setCloud();
  await instance.deStack(sm);
  instance.controller.resetGraph();
  return project;
};
