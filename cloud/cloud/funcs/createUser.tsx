import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { ProjectCalls } from './project/calls';
import { FakerCalls } from './faker/calls';

export const createUser = (instance: typeof Cloud) => async (namespace: string) => {
  Analytics.events.user({
    action: 'create'
  });
  const sm = `Creating user...`;
  await instance.upStack(sm);
  await instance.closePopup();
  try {
    const projectResponse = await ProjectCalls.createUser(instance)(namespace);
    const fakerResponse = await FakerCalls.createUser(instance)(namespace);
    const { namespace: userNamespace, id } = projectResponse;
    const {
      projects: { projects },
      ...restNamespace
    } = userNamespace;
    const { namespace: fakerUserNamespace, id: fakerId } = fakerResponse;
    const {
      projects: { projects: fakerProjects },
      ...fakerRestNamespace
    } = fakerUserNamespace;
    await instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        namespace: restNamespace,
        projects,
        user: {
          id
        }
      },
      faker: {
        ...state.faker,
        namespace: fakerRestNamespace,
        projects: fakerProjects,
        user: {
          id: fakerId
        }
      },
      currentProject: null
    }));
    return [projectResponse, fakerResponse];
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
