import { Cloud } from '../Container';
import { loadProject } from './loadProject';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const findProjectByEndpoint = (instance: typeof Cloud) => async (endpoint: string) => {
  const sm = `finding project...`;
  Analytics.events.project({
    action: 'loadByEndpoint',
    label: endpoint
  });
  await instance.upStack(sm);
  return Calls.findProjectByEndpoint(instance)(endpoint).then(async ([project]) => {
    await instance.deStack(sm);
    if (project) {
      return loadProject(instance)(project);
    }
    await instance.upStack(`Check if you provided URL correctly`);
    await instance.errStack(`No such project: ${endpoint}`);
    if (instance.state.currentProject) {
      instance.moveToCurrentProject();
    } else {
      instance.state.pushHistory('/');
    }
    return null;
  });
};
