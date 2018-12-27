import { Cloud, fakerApi, api } from '../Container';
import { Analytics } from '../analytics';

export const listPublicProjects = (instance: typeof Cloud) => async (query: string) => {
  const sm = `searching projects...`;

  Analytics.events.project({
    action: 'search',
    label: query
  });
  await instance.upStack(sm);
  return api.Query.findProjects({ query })({
    projects: {
      id: true,
      name: true,
      public: true,
      slug: true,
      endpoint: {
        uri: true
      },
      sources: [
        {},
        {
          sources: {
            getUrl: true
          }
        }
      ]
    }
  })
    .then((response) =>
      instance.setState((state) => ({
        cloud: {
          ...state.cloud,
          searchProjects: response.projects.filter((p) => p.sources.sources.length > 0)
        }
      }))
    )
    .then(() =>
      fakerApi.Query.listProjects()({
        projects: {
          id: true,
          name: true,
          public: true,
          slug: true,
          endpoint: {
            uri: true
          }
        }
      })
    )
    .then((response) =>
      instance.setState((state) => ({
        faker: {
          ...state.faker,
          searchProjects: response.projects
        }
      }))
    )
    .then(() => instance.deStack(sm));
};
