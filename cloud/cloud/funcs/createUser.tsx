import { Cloud, userApi } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const createUser = (instance: typeof Cloud) => (
  apiFunction: typeof userApi,
  fakerCloud: 'faker' | 'cloud'
) => async (namespace: string) => {
  Analytics.events.user({
    action: 'create'
  });
  const sm = `Creating ${fakerCloud} user...`;
  await instance.upStack(sm);
  await instance.closePopup();
  try {
    const res = await Calls.createUser(instance)(apiFunction)(namespace);
    const { namespace: userNamespace, id } = res;
    const {
      projects: { projects },
      ...restNamespace
    } = userNamespace;
    await instance.setState({
      [fakerCloud]: {
        ...instance.state[fakerCloud],
        namespace: restNamespace,
        projects,
        user: {
          id
        }
      }
    });
    return res;
  } catch (error) {
    if (error === null) {
      await instance.deStack(sm);
      return;
    } else {
      await instance.setState({
        popup: 'createUser'
      });

      await instance.errStack(`Namespace with this name already exists`);
      return;
    }
  }
};
