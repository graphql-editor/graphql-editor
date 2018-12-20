import { Cloud, fakerApi, api } from '../Container';

let examplesLoadedOnce = false;

export const loadExamples = (instance: typeof Cloud) => async () => {
  if (examplesLoadedOnce) {
    return;
  }
  const sm = `loading examples...`;
  await instance.upStack(sm);
  examplesLoadedOnce = true;
  return api.Query.listProjects()({
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
    .then((response) =>
      instance.setState((state) => ({
        cloud: {
          ...state.cloud,
          exampleProjects: response.projects.filter(
            (p) => p.endpoint.uri.split('/')[0] === 'showcase'
          )
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
    .then((response) => {
      instance.setState((state) => ({
        faker: {
          ...state.faker,
          exampleProjects: response.projects.filter(
            (p) => p.endpoint.uri.split('/')[0] === 'showcase'
          )
        }
      }));
    })
    .then(() => instance.deStack(sm));
};
