import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { GraphController } from '../../../src/Graph';

export const loadFromURL = (instance: typeof Cloud) => async (url: string) => {
  const sm = `loading schema from url...`;
  Analytics.events.project({
    action: 'loadFromURL',
    label: url
  });
  await instance.upStack(sm);
  try {
    const schema = await GraphController.getSchemaFromURL(url);
    const { nodes, links } = load.makeNodes(schema);
    return instance
      .setState((state) => ({
        cloud: {
          ...state.cloud,
          currentProject: null
        }
      }))
      .then(instance.setCloud)
      .then(() => instance.deStack(sm));
  } catch (error) {
    instance.errStack(
      `${url} is not correct GraphQL endpoint or schema contains definitions not provided to editor.`
    );
  }
};
