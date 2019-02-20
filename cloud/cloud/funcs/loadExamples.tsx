import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

let examplesLoadedOnce = false;

export const loadExamples = (instance: typeof Cloud) => async () => {
  if (examplesLoadedOnce) {
    return;
  }
  const sm = `loading examples...`;

  Analytics.events.project({
    action: 'examples'
  });
  await instance.upStack(sm);
  examplesLoadedOnce = true;
  const [projectProjects, fakerProjects] = await Calls.searchProjects('showcase');
  await instance.setState((state) => ({
    cloud: {
      ...state.cloud,
      exampleProjects: projectProjects.projects.filter(
        (p) => p.endpoint.uri.split('/')[0] === 'showcase'
      )
    }
  }));
  await instance.setState((state) => ({
    faker: {
      ...state.faker,
      exampleProjects: fakerProjects.projects.filter(
        (p) => p.endpoint.uri.split('/')[0] === 'showcase'
      )
    }
  }));
  await instance.deStack(sm);
};
