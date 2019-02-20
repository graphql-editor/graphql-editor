import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const listPublicProjects = (instance: typeof Cloud) => async (query: string) => {
  const sm = `searching projects...`;
  Analytics.events.project({
    action: 'search',
    label: query
  });
  await instance.upStack(sm);
  const [results, fakerResults] = await Calls.searchProjects(query);
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      searchProjects: results.projects.filter((p) => p.sources.sources.length > 0)
    }
  }));
  await instance.setState((state) => ({
    faker: {
      ...state.faker,
      searchProjects: fakerResults.projects
    }
  }));
  instance.deStack(sm);
};
