import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const searchPublicProjectsByTag = (instance: typeof Cloud) => async (tag: string) => {
  const sm = `searching projects...`;
  Analytics.events.project({
    action: 'search',
    label: tag
  });
  await instance.upStack(sm);
  const results = await Calls.searchProjectsByTag(tag);
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      searchProjects: results.projects.filter((p) => p.sources.sources.length > 0)
    }
  }));
  instance.deStack(sm);
};
