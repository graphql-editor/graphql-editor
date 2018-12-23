import { Cloud } from '../Container';
import { getSchemaFromURL } from '../../livegen/import/fromUrl';
import { makeNodes } from '../../livegen/import/makeNodes';
import { Analytics } from '../analytics';

export const loadFromURL = (instance: typeof Cloud) => async (url: string) => {
  const sm = `loading schema from url...`;
  Analytics.events.project({
    action: 'loadFromURL',
    label: url
  });
  await instance.upStack(sm);
  try {
    const schema = await getSchemaFromURL(url);
    const { nodes, links } = makeNodes(schema);
    return instance
      .setState((state) => ({
        nodes,
        links,
        loaded: {
          nodes,
          links
        },
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
