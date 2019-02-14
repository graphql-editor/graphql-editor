import { Cloud, userApi } from '../Container';
import { loadProject } from './loadProject';
import { Analytics } from '../analytics';

export const findProjectByEndpoint = (instance: typeof Cloud) => async (endpoint: string) => {
  const sm = `loading project...`;
  Analytics.events.project({
    action: 'loadByEndpoint',
    label: endpoint
  });
  await instance.upStack(sm);
  return userApi(instance.state.token)
    .Query.findProjects({ query: endpoint })({
      projects: {
        id: true,
        endpoint: {
          uri: true
        }
      }
    })
    .then(async (response) => {
      const hasProject = response.projects.find((p) => p.endpoint.uri === endpoint);
      await instance.deStack(sm);
      if (hasProject) {
        return loadProject(instance)(hasProject);
      }
      await instance.upStack(`Check if you provided URL correctly`);
      await instance.errStack(`No such project: ${endpoint}`);
      if (instance.state.cloud.currentProject) {
        instance.moveToCurrentProject();
      } else {
        instance.state.pushHistory('/');
      }
      return null;
    })
};
