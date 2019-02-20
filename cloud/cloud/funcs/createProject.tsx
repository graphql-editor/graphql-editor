import { Cloud, userApi } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const createProject = (instance: typeof Cloud) => (
  apiFunction: typeof userApi,
  fakerCloud: 'faker' | 'cloud'
) => async (name: string, is_public: boolean) => {
  const sm = 'Creating project...';
  Analytics.events.project({
    action: 'create'
  });
  await instance.upStack(sm);
  const project = await Calls.createProject(instance)(apiFunction)(name, is_public);
  await instance.setState((state) => ({
    ...state,
    [fakerCloud]: {
      ...state[fakerCloud],
      currentProject: project,
      projects: [...state[fakerCloud].projects, project]
    }
  }));
  await instance.setCloud();
  await instance.deStack(sm);
  instance.controller.loadGraphQL('');
  return project;
};
