import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const searchPublicProjects = (instance: typeof Cloud) => async (query: string) => {
  const sm = `searching projects...`;
  Analytics.events.project({
    action: 'search',
    label: query
  });
  await instance.upStack(sm);
  const results = await Calls.searchProjects(query);
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      searchProjects: results.projects.filter((p) => p.sources.sources.length > 0)
    }
  }));
  instance.deStack(sm);
};
